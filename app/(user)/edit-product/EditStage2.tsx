'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { InputFile } from "@/components/ui/InputFile";
import Box from "@/components/ui/Box";


const Stage2 = () => {
    
    return (
      <div className={ 'stage2' }>
          <div className={ 'stage2-detail' }>
              <Box className="stage2-box">
                  <div className="stage2-box-inputs">
                      <label className="stage2-box-inputs-color">
                          <span>Color</span>
                          <Select>
                              <SelectTrigger>
                                  <span>Colors</span>
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectGroup>
                                      {/*{colors?.map((color: any) => (*/}
                                      {/*  <SelectItem*/}
                                      {/*    className="stage2-box-inputs-color-item"*/}
                                      {/*    key={color.id}*/}
                                      {/*    value={color}*/}
                                      {/*  >*/}
                                      {/*      {color.name}*/}
                                      {/*  </SelectItem>*/}
                                      {/*))}*/}
                                  </SelectGroup>
                              </SelectContent>
                          </Select>
                      </label>
                      <label className="stage2-box-inputs-model">
                          <span>Model</span>
                          <Input
                            name="name_model"
                            placeholder="Name Model"
                          />
                      </label>
                      <label className="stage2-box-inputs-quantity">
                          <span>Quantity</span>
                          <Input
                            type="number"
                            name="quantity"
                            placeholder="Variant 1"
                          />
                      </label>
                      <div className="stage2-box-inputs-price">
                          <label>
                              <span>Price</span>
                              <Input
                                type="number"
                                name="price"
                                placeholder="Price"
                              />
                          </label>
                          <Select name="currency" >
                              <SelectTrigger>
                                  <SelectValue
                                    // placeholder={
                                    //     item.currency && currencies
                                    //       ? currencies.find((currency: any) => currency.id === item.currency)?.code ||
                                    //       "USD"
                                    //       : "Currency"
                                    // }
                                  />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectGroup>
                                      {/*{currencies?.map((currency: any) => (*/}
                                      {/*  <SelectItem key={currency.id} value={currency.id}>*/}
                                      {/*      {currency.code}*/}
                                      {/*  </SelectItem>*/}
                                      {/*))}*/}
                                  </SelectGroup>
                              </SelectContent>
                          </Select>
                      </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap h-[40px] mb-[24px]">
                      {/*{selectedColors.map((color: any) => (*/}
                      {/*  <div*/}
                      {/*    style={{ border: `1px solid ${color.color === "#FFFFFF" ? "#ece5db" : color.color}` }}*/}
                      {/*    className="stage2-colors"*/}
                      {/*    key={color.name}*/}
                      {/*  >*/}
                      {/*      {color.name}*/}
                      {/*      <span>*/}
                      {/*      <X*/}
                      {/*        className="cursor-pointer"*/}
                      {/*        onClick={() => handleDataProducts(color)}*/}
                      {/*        width={16}*/}
                      {/*        height={16}*/}
                      {/*      />*/}
                      {/*  </span>*/}
                      {/*  </div>*/}
                      {/*))}*/}
                  </div>
                  <div className="stage2-box-images">
                      {[...Array(10)].map((_, i) => (
                        <InputFile key={i} onChange={() => console.log(i)} />
                      ))}
                  </div>
                  <Button className="stage2-box-btn">Save</Button>
              </Box>
          </div>
          <Button className={ 'stage2-btn w-full opacity-50' }>Add</Button>
      </div>
    );
}

export default Stage2;
