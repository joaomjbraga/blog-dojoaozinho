import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog | João M",
  description: "Blogo",
  icons: {
    icon: '/favicon.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
