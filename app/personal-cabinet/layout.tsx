import type { Metadata } from "next";
import type { ReactNode } from "react";
import NextBreadcrumb from "@/components/utils/Breascrumb";
import { PersonalSidebar } from "@/app/personal-cabinet/(components)/Sidebar";


//styles
import "../globals.css";
import './styles/personal-cabinet.css';
import { Suspense } from "react";
import Loading from "@/app/personal-cabinet/loading";

export const metadata : Metadata = {
    title: "Personal cabinet",
};


export default function PersonalCabinetLayout({ children } : Readonly<{
    children : ReactNode;
}>) {
    
    return (
      <>
          <Suspense fallback={<Loading/>}>
              <div className=' mt-[20px] md:mt-[40px]'>
                  <NextBreadcrumb
                    homeElement={ 'Home' }
                    separator={ <span className='breadcrumb-list'> \ </span> }
                    activeClasses='breadcrumb-active'
                    containerClasses='flex items-center gap-[8px]'
                    listClasses='breadcrumb-list'
                    capitalizeLinks
                  />
              </div>
              <main className='flex !mt-[20px] md:mt-[40px]'>
                  <div className='globalContainer flex justify-between gap-[20px]'>
                      <PersonalSidebar/>
                      <div className='max-w-[1080px] w-full'>
                          { children }
                      </div>
                  </div>
              </main>
          </Suspense>
          
      </>
    
    );
}
