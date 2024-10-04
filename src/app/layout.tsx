// src/app/layout.tsx
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'My Next.js App',
  description: 'A simple Next.js app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '10px' }}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/pokemon">Pokemon</Link></li>
            <li><Link href="/aboutme">About Me</Link></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
