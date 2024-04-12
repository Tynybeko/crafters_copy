'use client';

import React, { useEffect, useState } from "react";
import Box from "@/components/ui/Box";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { InputFile } from "@/components/ui/InputFile";
import { Button } from "@/components/ui/button";
import { apiToken } from "@/axios";

const BoxAddProduct = ({ colors, currencies, setBoxes, boxes, item, index }: any) => {
    const [productImages, setProductImages] = useState<File[]>([]);
    const itemId = ( typeof window !== 'undefined') ? localStorage.getItem('itemId') : null
    const handleDataProducts = (selectedColor: any) => {
        const updatedBoxes = [...boxes];
        updatedBoxes[index] = { ...updatedBoxes[index], color: selectedColor?.id};
        setBoxes(updatedBoxes);
    };
    
    const handleFileChange = (file: File) => {
        setProductImages([...productImages, file]);
    };
    
    useEffect(() => {
        const updatedBoxes = [...boxes];
        updatedBoxes[index] = { ...updatedBoxes[index], set_images: productImages };
        setBoxes(updatedBoxes);
    }, [productImages, index, setBoxes]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedBoxes = [...boxes];
        updatedBoxes[index] = { ...updatedBoxes[index], [e.target.name]: e.target.value };
        setBoxes(updatedBoxes);
    };
    
    const handleChangeCurrency = (e: any) => {
        const updatedBoxes = [...boxes];
        updatedBoxes[index] = { ...updatedBoxes[index], currency: e };
        setBoxes(updatedBoxes);
    };
    
    const handleSend = () => {
        const formData = new FormData();
        formData.append('item', itemId || ''); // Возможно, вам нужно использовать itemId, если он существует
        formData.append('name_model', boxes[index].name_model);
        formData.append('quantity', String(boxes[index].quantity));
        formData.append('price', String(boxes[index].price));
        formData.append('currency', String(boxes[index].currency));
        formData.append('color', boxes[index].color);
        productImages.forEach((image) => {
            formData.append(`set_images`, image);
        });
        apiToken.post(`/items-models/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
          .then((response) => {
              console.log('Response:', response.data);
          })
          .catch((error) => {
              console.log('Error:', error);
          });
    };
    
    return (
      <Box className="stage2-box">
          <div className="stage2-box-inputs">
              <label className="stage2-box-inputs-color">
                  <span>Color</span>
                  <Select onValueChange={handleDataProducts}>
                      <SelectTrigger className={'px-[23px]'} disabled={!colors?.length}>
                          <SelectValue className={'!px-0'} placeholder={'Colors'} />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectGroup>
                              {colors?.map((color: any) => (
                                <SelectItem
                                  className="stage2-box-inputs-color-item"
                                  key={color.id}
                                  value={color}
                                >
                                    {color.name}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                      </SelectContent>
                  </Select>
              </label>
              <label className="stage2-box-inputs-model">
                  <span>Model</span>
                  <Input
                    name="name_model"
                    value={item.name_model || ''}
                    onChange={handleChange}
                    placeholder="Name Model"
                  />
              </label>
              <label className="stage2-box-inputs-quantity">
                  <span>Quantity</span>
                  <Input
                    type="number"
                    name="quantity"
                    value={item.quantity || ''}
                    onChange={handleChange}
                    placeholder="Variant 1"
                  />
              </label>
              <div className="stage2-box-inputs-price">
                  <label>
                      <span>Price</span>
                      <Input
                        type="number"
                        name="price"
                        value={item.price || ''}
                        onChange={handleChange}
                        placeholder="Price"
                      />
                  </label>
                  <Select name="currency" onValueChange={handleChangeCurrency}>
                      <SelectTrigger>
                          <SelectValue
                            placeholder={
                                item.currency && currencies
                                  ? currencies.find((currency: any) => currency.id === item.currency)?.code ||
                                  "USD"
                                  : "Currency"
                            }
                          />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectGroup>
                              {currencies?.map((currency: any) => (
                                <SelectItem key={currency.id} value={currency.id}>
                                    {currency.code}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                      </SelectContent>
                  </Select>
              </div>
          </div>
          <div className="stage2-box-images">
              {[...Array(10)].map((_, i) => (
                <InputFile key={i} onChange={handleFileChange} />
              ))}
          </div>
          <Button onClick={handleSend} className="stage2-box-btn">Save</Button>
      </Box>
    );
};

export default BoxAddProduct;
