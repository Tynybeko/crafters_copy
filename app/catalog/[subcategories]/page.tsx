'use client'


import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import React, {useEffect, useState} from "react";
import {fetchItems} from "@/redux/slices/items";
import {ItemsTypes, ItemsTypes2} from "@/types";
import ProductCard from "@/components/cards/ProductCard";


//styles
import './soft-toy.css'

const SoftToys = () => {
    const dispatch = useAppDispatch()
    const subcategory = typeof window !== 'undefined' ? localStorage.getItem('subcategory') : '';
    const [params, setParams] = useState({
        subcategory: subcategory
    })
    const products: ItemsTypes2[] = useAppSelector(state => state.items.data)


    useEffect(() => {
        dispatch(fetchItems({params: params}))
    }, []);

    return (
        <div>
            <div className={'globalContainer'}>
                <div className={'catalog-banner'}>
                    <div className={'catalog-banner-content'}>
                        <h1>
                            Over 1,000 offers already
                        </h1>
                    </div>
                    <div className={'catalog-banner-img'}>
                        <img src={"/images/catalog1.jpeg"} alt={"Image"}/>
                    </div>
                </div>
                <div className={'subcategory_title'}>
                    <h1>
                        {products[0]?.name}
                    </h1>
                </div>
                <div className={'cards'}>
                    {products && products.length ? products.map((item) => (
                        <ProductCard key={item.id} data={item}/>
                    )) : <div
                        className={'w-full h-[75vh] flex items-center justify-center text-red-500 font-bold text-[24px]'}>Пока
                        Пустой</div>}
                </div>
            </div>

        </div>

    );
};

export default SoftToys;
