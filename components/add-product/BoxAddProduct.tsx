'use client';

import React, { useEffect, useState } from "react";
import Box from "@/components/ui/Box";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { InputFile } from "@/components/ui/InputFile";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { apiToken } from "@/axios";

const BoxAddProduct = ({ colors, currencies, setBoxes, boxes, item, index }: any) => {
    const [selectedColors, setSelectedColors] = useState<any[]>([]);
    const [productImages, setProductImages] = useState<File[]>([]);
    const itemId = ( typeof window !== 'undefined') ? localStorage.getItem('itemId') : null
    const handleDataProducts = (selectedColor: any) => {
        if (selectedColors.some((color) => color.id === selectedColor.id)) {
            setSelectedColors(selectedColors.filter((color) => color.id !== selectedColor.id));
        } else {
            setSelectedColors([...selectedColors, selectedColor]);
        }
    };
    
    useEffect(() => {
        if (boxes[index].set_color.length > 0 && selectedColors.length === 0) {
            const filterColor = colors && colors.filter((color: any) => boxes[index].set_color.includes(color.id));
            setSelectedColors(filterColor || []);
        }
    }, [selectedColors, index, colors, boxes]);
    
    useEffect(() => {
        const updatedBoxes = [...boxes];
        updatedBoxes[index] = { ...updatedBoxes[index], set_color: selectedColors.map((color) => color.id) };
        setBoxes(updatedBoxes);
    }, [selectedColors, index, setBoxes]);
    
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
        formData.append('set_color', JSON.stringify(selectedColors.map(color => color.id)));
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
    console.log(boxes[index].set_color)
    
    return (
      <Box className="stage2-box">
          <div className="stage2-box-inputs">
              <label className="stage2-box-inputs-color">
                  <span>Color</span>
                  <Select onValueChange={handleDataProducts}>
                      <SelectTrigger disabled={!colors?.length} value={selectedColors}>
                          <span>Colors</span>
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
          <div className="flex items-center gap-2 flex-wrap h-[40px] mb-[24px]">
              {selectedColors.map((color: any) => (
                <div
                  style={{ border: `1px solid ${color.color === "#FFFFFF" ? "#ece5db" : color.color}` }}
                  className="stage2-colors"
                  key={color.name}
                >
                    {color.name}
                    <span>
                            <X
                              className="cursor-pointer"
                              onClick={() => handleDataProducts(color)}
                              width={16}
                              height={16}
                            />
                        </span>
                </div>
              ))}
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


// import React, { useEffect, useState } from "react";
// import Box from "@/components/ui/Box";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { InputFile } from "@/components/ui/InputFile";
// import { Button } from "@/components/ui/button";
// import { X } from "lucide-react";
//
// const BoxAddProduct = ({ colors, currencies, setBoxes, boxes, item, index } : any) => {
//     const [ value, setValue ] = useState<any>([]);
//     const [ colorId, setColorId ] = useState<number[]>([]);
//     const [ productImage, setProductImage ] = useState<any>([]);
//
//
//     const handleDataProducts = (e: any) => {
//         const isEventSelected = value.some((item: any) => item.id === e.id);
//         if (isEventSelected) {
//             const updatedValue = value.filter((item: any) => item.id !== e.id);
//             setValue(updatedValue);
//         } else {
//             setValue([...value, {
//                 color: e.color,
//                 id: e.id,
//                 name: e.name,
//             }]);
//             setColorId([...colorId, e.id]);
//         }
//     };
//
//     useEffect(() => {
//         if (boxes[index].set_color.length > 0 && value.length === 0) { // Add condition to prevent infinite loop
//             const filterColor = colors && colors.filter((color: any) => boxes[index].set_color.includes(color.id))
//             setValue(filterColor || []);
//         }
//     }, [value]);
//
//
//     useEffect(() => {
//         const updatedBoxes = [ ...boxes ];
//         updatedBoxes[index] = {
//             ...updatedBoxes[index],
//             set_color: colorId
//         };
//         setBoxes(updatedBoxes);
//     }, [ colorId ]);
//
//     console.log(colorId)
//
//     const handleFileChange = (file : File) => {
//         setProductImage([ ...productImage, file ])
//     };
//
//     useEffect(() => {
//         const updatedBoxes = [ ...boxes ];
//         updatedBoxes[index] = {
//             ...updatedBoxes[index],
//             set_images: productImage
//         };
//         setBoxes(updatedBoxes);
//     }, [productImage]);
//
//     const handleChange = (index : number, e : React.ChangeEvent<HTMLInputElement>) => {
//         const updatedBoxes = [ ...boxes ];
//         updatedBoxes[index] = {
//             ...updatedBoxes[index],
//             [e.target.name]: e.target.value
//         };
//         setBoxes(updatedBoxes);
//     }
//
//     const handleChangeCurrency = (index : number, e : any) => {
//         console.log(e)
//         const updatedBoxes = [ ...boxes ];
//         updatedBoxes[index] = {
//             ...updatedBoxes[index],
//             currency: e
//         };
//         setBoxes(updatedBoxes);
//     }
//
//     return <Box className={ "stage2-box" }>
//         <div className={ "stage2-box-inputs" }>
//             <label className={ "stage2-box-inputs-color" }>
//                 <span>Color</span>
//                 <Select onValueChange={ handleDataProducts }>
//                     <SelectTrigger disabled={ !colors?.length } value={ value }>
//                         <span>Colors</span>
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectGroup>
//                             { colors?.map((item : any) => (
//                               <SelectItem
//                                 className={ 'stage2-box-inputs-color-item' }
//                                 key={ item.id }
//                                 value={ item }>{ item.name }</SelectItem>
//                             )) }
//                         </SelectGroup>
//                     </SelectContent>
//                 </Select>
//             </label>
//             <label className={ "stage2-box-inputs-model" }>
//                 <span>Model</span>
//                 <Input name={ 'name_model' }
//                        value={ item.name_model }
//                        onChange={ (e) => handleChange(index, e) }
//                        placeholder={ "Name Model" }
//                 />
//             </label>
//             <label className={ "stage2-box-inputs-quantity" }>
//                 <span>Quantity</span>
//                 <Input type={ 'number' }
//                        name={ 'quantity' }
//                        value={ item.quantity }
//                        onChange={ (e) => handleChange(index, e) }
//                        placeholder={ "Variant 1" }/>
//             </label>
//             <div className={ "stage2-box-inputs-price" }>
//                 <label>
//                     <span>Price</span>
//                     <Input type={ 'number' }
//                            name={ 'price' }
//                            value={ item.price }
//                            onChange={ (e) => handleChange(index, e) }
//                            placeholder={ "Price" }/>
//                 </label>
//                 <Select name={'currency'} onValueChange={ (e) => handleChangeCurrency(index, e) }>
//                     <SelectTrigger>
//                         <SelectValue
//                           placeholder={
//                               item.currency && currencies
//                                 ? currencies.find((currency: any) => currency.id === item.currency)?.code || 'USD'
//                                 : 'Currency'
//                           }/>
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectGroup>
//                             { currencies?.map((item : any) => (
//                               <SelectItem
//                                 key={ item.id }
//                                 value={ item.id }>{ item.code }
//                               </SelectItem>
//                             )) }
//                         </SelectGroup>
//                     </SelectContent>
//                 </Select>
//             </div>
//         </div>
//         <div className={ 'flex items-center gap-2 flex-wrap h-[40px] mb-[24px]' }>
//             { value && value.map((item : any) => <div
//               style={ {
//                   border: `1px solid ${ item.color == '#FFFFFF' ? '#ece5db' : item.color }`
//               } }
//               className={ `stage2-colors` }
//               key={ item.name }>
//                 { item.name }
//                 <span>
//                     <X className={ 'cursor-pointer' }
//                        onClick={ () => handleDataProducts(item.e) }
//                        width={ 16 }
//                        height={ 16 }/>
//                 </span>
//             </div>) }
//         </div>
//         <div className={ "stage2-box-images" }>
//             <InputFile onChange={ (e) => handleFileChange(e) }/>
//             <InputFile onChange={ handleFileChange }/>
//             <InputFile onChange={ handleFileChange }/>
//             <InputFile onChange={ handleFileChange }/>
//             <InputFile onChange={ handleFileChange }/>
//             <InputFile onChange={ handleFileChange }/>
//             <InputFile onChange={ handleFileChange }/>
//             <InputFile onChange={ handleFileChange }/>
//             <InputFile onChange={ handleFileChange }/>
//             <InputFile onChange={ handleFileChange }/>
//         </div>
//         <Button className={ 'stage2-box-btn' }>Send</Button>
//     </Box>;
// }
//
// export default BoxAddProduct;