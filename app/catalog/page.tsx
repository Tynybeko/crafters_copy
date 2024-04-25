'use client'

import { Button } from "@/components/ui/button";


//style
import './catalog.css'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useCallback, useEffect } from "react";
import { fetchItemSubcategories } from "@/redux/slices/item-subcategories";
import { useRouter } from "next/navigation";
import { fetchItems } from "@/redux/slices/items";
import ProductCard from "@/components/cards/ProductCard";

const Catalogs = () => {
    const dispatch = useAppDispatch();
    const { data: subcategories } = useAppSelector(state => state.subCategories);
    const { data: products } = useAppSelector(state => state.items);
    const router = useRouter();
    const category = typeof window !== 'undefined' ? localStorage.getItem('category') : '';
    const subcategory = typeof window !== 'undefined' ? localStorage.getItem('subcategory') : '';

    useEffect(() => {
        dispatch(fetchItems({ params: { category, subcategory } }));
        dispatch(fetchItemSubcategories({ categoryId: category, nameSubcategory: subcategory }));
    }, [dispatch, category, subcategory]);
    
    const handleRoute = useCallback((category: any) => {
        if (category) {
            localStorage.setItem('category', category.category)
            localStorage.setItem('subcategory', category.id)
            router.push(`/catalog/subcategory/?category=${category.category}&subcategory=${category.id}`);
        }
    }, [router]);


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
                  { subcategories && subcategories.map((category : any) => (
                    <Button onClick={ () => handleRoute(category) }
                            className={ Number(subcategory) === category.id ? 'catalog-items-active' : '' }
                            key={ category.id } variant={ 'outline' }>
                        { category.name }
                    </Button>
                  )) }
              </div>
              <div className={ 'catalog-wrapper' }>
                  <div className={ 'catalog-wrapper-header' }>
                      {subcategories && subcategories.map((category: any) => (
                          Number(subcategory) === category.id && (
                              <h1 key={category.id}>{category.name}</h1>
                          )
                      ))}
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
                  <div className={'card-wrapper'}>
                      { products && products.map((product: any) => (
                          <ProductCard key={product.id} data={product}/>
                        ))}
                  </div>
              </div>
          </div>
      </section>
    );
};

export default Catalogs;
