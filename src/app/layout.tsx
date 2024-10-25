import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuedSoft",
  description: "Statup de Desenvolvimento web e Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <link rel="icon" href="logoqued.png" />
      
      </head>
      <body className={inter.className}>
        {children}
        </body>
    </html>
  );
}
