import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ColmenaVAX | Crowdfunding Web3 en Avalanche",
  description: "Plataforma de crowdfunding descentralizado en Avalanche. Escrow on-chain con USDC/AVAX y liberación de fondos por hitos verificados.",
  keywords: ["crowdfunding", "web3", "avalanche", "blockchain", "USDC", "AVAX", "crypto", "latam"],
  openGraph: {
    title: "ColmenaVAX | Crowdfunding Web3 en Avalanche",
    description: "El capital sin fricción para LATAM. Escrow on-chain y hitos verificados.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
