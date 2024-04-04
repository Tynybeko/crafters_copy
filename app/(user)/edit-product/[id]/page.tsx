'use client'
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMyItems } from "@/redux/slices/my-items";

const EditProductPage = ({ params }: any) => {
    const dispatch = useAppDispatch();
    const { data: myProducts } = useAppSelector(state => state.myItems);
    const [product, setProduct] = useState<any>(null);
    
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
            <div>
                <h1>Edit product</h1>
            </div>
          ) : (
            <div>Loading...</div>
          )}
      </div>
    );
};

export default EditProductPage;