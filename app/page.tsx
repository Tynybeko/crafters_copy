'use client';

import Banner from "@/components/banner";
import PopularCards from "@/components/cards/PopularCards";
import { PopularData } from "@/fakeObj";
import ProductCard from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchItems } from "@/redux/slices/items";


export default function Home() {
    const dispatch = useAppDispatch();
    const { data: items } = useAppSelector(state => state.items);
    
    useEffect(() => {
        dispatch(fetchItems({}))
    }, [ dispatch ]);
    
    console.log(items)
    return (
      <main>
          <Banner/>
          <section className="popular">
              <div className="globalContainer">
                  <div className="popular-title">
                      <h2>Popular category</h2>
                      <div className="popular-title-btns">
                          <button>New</button>
                          <button>Popular</button>
                      </div>
                  </div>
                  <div className="popular-cards">
                      { PopularData.map((item, index) =>
                        <PopularCards key={ index } data={ item }/>
                      ) }
                  </div>
              </div>
          </section>
          <section className='popular'>
              <div className='globalContainer'>
                  <div className='popular-title'>
                      <h2>Soft toy</h2>
                      <div className='popular-title-btns'>
                          <button> New</button>
                          <button> Popular</button>
                      </div>
                  </div>
                  <div className='cards'>
                      { items && items.map((item : any) => (
                        <ProductCard key={ item.id } data={ item }/>
                      )) }
                  </div>
              </div>
          </section>
          <div className='text-center mt-[43px] mb-[120px]'>
              <Button className='w-[127px] mx-auto'>View all</Button>
          </div>
      </main>
    );
}
