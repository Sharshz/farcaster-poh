import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';

export async function generateMetadata(): Promise<Metadata> {
  const appUrl = process.env.APP_URL || 'https://example.com';
  return {
    title: 'PoH Verify',
    description: 'Verify your humanity on Farcaster.',
    other: {
      'fc:miniapp': JSON.stringify({
        version: 'next',
        imageUrl: `https://picsum.photos/seed/poh-hero/1200/630`,
        button: {
          title: 'Verify Now',
          action: {
            type: 'launch_miniapp',
            name: 'PoH Verify',
            url: appUrl,
            splashImageUrl: `https://picsum.photos/seed/poh-splash/512/512`,
            splashBackgroundColor: '#0d0d0d',
          },
        },
      }),
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-[#0a0a0a] text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
