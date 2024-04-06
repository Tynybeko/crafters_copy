'use client';
import React, { useEffect, useState } from 'react';
import { api } from "@/axios";
import Loading from "@/components/loading";
import Stages from "@/components/ui/Stages";
import ItemStage1 from "@/app/catalogs/soft-toy/components/ItemStage1";
import ItemStage2 from "@/app/catalogs/soft-toy/components/ItemStage2";
import ItemStage3 from "@/app/catalogs/soft-toy/components/ItemStage3";
import ItemStage4 from "@/app/catalogs/soft-toy/components/ItemStage4";
import { ItemsTypes } from "@/types";


const stageNames = [
    'All about the product',
    'Main features',
    'Reviews',
    'Photo',
]
const ProductPage = ({ params } : any) => {
    const [ product, setProduct ] = useState<ItemsTypes | null>(null);
    const [ activeStage, setActiveStage ] = useState(1)
    
    useEffect(() => {
        api.get(`/items/${ params.id }`)
          .then((res) => {
              setProduct(res.data)
          })
          .catch((err) => {
              console.log(err)
          })
    }, []);
    
    console.log(product)
    
    return (
      <>
          { product ? (
            <section className={ 'mt-[16px] md:mt-[36px]' }>
                <div className={ 'globalContainer' }>
                    <Stages
                      className={ ' !grid-cols-2 md:!grid-cols-4 !gap-y-4' }
                      stageNames={ stageNames }
                      activeStage={ activeStage }
                      setActiveStage={ setActiveStage }
                    />
                </div>
                <div>
                    { activeStage === 1 && <ItemStage1 product={product}/> }
                    { activeStage === 2 && <ItemStage2/> }
                    { activeStage === 3 && <ItemStage3/> }
                    { activeStage === 4 && <ItemStage4/> }
                </div>
            </section>
          ) : (
            <Loading/>
          ) }
      </>
    );
};

export default ProductPage;
