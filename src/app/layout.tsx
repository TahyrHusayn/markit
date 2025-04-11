import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";

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
  title: "MarkIt",
  description: "Modern Student Attendance System.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FpjsProvider
          loadOptions={{
            apiKey: process.env.NEXT_PUBLIC_FP_PUBLIC_KEY ?? "",
          }}
        >
          {children}
        </FpjsProvider>
      </body>
    </html>
  );
}
