'use client';

import Banner from "@/components/banner";
import PopularCards from "@/components/cards/PopularCards";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchItems } from "@/redux/slices/items";
import { fetchItemCategories } from "@/redux/slices/item-categories";

import ProductCard from "@/components/cards/ProductCard";
import { cartHistory } from "@/redux/slices/cart";




export default function Home() {
    const dispatch = useAppDispatch();
    const { data: items } = useAppSelector(state => state.items);
    const { data: categories } = useAppSelector(state => state.categories);
    const [popularItems, setPopularItems] = useState([]);

    useEffect(() => {
        dispatch(cartHistory())
        dispatch(fetchItems({}));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchItemCategories());
    }, [dispatch]);

    useEffect(() => {
        if (items && items.length > 0) {
            const sortedItems = items.slice().sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);
            setPopularItems(sortedItems.slice(0, 3));
        }
    }, [items]);

    return (
        <main>
            <Banner />
            <section className="popular mb-[80px]">
                <div className="globalContainer">
                    <div className="popular-title">
                        <h2>Popular category</h2>
                        <div className="popular-title-btns">
                            <button>New</button>
                            <button>Popular</button>
                        </div>
                    </div>
                    <div className="popular-cards">
                        {popularItems && popularItems.length > 0 && popularItems.map((item, index) =>
                            <PopularCards key={index} data={item} />
                        )}
                    </div>
                </div>
            </section>
            <section className='popular'>
                <div className='globalContainer'>
                    {categories && categories.map((category: any) => {
                        let catItems = items?.filter((item: any) => item.category.id === category.id)
                        if (!(catItems && catItems?.length)) {
                            return null
                        }
                        return (
                            <div key={category.id}>
                                <div className='popular-title'>
                                    <h2>{category.name}</h2>
                                    <div className='popular-title-btns'>
                                        <button> New</button>
                                        <button> Popular</button>
                                    </div>
                                </div>
                                <div className='cards'>
                                    {catItems
                                        .sort((a: { rating: number }, b: { rating: number }) => b.rating - a.rating)
                                        .slice(0, 4)
                                        .map((filteredItem: any) => (
                                            <ProductCard key={filteredItem.id} data={filteredItem} />
                                        ))}
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </section>
            <div className='text-center mt-[43px] mb-[120px]'>
                <Button className='w-[127px] mx-auto'>View all</Button>
            </div>
        </main>
    );
}
