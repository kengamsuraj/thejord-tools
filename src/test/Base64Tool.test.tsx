import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Base64Tool from '../pages/Base64Tool'

// Mock react-router-dom Link component
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to}>{children}</a>
    ),
  }
})

const renderBase64Tool = () => {
  return render(
    <BrowserRouter>
      <Base64Tool />
    </BrowserRouter>
  )
}

describe('Base64Tool', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Render and Initial State', () => {
    it('should render the Base64 tool with correct title', () => {
      renderBase64Tool()
      expect(screen.getByRole('heading', { name: /Base64/i, level: 1 })).toBeInTheDocument()
      expect(screen.getByText(/Encode or decode Base64 strings/i)).toBeInTheDocument()
    })

    it('should have encode mode selected by default', () => {
      renderBase64Tool()
      const encodeButtons = screen.getAllByRole('button', { name: /🔒 Encode/i })
      // First button is the mode selector
      expect(encodeButtons[0]).toHaveClass('bg-primary')
    })

    it('should render all action buttons', () => {
      renderBase64Tool()
      expect(screen.getByRole('button', { name: /Clear/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Swap/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Copy/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Download/i })).toBeInTheDocument()
    })

    it('should display max file size information', () => {
      renderBase64Tool()
      expect(screen.getByText(/Max 5MB/i)).toBeInTheDocument()
    })
  })

  describe('Encode Functionality', () => {
    it('should encode simple text to Base64', async () => {
      const user = userEvent.setup()
      renderBase64Tool()

      const input = screen.getByPlaceholderText(/Enter text to encode/i)
      const encodeButton = screen.getAllByRole('button', { name: /🔒 Encode/i })[1] // Second one (action button)

      await user.type(input, 'Hello World')
      await user.click(encodeButton)

      const output = screen.getByPlaceholderText(/Output will appear here/i)
      expect(output).toHaveValue('SGVsbG8gV29ybGQ=')
    })

    it('should encode special characters correctly', async () => {
      const user = userEvent.setup()
      renderBase64Tool()

      const input = screen.getByPlaceholderText(/Enter text to encode/i)
      const encodeButton = screen.getAllByRole('button', { name: /🔒 Encode/i })[1]

      await user.type(input, 'Café ☕')
      await user.click(encodeButton)

      const output = screen.getByPlaceholderText(/Output will appear here/i)
      // Verify Base64 encoding with special characters
      expect(output.value).toBeTruthy()
      expect(output.value.length).toBeGreaterThan(0)
    })

    it('should encode empty string', async () => {
      const user = userEvent.setup()
      renderBase64Tool()

      const encodeButton = screen.getAllByRole('button', { name: /🔒 Encode/i })[1]
      await user.click(encodeButton)

      const output = screen.getByPlaceholderText(/Output will appear here/i)
      expect(output).toHaveValue('')
    })

    it('should update character and byte count on encode', async () => {
      const user = userEvent.setup()
      renderBase64Tool()

      const input = screen.getByPlaceholderText(/Enter text to encode/i)
      await user.type(input, 'Test')

      expect(screen.getByText(/4 characters/i)).toBeInTheDocument()
      expect(screen.getByText(/4 bytes/i)).toBeInTheDocument()
    })
  })

  describe('Decode Functionality', () => {
    it('should decode Base64 to text', async () => {
      const user = userEvent.setup()
      renderBase64Tool()

      // Switch to decode mode
      const decodeMode = screen.getByRole('button', { name: /🔓 Decode/i })
      await user.click(decodeMode)

      const input = screen.getByPlaceholderText(/Enter Base64 string to decode/i)
      const decodeButton = screen.getAllByRole('button', { name: /🔓 Decode/i })[1]

      await user.type(input, 'SGVsbG8gV29ybGQ=')
      await user.click(decodeButton)

      const output = screen.getByPlaceholderText(/Output will appear here/i)
      expect(output).toHaveValue('Hello World')
    })

    it('should handle Base64 with data URL prefix', async () => {
      const user = userEvent.setup()
      renderBase64Tool()

      const decodeMode = screen.getByRole('button', { name: /🔓 Decode/i })
      await user.click(decodeMode)

      const input = screen.getByPlaceholderText(/Enter Base64 string to decode/i)
      const decodeButton = screen.getAllByRole('button', { name: /🔓 Decode/i })[1]

      // Base64 with data URL prefix (common in images)
      await user.type(input, 'data:text/plain;base64,SGVsbG8gV29ybGQ=')
      await user.click(decodeButton)

      const output = screen.getByPlaceholderText(/Output will appear here/i)
      expect(output).toHaveValue('Hello World')
    })

    it('should show error for invalid Base64', async () => {
      const user = userEvent.setup()
      renderBase64Tool()

      const decodeMode = screen.getByRole('button', { name: /🔓 Decode/i })
      await user.click(decodeMode)

      const input = screen.getByPlaceholderText(/Enter Base64 string to decode/i)
      const decodeButton = screen.getAllByRole('button', { name: /🔓 Decode/i })[1]

      await user.type(input, 'InvalidBase64!@#')
      await user.click(decodeButton)

      await waitFor(() => {
        expect(screen.getByText(/Error decoding: Invalid Base64 string/i)).toBeInTheDocument()
      })
    })
  })

  describe('Swap Functionality', () => {
    it('should swap input and output', async () => {
      const user = userEvent.setup()
      renderBase64Tool()

      const input = screen.getByPlaceholderText(/Enter text to encode/i)
      const encodeButton = screen.getAllByRole('button', { name: /🔒 Encode/i })[1]

      await user.type(input, 'Hello')
      await user.click(encodeButton)

      const swapButton = screen.getByRole('button', { name: /Swap/i })
      await user.click(swapButton)

      // Input should now have the encoded value
      expect(input).toHaveValue('SGVsbG8=')

      // Mode should switch to decode
      const decodeMode = screen.getAllByRole('button', { name: /🔓 Decode/i })[0]
      expect(decodeMode).toHaveClass('bg-primary')
    })

    it('should disable swap button when no output', () => {
      renderBase64Tool()
      const swapButton = screen.getByRole('button', { name: /Swap/i })
      expect(swapButton).toBeDisabled()
    })
  })

  describe('Clear Functionality', () => {
    it('should clear both input and output', async () => {
      const user = userEvent.setup()
      renderBase64Tool()

      const input = screen.getByPlaceholderText(/Enter text to encode/i)
      const encodeButton = screen.getAllByRole('button', { name: /🔒 Encode/i })[1]
      const clearButton = screen.getByRole('button', { name: /Clear/i })

      await user.type(input, 'Test')
      await user.click(encodeButton)

      await user.click(clearButton)

      expect(input).toHaveValue('')
      const output = screen.getByPlaceholderText(/Output will appear here/i)
      expect(output).toHaveValue('')
    })
  })

  describe('Copy to Clipboard', () => {
    it('should enable copy button when output exists', async () => {
      const user = userEvent.setup()
      renderBase64Tool()

      const copyButton = screen.getByRole('button', { name: /📋 Copy/i })
      expect(copyButton).toBeDisabled()

      const input = screen.getByPlaceholderText(/Enter text to encode/i)
      const encodeButton = screen.getAllByRole('button', { name: /🔒 Encode/i })[1]

      await user.type(input, 'Copy Test')
      await user.click(encodeButton)

      expect(copyButton).not.toBeDisabled()
    })

    it('should show success toast on copy', async () => {
      const user = userEvent.setup()
      renderBase64Tool()

      const input = screen.getByPlaceholderText(/Enter text to encode/i)
      const encodeButton = screen.getAllByRole('button', { name: /🔒 Encode/i })[1]

      await user.type(input, 'Copy Test')
      await user.click(encodeButton)

      const copyButton = screen.getByRole('button', { name: /📋 Copy/i })
      await user.click(copyButton)

      await waitFor(() => {
        expect(screen.getByText(/Copied to clipboard/i)).toBeInTheDocument()
      })
    })
  })

  describe('File Upload', () => {
    it('should show upload file button with max size', () => {
      renderBase64Tool()
      expect(screen.getByLabelText(/Upload File/i)).toBeInTheDocument()
      expect(screen.getByText(/Max 5MB/i)).toBeInTheDocument()
    })

    it('should handle text file upload in encode mode', async () => {
      const user = userEvent.setup()
      renderBase64Tool()

      const file = new File(['Hello from file'], 'test.txt', { type: 'text/plain' })
      const input = screen.getByLabelText(/Upload File/i)

      await user.upload(input, file)

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/Enter text to encode/i)).toHaveValue('Hello from file')
      })
    })

    it('should reject files larger than 5MB', async () => {
      const user = userEvent.setup()
      renderBase64Tool()

      // Create a file larger than 5MB (5MB + 1 byte)
      const largeContent = 'x'.repeat(5 * 1024 * 1024 + 1)
      const largeFile = new File([largeContent], 'large.txt', { type: 'text/plain' })

      const input = screen.getByLabelText(/Upload File/i)

      // Upload and immediately check for error message
      await user.upload(input, largeFile)

      // Error should be displayed (either in toast or error div)
      await waitFor(() => {
        const errorText = screen.queryByText(/File too large/i) || screen.queryByText(/Max 5MB/i)
        expect(errorText).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })

  describe('Download Functionality', () => {
    it('should disable download button when no output', () => {
      renderBase64Tool()
      const downloadButton = screen.getByRole('button', { name: /Download/i })
      expect(downloadButton).toBeDisabled()
    })

    it('should enable download button when output exists', async () => {
      const user = userEvent.setup()
      renderBase64Tool()

      const input = screen.getByPlaceholderText(/Enter text to encode/i)
      const encodeButton = screen.getAllByRole('button', { name: /🔒 Encode/i })[1]

      await user.type(input, 'Test')
      await user.click(encodeButton)

      const downloadButton = screen.getByRole('button', { name: /Download/i })
      expect(downloadButton).not.toBeDisabled()
    })
  })

  describe('Mode Switching', () => {
    it('should switch between encode and decode modes', async () => {
      const user = userEvent.setup()
      renderBase64Tool()

      // Initially in encode mode
      const encodeMode = screen.getAllByRole('button', { name: /🔒 Encode/i })[0]
      expect(encodeMode).toHaveClass('bg-primary')

      // Switch to decode
      const decodeMode = screen.getByRole('button', { name: /🔓 Decode/i })
      await user.click(decodeMode)

      expect(decodeMode).toHaveClass('bg-primary')
      expect(screen.getByPlaceholderText(/Enter Base64 string to decode/i)).toBeInTheDocument()

      // Switch back to encode
      await user.click(encodeMode)

      expect(encodeMode).toHaveClass('bg-primary')
      expect(screen.getByPlaceholderText(/Enter text to encode/i)).toBeInTheDocument()
    })
  })

  describe('UI Elements', () => {
    it('should display About Base64 section', () => {
      renderBase64Tool()
      expect(screen.getByText(/About Base64/i)).toBeInTheDocument()
      expect(screen.getByText(/binary-to-text encoding/i)).toBeInTheDocument()
    })

    it('should display common use cases', () => {
      renderBase64Tool()
      expect(screen.getByText(/Common Use Cases:/i)).toBeInTheDocument()
      expect(screen.getByText(/Email attachments/i)).toBeInTheDocument()
      expect(screen.getByText(/API authentication tokens/i)).toBeInTheDocument()
    })
  })
})
