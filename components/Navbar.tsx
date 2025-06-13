'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Matt&apos;s AI Lab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-300 hover:text-coral-500 transition-colors">
              關於本站
            </Link>
            <Link href="/faq" className="text-gray-300 hover:text-coral-500 transition-colors">
              常見問題
            </Link>
            <Link href="/ai-chat" className="text-gray-300 hover:text-coral-500 transition-colors">
              AI客服
            </Link>
            <Link href="/ai-lag" className="text-gray-300 hover:text-coral-500 transition-colors">
              AI語言學習
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-coral-500 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-300 hover:text-coral-500 hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                關於本站
              </Link>
              <Link
                href="/faq"
                className="block px-3 py-2 text-gray-300 hover:text-coral-500 hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                常見問題
              </Link>
              <Link
                href="/ai-chat"
                className="block px-3 py-2 text-gray-300 hover:text-coral-500 hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                AI客服
              </Link>
              <Link
                href="/ai-lag"
                className="block px-3 py-2 text-gray-300 hover:text-coral-500 hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                AI語言學習
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
