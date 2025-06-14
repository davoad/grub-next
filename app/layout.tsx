import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Roboto_Mono } from "next/font/google";

import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Good Grub",
  description: "Your Recipe GPS!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const useAnalytics = process.env.USE_ANALYTICS === "true";

  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
        <body>{children}</body>
        {useAnalytics && (
          <Script
            src="https://mango-gtpt.vercel.app/script.js"
            data-website-id="9229d631-29b3-4d39-bb57-39b47d56d82f"
            strategy="lazyOnload"
          />
        )}
      </html>
    </ClerkProvider>
  );
}
