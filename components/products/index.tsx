import React, { useEffect } from 'react';
import ProductCard from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchItems } from "@/redux/slices/items";

const Products = () => {
    const dispatch = useAppDispatch();
    const {data: items} = useAppSelector(state => state.items);
    
    useEffect(() => {
        dispatch(fetchItems())
    }, [dispatch]);
    
    console.log(items)
    
    return (
      <>
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
                      { items && items.map((item: any, index: any) => (
                        <ProductCard key={ index } data={ item }/>
                      )) }
                  </div>
              </div>
          </section>
          <div className='text-center mt-[43px] mb-[120px]'>
              <Button className='w-[127px] mx-auto'>View all</Button>
          </div>
      </>
    );
};

export default Products;
