import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/header";
import type { ReactNode } from "react";


export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      {children}
      </body>
    </html>
  );
}
