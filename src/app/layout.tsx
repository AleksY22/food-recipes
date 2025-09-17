import type { Metadata } from "next";
import { Providers } from "./providers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/layout/header";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";
import AppLoader from "@/hoc/app-loader";
import Title from "@/components/ui/layout/title";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SessionProvider session={session}>
            <AppLoader>
              <div className="flex min-h-screen flex-col">
                <Header />
                <Title />
                <main
                  className={`flex flex-col max-w-[1024px] w-3xl mx-auto px-[24px] flex-1`}
                >
                  {children}
                </main>
                <footer
                  className={`w-full flex items-center justify-center py-3`}
                  style={{ height: layoutConfig.footerHeight }}
                >
                  <p>{siteConfig.description}</p>
                </footer>
              </div>
            </AppLoader>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
