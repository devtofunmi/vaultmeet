'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>VaultMeet – Exclusive Connections</title>
        <meta name="description" content="Connect with elite sponsors and attractive seekers through VaultMeet, the premium platform for exclusive arrangements." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <div className="text-gray-800 bg-white">
        {/* Sticky navbar */}
        <div className="border-b px-6 py-4 sticky top-0 z-50 bg-white shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">VaultMeet</h1>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-4">
              <a href="/" className="hover:underline">Home</a>
              <a href="/apply-seeker" className="hover:underline">Apply (Seeker)</a>
              <a href="/apply-sponsor" className="hover:underline">Apply (Sponsor)</a>
              <a href="/contact" className="hover:underline">Contact</a>
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 space-y-2 flex flex-col">
              <a href="/" className="hover:underline">Home</a>
              <a href="/apply-seeker" className="hover:underline">Apply (Seeker)</a>
              <a href="/apply-sponsor" className="hover:underline">Apply (Sponsor)</a>
              <a href="/contact" className="hover:underline">Contact</a>
            </nav>
          )}
        </div>

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="border-t px-6 py-6 text-sm text-center text-gray-600">
          <p>© {new Date().getFullYear()} VaultMeet. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms & Conditions</a>
          </div>
        </footer>
      </div>
    </html>
  );
}