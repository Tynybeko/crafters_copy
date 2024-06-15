'use client';

//STYLES
import './catalog.css'
import { useScreenWidth } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchItemCategories } from "@/redux/slices/item-categories";
import { fetchItemSubcategories } from "@/redux/slices/item-subcategories";


const Catalog = ({ setIsOpenMenu, isOpenCatalog, setIsOpenCatalog }: { setIsOpenMenu: any, isOpenCatalog: boolean, setIsOpenCatalog: any }) => {
    const dispatch = useAppDispatch()
    const { screenWidth } = useScreenWidth()
    const [categoryId, setCategoryId] = useState<number>(1);
    const { data: categories } = useAppSelector(state => state.categories)
    const { data: subcategories } = useAppSelector(state => state.subCategories)
    const handleCatalogHover = (id: any) => setCategoryId(id)
    useEffect(() => {
        dispatch(fetchItemCategories())
    }, [dispatch]);

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchItemSubcategories({}))
        }
    }, [dispatch]);


    return (
        <>
            <div
                className={` ${isOpenCatalog ? 'catalog activeCatalog' : 'catalog'} w-full `}>
                <div className={screenWidth >= 768 ? 'flex items-start' : ''}>
                    <div className={'mobile-catalog-lists'}>
                        {screenWidth <= 768 ? (
                            <Button size='full' onClick={() => setIsOpenMenu((prev: any) => !prev)}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 12L6 8L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                                Back
                            </Button>
                        ) : null}
                        <Accordion type="single" collapsible className="w-full">
                            {categories?.map((item: any) => (
                                <AccordionItem onClick={() => handleCatalogHover(item.id)} value={item.id} key={item.id}>
                                    <AccordionTrigger>{item.name}</AccordionTrigger>
                                    {subcategories?.filter(item => item.category === categoryId).map((item: any) => (
                                        <AccordionContent key={item.id}>
                                            <div className={'mobile-subcategories-card'}>
                                                <img src={item.image ? item.image : '/images/sub-category.png'} alt="image" />
                                                <span>{item.name}</span>
                                            </div>
                                        </AccordionContent>
                                    ))}
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                    <div className={'mobile-mobile-catalog-list-items'}>

                    </div>
                </div>
            </div>
            <div onClick={() => setIsOpenCatalog(!isOpenCatalog)} className={isOpenCatalog ? 'catalog-decor' : ''} />
        </>
    );
};
export default Catalog;
