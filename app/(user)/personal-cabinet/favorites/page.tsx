'use client'

import React from 'react'
import { useAppSelector } from "@/redux/hooks";

// styles
import './favorites.css'
import ProductCard from "@/components/cards/ProductCard";
import EmptyBox from '@/components/empty-box';

function Favorites() {
    const { data: favorites } = useAppSelector(state => state.favorites)

    return (
        <>
            <section>
                <div className={'globalContainer'}>
                    <div className={'favorites-items gap-3'}>
                        {favorites && favorites.length ? (
                            favorites.map((item: any) => (
                                <ProductCard key={item.id} data={item.item_data} />
                            ))
                        ) : <EmptyBox />
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Favorites
