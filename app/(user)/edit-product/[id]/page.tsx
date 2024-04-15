'use client'
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMyItems } from "@/redux/slices/my-items";
import EditStage1 from "@/app/(user)/edit-product/EditStage1";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";

// styles
import '../../add-product/add-product.css'
import EditStage2 from "@/app/(user)/edit-product/EditStage2";
import EditStage3 from "@/app/(user)/edit-product/EditStage3";

const EditProductPage = ({ params } : any) => {
    const dispatch = useAppDispatch();
    const { data: myProducts, isLoading } = useAppSelector(state => state.myItems);
    const [activeStage, setActiveStage] = useState(1);
    const [product, setProduct] = useState<any>(null);
    const [valueStage1, setValueStage1] = useState<any>(null);
    
    useEffect(() => {
        dispatch(fetchMyItems());
    }, [dispatch]);
    
    useEffect(() => {
        if (myProducts && myProducts.length > 0) {
            const foundProduct = myProducts.find((item) => item.id === Number(params.id));
            setProduct(foundProduct);
        }
    }, [myProducts, params.id]);
    
    useEffect(() => {
        if (product) {
            setValueStage1({
                category      : {
                    created_at : product.category.created_at,
                    description: product.category.description,
                    name       : product.category.name,
                    updated_at : product.category.updated_at,
                    id         : product.category.id
                },
                code          : product.code,
                description   : product.description,
                discount_price: product.discount_price,
                image         : product.image,
                main_features : product.main_features,
                name          : product.name,
                price         : product.price,
                subcategory   : product.subcategory
            });
        }
    }, [product]);
    
    
    return (
      <div>
          {isLoading ? (
            <Loading/>
          ) : product ? (
            <div className={'add-products'}>
                <div className={'globalContainer'}>
                    <div className={'add-products-steps'}>
                        <div
                          onClick={() => setActiveStage(1)}
                          className={activeStage === 1 ? 'add-products-step add-products-step-active' : 'add-products-step'}
                        >
                            Stage 1
                        </div>
                        <div
                          onClick={() => setActiveStage(2)}
                          className={activeStage === 2 ? 'add-products-step add-products-step-active' : 'add-products-step'}
                        >
                            Stage 2
                        </div>
                        <div
                          onClick={() => setActiveStage(3)}
                          className={activeStage === 3 ? 'add-products-step add-products-step-active' : 'add-products-step'}
                        >
                            Stage 3
                        </div>
                    </div>
                    <div className={'add-products-stages'}>
                        {activeStage === 1 && <EditStage1 setValueStage1={setValueStage1} valueStage1={valueStage1}/>}
                        {activeStage === 2 && <EditStage2/>}
                        {activeStage === 3 && <EditStage3/>}
                    </div>
                </div>
                <div className={'add-products-btn'}>
                    <Button onClick={() => setActiveStage(prevState => prevState + 1)} className={'max-w-[416px] w-full'}>
                        {activeStage === 3 ? 'Publish' : 'Continue'}
                    </Button>
                </div>
            </div>
          ) : null}
      </div>
    );
};

export default EditProductPage;
