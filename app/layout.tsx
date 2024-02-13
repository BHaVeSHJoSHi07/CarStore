import type { Metadata } from "next";
import "./globals.css";
import { Navbar, Footer } from "@/components";


export const metadata: Metadata = {
  title: "kas chu Car!",
  description: "Discover best car in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
