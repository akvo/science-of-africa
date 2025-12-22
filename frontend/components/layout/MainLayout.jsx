import Link from 'next/link';
import { useState } from 'react';

export default function MainLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock current user - will be replaced with auth context
  const currentUser = {
    username: 'dr_amara',
    profile: {
      display_name: 'Dr. Amara Okonkwo',
      avatar: null
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SfA</span>
                </div>
                <span className="font-semibold text-gray-900 hidden sm:block">
                  Science for Africa
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/forum"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Forum
              </Link>
              <Link
                href="/forum"
                className="text-gray-400 cursor-not-allowed font-medium"
                title="Coming soon"
              >
                Resources
              </Link>
              <Link
                href="/forum"
                className="text-gray-400 cursor-not-allowed font-medium"
                title="Coming soon"
              >
                Members
              </Link>
              <Link
                href="/forum"
                className="text-gray-400 cursor-not-allowed font-medium"
                title="Coming soon"
              >
                Events
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Avatar */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-700 font-medium text-sm">
                    {currentUser.profile.display_name.charAt(0)}
                  </span>
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {currentUser.profile.display_name.split(' ')[0]}
                </span>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-gray-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-3 space-y-2">
              <Link
                href="/forum"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Forum
              </Link>
              <span className="block px-3 py-2 text-gray-400">Resources (Coming soon)</span>
              <span className="block px-3 py-2 text-gray-400">Members (Coming soon)</span>
              <span className="block px-3 py-2 text-gray-400">Events (Coming soon)</span>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">SfA</span>
              </div>
              <span className="text-sm text-gray-500">
                Science for Africa Foundation - REMACS Community of Practice
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700">Terms of Use</a>
              <a href="#" className="hover:text-gray-700">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
