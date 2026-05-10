import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ads Platform MCP Connections',
  description: 'Manage and connect your Meta, Google, LinkedIn, and Bing Ads accounts to the MCP platform.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
