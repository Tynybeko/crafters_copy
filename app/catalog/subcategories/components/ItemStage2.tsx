'use client';

import React, {useState} from 'react';
import {ItemsTypes} from "@/types";
import Box from "@/components/ui/Box";
import {Button} from "@/components/ui/button";

const ItemStage2 = ({colorModels, product}: { colorModels: any, product: ItemsTypes }) => {
    const handleCopy = () => navigator.clipboard.writeText(colorModels.code);


    console.log(product)

    return (
        <section className={'main-features'}>
            <div className={'globalContainer'}>
                <div className={'features-item'}>
                    <div className={'features-content'}>
                        <h1>Main characteristics {colorModels?.name}</h1>
                        <p>{product?.main_features}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ItemStage2;
