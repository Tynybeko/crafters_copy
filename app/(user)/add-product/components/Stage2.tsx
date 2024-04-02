'use client';

import Box from "@/components/ui/Box";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { Input, InputFile } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchColors } from "@/redux/slices/colors";
import { fetchCurrency } from "@/redux/slices/currency";


const Stage2 = () => {
    const dispatch = useAppDispatch()
    const [ boxes, setBoxes ] = useState([{}])
    const {data: colors} = useAppSelector(state => state.colors)
    const {data: currencies} = useAppSelector(state => state.currency)
    
    useEffect(() => {
        dispatch(fetchColors())
        dispatch(fetchCurrency())
    }, [dispatch]);
    
    
    return (
      <div className={ 'stage2' }>
          <div className={ 'stage2-detail' }>
              {boxes.map((item, index) => <BoxAddProduct currencies={currencies} colors={colors} key={ index }/>)}
          </div>
          <Button onClick={() => setBoxes([...boxes, {}])} className={ 'stage2-btn w-full' }>Add</Button>
      </div>
    );
}

export default Stage2;





function BoxAddProduct({colors, currencies}: any) {
    const [ value, setValue ] = useState<any>();

    
    return <Box className={ "stage2-box" }>
        <div className={ "stage2-box-inputs" }>
            <label className={ "stage2-box-inputs-color" }>
                <span>Color</span>
                <Select>
                    <SelectTrigger disabled={!colors?.length}>
                        <SelectValue placeholder="Colors"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {colors?.map((item: any) => <SelectItem key={ item.id } value={ item.id }>{ item.name }</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </label>
            <label className={ "stage2-box-inputs-model" }>
                <span>Model</span>
                <Input placeholder={ "Variant 1" }/>
            </label>
            <label className={ "stage2-box-inputs-quantity" }>
                <span>Quantity</span>
                <Input placeholder={ "Variant 1" }/>
            </label>
            <div className={ "stage2-box-inputs-price" }>
                <label>
                    <span>Price</span>
                    <Input placeholder={ "Price" }/>
                </label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Currency"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {currencies?.map((item: any) => <SelectItem key={ item.id } value={ item.id }>{ item.code }</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className={ "stage2-box-images" }>
            <InputFile image=""/>
            <InputFile image=""/>
            <InputFile image=""/>
            <InputFile image=""/>
            <InputFile image=""/>
            <InputFile image=""/>
            <InputFile image=""/>
            <InputFile image=""/>
            <InputFile image=""/>
            <InputFile image=""/>
        </div>
        <Button className={'stage2-box-btn'}>Send</Button>
    </Box>;
}