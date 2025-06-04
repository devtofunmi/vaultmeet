'use client';

import Link from 'next/link';
import Head from 'next/head';
import { useState, type ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Apply (Seeker)', href: '/apply-seeker' },
    { label: 'Apply (Sponsor)', href: '/apply-sponsor' },
    { label: 'Contact', href: '/contact' },
  ];

  return (     
      <div className="text-gray-800 bg-white">
        {/* Navbar */}
        <div className="sticky top-0 z-50 bg-white border-b shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-xl font-bold">VaultMeet</h1>
            </Link>

            {/* Hamburger button */}
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="md:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={navOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-blue-600">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Nav */}
          {navOpen && (
            <nav className="md:hidden mt-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setNavOpen(false)}
                  className="hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <main className=" py-4">{children}</main>
        {/* Footer */}
        <footer className="border-t px-6 py-6 text-sm text-center text-gray-600">
          <p>© {new Date().getFullYear()} VaultMeet. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms & Conditions</Link>
          </div>
        </footer>
      </div>
  );
}
