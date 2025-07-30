import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/custom-components/Nav";
import CommonProvider from "@/custom-components/CommonProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "next学习",
  description: "初次使用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <CommonProvider>
          <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex flex-col min-h-screen">
              <Nav />
                <main className="flex-1">{children}</main>
                <footer className="border-t py-6">
                  <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} next学习. 保留所有权利.
                  </div>
                </footer>
              </div>
        </body>
      </CommonProvider>
      
    </html>
  );
}
