// src/app/layout.tsx
import './globals.css';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Waste Management',
  description: 'Track and manage waste responsibly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
