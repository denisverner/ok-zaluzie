import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CookieBanner from '@/components/CookieBanner';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OK-ŽALUZIE | Žaluzie a sítě na míru – Moravskoslezský kraj',
  description:
    'Montáž, opravy a servis žaluzií a sítí proti hmyzu v Moravskoslezském kraji. Interiérové i exteriérové žaluzie. Nezávazná poptávka zdarma. Tel: +420 773 071 707',
  keywords:
    'žaluzie, sítě proti hmyzu, montáž žaluzií, opravy žaluzií, Odry, Nový Jičín, Opava, Moravskoslezský kraj, stínění, rolety',
  authors: [{ name: 'DULUX SERVICE s.r.o.' }],
  openGraph: {
    title: 'OK-ŽALUZIE | Žaluzie a sítě na míru',
    description:
      'Montáž, opravy a servis žaluzií a sítí proti hmyzu v Moravskoslezském kraji. Nezávazná poptávka zdarma.',
    locale: 'cs_CZ',
    type: 'website',
    siteName: 'OK-ŽALUZIE',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
