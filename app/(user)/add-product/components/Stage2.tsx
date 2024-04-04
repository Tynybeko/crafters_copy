'use client';

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchColors } from "@/redux/slices/colors";
import { fetchCurrency } from "@/redux/slices/currency";
import BoxAddProduct from "@/components/add-product/BoxAddProduct";


const Stage2 = ({ setBoxes, boxes } : any) => {
    const dispatch = useAppDispatch()
    const { data: colors } = useAppSelector(state => state.colors)
    const { data: currencies } = useAppSelector(state => state.currency)
    const itemId = ( typeof window !== 'undefined') ? localStorage.getItem('itemId') : null
  
    useEffect(() => {
        dispatch(fetchColors())
        dispatch(fetchCurrency())
    }, [ dispatch ]);
    
    const handleAddBox = () => {
        setBoxes([ ...boxes, {
            set_color: [],
            name_model: '',
            quantity  : null,
            price     : null,
            item      : Number(itemId),
            currency  : 1
        } ])
    }
    

    
    return (
      <div className={ 'stage2' }>
          <div className={ 'stage2-detail' }>
              { boxes.map((item: any, index: number) => (
                <BoxAddProduct
                  item={item}
                  index={index}
                  setBoxes={setBoxes}
                  boxes={boxes}
                  currencies={ currencies }
                  colors={ colors }
                  key={ index }
                />))
              }
          </div>
          <Button onClick={handleAddBox} className={ 'stage2-btn w-full opacity-50' }>Add</Button>
      </div>
    );
}

export default Stage2;
