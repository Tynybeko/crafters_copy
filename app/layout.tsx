import "./globals.css";
import Header from "@/components/layout/Header";
import type { ReactNode } from "react";
import StoreProvider from "@/providers/storeProvider";
import localFont from 'next/font/local';
import '@/app/globals.css'
import { Suspense } from "react";
import Loading from "@/app/loading";
import ToastifyRoot from "@/components/toastify";
import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";


const myFont = localFont({
  src: [
    {
      path: '../fonts/sf-pro-display_bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../fonts/sf-pro-display_medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../fonts/sf-pro-display_light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../fonts/sf-pro-display_regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/sf-pro-display_semibold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../fonts/sf-pro-display_thin.woff2',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../fonts/sf-pro-display_ultralight.woff2',
      weight: '200',
      style: 'normal'
    }
  ]
})

export const metadata: Metadata = {
  title: "Crafters",
  description: "the best marketplace in Central Asia",
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
          <ToastifyRoot />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
          <Footer />
        </body>
      </StoreProvider>
    </html>
  );
}
