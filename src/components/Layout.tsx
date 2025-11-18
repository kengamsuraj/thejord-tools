import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  currentPage?: 'tools' | 'blog' | 'about' | 'contact';
  showFullNav?: boolean;
}

export default function Layout({ children, currentPage = 'tools', showFullNav = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-bg-darkest">
      <header className={`bg-bg-dark border-b border-border ${showFullNav ? 'sticky top-0 z-50' : ''}`}>
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img src="/logo.png" alt="The Jord Logo" className="h-12 w-auto" width="96" height="89" />
              </picture>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
                THE JORD
              </span>
            </Link>
            {showFullNav ? (
              <div className="flex gap-6">
                <Link
                  to="/"
                  className={`${currentPage === 'tools' ? 'text-primary-light' : 'text-text-secondary hover:text-primary-light'} transition-colors`}
                >
                  Tools
                </Link>
                <Link
                  to="/blog"
                  className={`${currentPage === 'blog' ? 'text-primary-light' : 'text-text-secondary hover:text-primary-light'} transition-colors`}
                >
                  Blog
                </Link>
                <Link
                  to="/about"
                  className={`${currentPage === 'about' ? 'text-primary-light' : 'text-text-secondary hover:text-primary-light'} transition-colors`}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={`${currentPage === 'contact' ? 'text-primary-light' : 'text-text-secondary hover:text-primary-light'} transition-colors`}
                >
                  Contact
                </Link>
              </div>
            ) : (
              <div className="flex gap-6">
                <Link to="/" className="text-text-secondary hover:text-primary-light transition-colors">
                  ← Back to Tools
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      {children}

      {showFullNav && <Footer />}
    </div>
  );
}
