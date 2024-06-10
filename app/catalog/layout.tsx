import type { Metadata } from "next";
import "../globals.css";
import type { ReactNode } from "react";
import NextBreadcrumb from "../../components/utils/Breascrumb";


export const metadata: Metadata = {
  title: "Catalogs",
};

export default function CatalogsLayout({ children }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className={'mt-[40px]'}>
      <NextBreadcrumb
        homeElement={'Home'}
        separator={<span className='breadcrumb-list'> \ </span>}
        activeClasses='breadcrumb-active'
        containerClasses='flex items-center gap-[8px]'
        listClasses='breadcrumb-list'
        capitalizeLinks
      />
      {children}
    </main>
  );
}
