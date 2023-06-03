import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HumanDrop",
  description: "Proof of Humanity for Airdrops, powered by WorldId",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.png" sizes="any" />

      <body className={inter.className}>{children}</body>
    </html>
  );
}
