import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blog do Joãozin',
  icons: {
    icon: '/LGO.png'
  },
  description: 'post sobre o mundo tech',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-gray-900 antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}