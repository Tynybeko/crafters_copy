'use client';

import Box from "@/components/ui/Box";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const EditStage1 = ({valueStage1, setValueStage1}: any) => {
    const { data: categories } = useAppSelector(state => state.categories);

    const handleValueStage1 = (e: any) => {
        setValueStage1({
            ...valueStage1,
            [e.target.name]: e.target.value
        })
    };
    
    return (
      <div className={ 'add-products-forms' }>
          <div className={ 'add-products-form' }>
              <Box>
                  <h1>
                      <img src="/svg/user.svg" alt="User"/>
                      <span>Name</span>
                  </h1>
                  <Input name={ 'name' } placeholder={ 'Product Name' }/>
              </Box>
              <Box>
                  <h1>
                      <img src="/svg/category.svg" alt="User"/>
                      <span>Category</span>
                  </h1>
                  <Select onValueChange={handleValueStage1}>
                      <SelectTrigger  value={valueStage1?.category.id}>
                          <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectGroup>
                              {categories && categories?.map( categories => (
                                <SelectItem key={ categories.id }  value={ String(categories.id) }>{ categories.name }</SelectItem>
                              ))}
                          </SelectGroup>
                      </SelectContent>
                  </Select>
              </Box>
              <Box>
                  <h1>
                      <img src="/svg/sub-category.svg" alt="User"/>
                      <span>Subcategory</span>
                  </h1>
                  <Select >
                      <SelectTrigger>
                          <SelectValue placeholder="Subcategory"/>
                      </SelectTrigger>
                      <SelectContent>
                          <SelectGroup>
                              {/*{[subcategories]?.map( [subcategories] => (*/}
                              {/*  <SelectItem key={ [subcategories].id } value={ String([subcategories].id) }>{ [subcategories].name }</SelectItem>*/}
                              {/*))}*/}
                          </SelectGroup>
                      </SelectContent>
                  </Select>
              </Box>
          </div>
          <div className={ 'add-products-desc' }>
              <Box className={ 'mb-[24px]' }>
                  <h1>
                      <img src="/svg/description.svg" alt="User"/>
                      <span>Description</span>
                  </h1>
                  <div className={ 'mb-[16px]' }>
                      <Textarea name={'description'}  className={ 'resize-none w-full h-[155px]' } placeholder="Description"/>
                  </div>
                  <div className={ 'add-products-desc-footer' }>
                      <p>Enter at least 40 characters</p>
                      <p>9/2000</p>
                  </div>
              </Box>
              <Box>
                  <h1>
                      <img src="/svg/features.svg" alt="User"/>
                      <span>Main features</span>
                  </h1>
                  <div className={ 'mb-[16px]' }>
                      <Textarea name={'main_features'} className={ 'resize-none w-full h-[155px]'} placeholder="Description"/>
                  </div>
                  <div className={ 'add-products-desc-footer' }>
                      <p>Enter at least 40 characters</p>
                      <p>9/2000</p>
                  </div>
              </Box>
          </div>
      </div>
    );
}

export default EditStage1;