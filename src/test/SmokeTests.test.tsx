import { describe, it, expect } from 'vitest'
import { render, screen } from './test-utils'
import RegexTester from '../pages/RegexTester'
import HashGenerator from '../pages/HashGenerator'
import UrlTool from '../pages/UrlTool'
import MarkdownConverter from '../pages/MarkdownConverter'
import ColorConverter from '../pages/ColorConverter'
import LoremIpsumGenerator from '../pages/LoremIpsumGenerator'
import DiffChecker from '../pages/DiffChecker'

const renderComponent = (Component: React.ComponentType) => {
  return render(<Component />)
}

describe('Smoke Tests - All Tools', () => {
  describe('RegexTester', () => {
    it('should render without crashing', () => {
      renderComponent(RegexTester)
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
    })
  })

  describe('HashGenerator', () => {
    it('should render without crashing', () => {
      renderComponent(HashGenerator)
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
    })
  })

  describe('UrlTool', () => {
    it('should render without crashing', () => {
      renderComponent(UrlTool)
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
    })
  })

  describe('MarkdownConverter', () => {
    it('should render without crashing', () => {
      renderComponent(MarkdownConverter)
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
    })
  })

  describe('ColorConverter', () => {
    it('should render without crashing', () => {
      renderComponent(ColorConverter)
      const inputs = screen.getAllByRole('textbox')
      expect(inputs.length).toBeGreaterThan(0)
    })
  })

  describe('LoremIpsumGenerator', () => {
    it('should render without crashing', () => {
      renderComponent(LoremIpsumGenerator)
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
    })
  })

  describe('DiffChecker', () => {
    it('should render without crashing', () => {
      renderComponent(DiffChecker)
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
    })
  })
})
