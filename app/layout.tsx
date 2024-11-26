import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "./components/Header"; // Importation du header
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Forum App",
  description: "Un forum créé avec Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <Header /> {/* Ajoute le Header ici */}
        <main className="h-full">{children}</main> {/* Main wrapper */}
      </body>
    </html>
  );
}
