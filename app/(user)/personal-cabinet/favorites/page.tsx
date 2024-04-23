'use client';

import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {fetchFavorites} from "@/redux/slices/favorites";

// styles
import './favorites.css'
import ProductCard from "@/components/cards/ProductCard";
import Loading from "@/components/loading";

function Favorites() {
    const dispatch = useAppDispatch()
    const {data: favorites, isLoading} = useAppSelector(state => state.favorites)

    return (
        <>
            <section>
                <div className={'globalContainer'}>
                    <div className={'favorites=items'}>
                        {favorites && favorites.length ? (
                            favorites.map((item: any) => (
                                <ProductCard key={item.id} data={item.item_data}/>
                            ))
                        ) : ( 'none' )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Favorites
