import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MovieLovers",
  description: "details about any movie you need to know",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={` ${geistSans.variable} ${geistMono.variable} antialiased  `}>
  
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/1315629.png')" }}
      />

           <Nav/>

    
        {children}
      

      
      </body>
    </html>
  );
}
