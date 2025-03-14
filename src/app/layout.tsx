import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { TransitionProvider } from '@/components/transitions/transition-provider';

// Load Inter font with Latin subset
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Metadata for the application
export const metadata: Metadata = {
  title: 'ScamSafe - Learn to identify and avoid text scams',
  description: 'Educational platform for learning about text message scams and how to protect yourself',
  keywords: 'scam, text scam, phishing, cybersecurity, education, security awareness',
};

// Root layout component that wraps all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans min-h-screen flex flex-col">
        <TransitionProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </TransitionProvider>
      </body>
    </html>
  );
}