import type { Metadata } from 'next';
import './globals.css';
import { MarketplaceProvider } from '@/context/MarketplaceContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Rang Riwaaz Mehandi | Gorakhpur Commission Marketplace',
  description:
    'Tiered commission mehndi marketplace for Gorakhpur weddings. Date-locked slots, transparent pricing, 5-point verified artists, and standby backup guarantee.',
  keywords: [
    'Gorakhpur Mehndi Artist',
    'Baraipar Mod Mehandi',
    'Bridal Henna Gorakhpur',
    'Rang Riwaaz Mehandi',
    'Mehndi Commission Marketplace',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#faf7f2] text-stone-900 selection:bg-amber-200 selection:text-amber-900 antialiased">
        <MarketplaceProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </MarketplaceProvider>
      </body>
    </html>
  );
}
