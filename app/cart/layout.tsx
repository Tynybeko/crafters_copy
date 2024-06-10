import type { Metadata } from "next";
import "../globals.css";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Catalogs",
};

export default function FuckLayout({ children }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <main className={'mt-[40px]'}>
            {children}
        </main>
    )
}
