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

const EditProductPage = ({ params }: any) => {
    const dispatch = useAppDispatch();
    const [ activeStage, setActiveStage ] = useState(1);
    const { data: myProducts } = useAppSelector(state => state.myItems);
    const [product, setProduct] = useState<any>(null);
    const [ valueStage1, setValueStage1 ] = useState({
        name         : product?.name,
        description  : product?.description,
        main_features: product?.main_features,
        category     : product?.category,
        subcategory  : product?.subcategory,
    });
    
    useEffect(() => {
        dispatch(fetchMyItems());
    }, [dispatch]);
    
    useEffect(() => {
        if (myProducts && myProducts.length > 0) {
            const foundProduct = myProducts.find((item) => item.id === Number(params.id));
            setProduct(foundProduct);
        }
    }, [dispatch, myProducts, params.id]);
    
    
    return (
      <div>
          {product ? (
            <>
                <div className={ 'add-products' }>
                    <div className={ 'globalContainer' }>
                        <div className={ 'add-products-steps' }>
                            <div
                              onClick={ () => setActiveStage(1) }
                              className={ activeStage === 1 ? 'add-products-step add-products-step-active' : 'add-products-step' }
                            >
                                Stage 1
                            </div>
                            <div
                              onClick={ () => setActiveStage(2) }
                              className={ activeStage === 2 ? 'add-products-step add-products-step-active' : 'add-products-step' }
                            >
                                Stage 2
                            </div>
                            <div
                              onClick={ () => setActiveStage(3) }
                              className={ activeStage === 3 ? 'add-products-step add-products-step-active' : 'add-products-step' }
                            >
                                Stage 3
                            </div>
                        </div>
                        <div className={ 'add-products-stages' }>
                            { activeStage === 1 && <EditStage1 valueStage1={valueStage1} setValueStage1={setValueStage1}/> }
                            {activeStage === 2 && <EditStage2/> }
                            {activeStage === 3 && <EditStage3/> }
                        </div>
                    </div>
                    
                    <div className={ 'add-products-btn' }>
                        <Button className={ 'max-w-[416px] w-full' }>
                            { activeStage === 3 ? 'Publish' : 'Continued' }
                        </Button>
                    </div>
                </div>
            </>
          ) : (
            <Loading/>
          )}
      </div>
    );
};

export default EditProductPage;