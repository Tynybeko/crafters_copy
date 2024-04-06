'use client';

import { Button } from "@/components/ui/button";


//style
import './catalog.css'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchItemCategories } from "@/redux/slices/item-categories";
import React, { useEffect, useState } from "react";

const Catalogs = () => {
    const dispatch = useAppDispatch()
    const { data: categories } = useAppSelector(state => state.categories)
    const [ activeCatalog, setActiveCatalog ] = useState<number>(1);
    useEffect(() => {
        dispatch(fetchItemCategories())
    }, [ dispatch ])
    
    console.log(categories)
    
    return (
      <section className='mt-[20px] md:mt-[40px]'>
          <div className={ 'globalContainer' }>
              <div className={ 'catalog-banner' }>
                  <div className={ 'catalog-banner-content' }>
                      <h1>
                          Over 1,000 offers already
                      </h1>
                  </div>
                  <div className={ 'catalog-banner-img' }>
                      <img src={ "/images/catalog1.jpeg" } alt={ "Image" }/>
                  </div>
              </div>
              <div className={ 'catalog-items' }>
                  { categories && categories.map((category : any) => (
                    <Button onClick={ () => setActiveCatalog(category.id) }
                            className={ activeCatalog === category.id ? 'catalog-items-active' : '' }
                            key={ category.id } variant={ 'outline' }>
                        { category.name }
                    </Button>
                  )) }
              </div>
              <div className={ 'catalog-wrapper' }>
                  <div className={ 'catalog-wrapper-header' }>
                      <h1>Soft toy</h1>
                      <div className={ 'catalog-wrapper-header-btns' }>
                          <button className={ 'catalog-wrapper-header-btn catalog-wrapper-header-btn-active' }>New
                          </button>
                          <button className={ 'catalog-wrapper-header-btn' }>Popular</button>
                          <Button className={ 'filter' }>
                              Filter
                              <svg className="w-2.5 h-2.5 ms-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                                   viewBox="0 0 10 6">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"/>
                              </svg>
                          </Button>
                      </div>
                  </div>
                  <div>
                      
                  </div>
              </div>
          </div>
      </section>
    );
};

export default Catalogs;
