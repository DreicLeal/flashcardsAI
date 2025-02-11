import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import ChatProvider from "@/context/chatContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lang Chat",
  description: "Learn english with AI",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ChatProvider>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[100vh] w-[100vw]`}
        >
        <Header />
        {children}
        {/* <Footer/> */}
      </body>
        </ChatProvider>
    </html>
  );
}
