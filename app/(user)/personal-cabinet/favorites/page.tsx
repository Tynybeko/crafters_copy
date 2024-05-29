'use client'

import React from 'react'
import { useAppSelector } from "@/redux/hooks";

// styles
import './favorites.css'
import ProductCard from "@/components/cards/ProductCard";

function Favorites() {
    const { data: favorites } = useAppSelector(state => state.favorites)

    return (
        <>
            <section>
                <div className={'globalContainer'}>
                    <div className={'favorites-items'}>
                        {favorites && favorites.length ? (
                            favorites.map((item: any) => (
                                <ProductCard key={item.id} data={item.item_data} />
                            ))
                        ) : <div className='w-full justify-center flex'>
                            Пока пусто
                        </div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Favorites
