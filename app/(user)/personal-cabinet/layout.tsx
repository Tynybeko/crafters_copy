import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import NextBreadcrumb from "@/components/utils/Breascrumb";
import { PersonalSidebar } from "@/app/(user)/personal-cabinet/components/Sidebar";


//styles
import "../../globals.css";
import './personal-cabinet.css';
import Loading from "@/app/(user)/personal-cabinet/loading";
import PrivateLayout from "@/components/layout/PrivateLayout";

export const metadata: Metadata = {
    title: "Personal cabinet",
};


export default function PersonalCabinetLayout({ children }: Readonly<{
    children: ReactNode;
}>) {

    return (
        <>
            <Suspense fallback={<Loading />}>
                <div className=' mt-[20px] md:mt-[40px]'>
                    <NextBreadcrumb
                        homeElement={'Home'}
                        separator={<span className='breadcrumb-list'> \ </span>}
                        activeClasses='breadcrumb-active'
                        containerClasses='flex items-center gap-[8px]'
                        listClasses='breadcrumb-list'
                        capitalizeLinks
                    />
                </div>
                <main className='flex !mt-[20px] md:mt-[40px]'>
                    <div className='globalContainer flex justify-between gap-[48px]'>
                        <PersonalSidebar />
                        <div className='max-w-[1080px] w-full'>
                            <PrivateLayout>
                                {children}
                            </PrivateLayout>
                        </div>
                    </div>
                </main>
            </Suspense>

        </>

    );
}
