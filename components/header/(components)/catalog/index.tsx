'use client';

//STYLES
import './catalog.css'
import { useScreenWidth } from "@/lib/hooks";
import React from "react";
import Link from "next/link";
import { Button } from '@/components/ui/button';


const catalogData = [
    {
        id: 1,
        name: 'Category 1'
    },
    {
        id: 2,
        name: 'Category 2'
    },
    {
        id: 3,
        name: 'Category 3'
    },
    {
        id: 4,
        name: 'Category 4'
    }
    ,
    {
        id: 5,
        name: 'Category 5'
    }
]

const Catalog = ({ setIsOpenMenu, isOpenCatalog, setIsOpenCatalog }: { setIsOpenMenu: any, isOpenCatalog: boolean, setIsOpenCatalog: any }) => {
    const { screenWidth } = useScreenWidth()
    return (
        <>
            <div onMouseEnter={() => setIsOpenCatalog(true)} onMouseLeave={() => setIsOpenCatalog(false)} className={` ${isOpenCatalog ? 'catalog activeCatalog' : 'catalog'} ${screenWidth <= 768 ? 'w-full' : 'max-w-[1140px] w-full'}`}>
                <div className={screenWidth >= 768 ? 'flex items-start' : ''}>
                    <div className={screenWidth >= 768 ? 'catalog-lists' : 'mobile-catalog-lists'}>
                        {screenWidth <= 768 ? (
                            <Button size='full' onClick={() => setIsOpenMenu((prev: any) => !prev)}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 12L6 8L10 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Back
                            </Button>
                        ) : null}
                        <ul className='catalog-list'>
                            {catalogData.map(item => (
                                <li key={item.id}>
                                    <Link href='#'>{item.name}</Link>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#262D29" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                    <div className={screenWidth >= 768 ? 'catalog-list-items' : 'mobile-catalog-list-items'}>

                    </div>
                </div>
            </div>
            <div onClick={() => setIsOpenCatalog(!isOpenCatalog)} className={isOpenCatalog ? 'catalog-decor' : ''} />
        </>
    );
};
export default Catalog;
