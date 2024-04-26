'use client';

import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {fetchMyPurchases} from "@/redux/slices/my-purchases";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Box from "@/components/ui/Box";
import {Separator} from "@/components/ui/separator";


//styles
import './my-purchases.css'
import {IPurchasesItem} from "@/types";


function MyPurchases() {
    const dispatch = useAppDispatch()
    const purchases = useAppSelector(state => state.myPurchases.data)

    useEffect(() => {
        dispatch(fetchMyPurchases())
    }, [dispatch]);

    return (
        <section>
            <div className={'globalContainer'}>
                <div className={'purchases-items'}>
                    {purchases?.length && purchases.map((item) => (
                        <PurchasesItem key={item.id} item={item}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MyPurchases

function PurchasesItem({item}: any) {

    console.log(item)

    return (
        <Box className={"p-[24px] rounded-[32px]"}>
            <Accordion type="single" collapsible>
                <AccordionItem value={item.id} className={"border-none"}>
                    <AccordionTrigger className={"purchases-trigger"}>
                        <div className={"purchases-trigger-item"}>
                            <h1>№ {item.id} <span>{item.created_at.split('T')[0].split('-').reverse().join('.')}</span>
                            </h1>
                            <span>{item.status}</span>
                        </div>
                        <Separator orientation={"vertical"}/>
                        <div className={"purchases-trigger-item"}>
                            <h2>Goods</h2>
                            <p>{item.items.length}</p>
                        </div>
                        <Separator orientation={"vertical"}/>
                        <div className={"purchases-trigger-item"}>
                            <h2>Paid</h2>
                            <p className={"!text-[#F83427]"}>{item.total}</p>
                        </div>
                    </AccordionTrigger>
                    {item.items.map((product: IPurchasesItem) => (
                        <AccordionContent className={"purchases-content"}>
                            <Box key={product.id} className={"p-[24px]"}>
                                <div className={"purchases-content-title"}>
                                    <div className={"purchases-content-title-img"}>
                                        <img src={product.item_data.company_owner.image} alt=""/>
                                    </div>
                                    <h2>{product.item_data.company_owner.legal_name}</h2>
                                </div>
                                <div className={"purchases-content-items"}>
                                    <div className={" purchases-content-item1"}>
                                        <div className={"purchases-content-item-img"}>
                                            <img  src={product.item_data.image} alt=""/>
                                        </div>
                                        <div className={"flex flex-col gap-2 w-full"}>
                                            <p className={'flex items-center gap-2'}>Code # {product.item_data.code}
                                                <img src="/svg/copy.svg" alt="Image"/>
                                            </p>
                                            <h1>{product.item_data.name}</h1>
                                            <div className={"flex items-center justify-between"}>
                                                <p className={'flex items-center gap-2'}>Leave a comment
                                                    <img src="/svg/clipboard-plus.svg" alt="Image"/>
                                                </p>
                                                <span className={"text-[#1DBE60]"}>{product.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Separator orientation={"vertical"} className={"h-[70px]"}/>
                                    <div className={"purchases-content-item"}>
                                        <h2>Goods</h2>
                                        <span>{product.quantity}</span>
                                    </div>
                                    <Separator orientation={"vertical"} className={"h-[70px]"}/>
                                    <div className={"purchases-content-item"}>
                                        <h2>Paid</h2>
                                        <span className={"!text-[#F83427]"}>{product.item_data.price}</span>
                                    </div>
                                </div>
                            </Box>
                        </AccordionContent>
                    ))}
                </AccordionItem>
            </Accordion>
        </Box>
    );
}
