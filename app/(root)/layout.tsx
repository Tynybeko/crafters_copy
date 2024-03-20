import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/header";
import type { ReactNode } from "react";
import StoreProvider from "@/providers/storeProvider";
import localFont from 'next/font/local';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const myFont = localFont({
  src: [
    {
      path: '../../fonts/sf-pro-display_bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../fonts/sf-pro-display_medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../fonts/sf-pro-display_light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../fonts/sf-pro-display_regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../fonts/sf-pro-display_semibold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../fonts/sf-pro-display_thin.woff2',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../../fonts/sf-pro-display_ultralight.woff2',
      weight: '200',
      style: 'normal'
    }
  ]
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={myFont.className}>
          <Header />
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
