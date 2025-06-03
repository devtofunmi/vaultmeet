import type { ReactNode } from 'react';


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>VaultMeet – Exclusive Connections</title>
        <meta name="description" content="Connect with elite sponsors and attractive seekers through VaultMeet, the premium platform for exclusive arrangements." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="text-gray-800 bg-white">
        <header className="border-b text-gray-800 px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">VaultMeet</h1>
          <nav className="space-x-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/apply-seeker" className="hover:underline">Apply (Seeker)</a>
            <a href="/apply-sponsor" className="hover:underline">Apply (Sponsor)</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </nav>
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="border-t px-6 py-6 text-sm text-center text-gray-600">
          <p>© {new Date().getFullYear()} VaultMeet. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms & Conditions</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
