'use client';

import Box from "@/components/ui/Box";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchItemCategories } from "@/redux/slices/item-categories";
import { fetchItemSubcategories } from "@/redux/slices/item-subcategories";

const Stage1 = ({ dataProducts, setDataProducts }: any) => {
    const dispatch = useAppDispatch()
    const {data: categories} = useAppSelector(state => state.categories)
    const {data: subcategories} = useAppSelector(state => state.subCategories)
    const [ categoryId, setCategoryId ] = useState<any>();
    
    useEffect(() => {
        dispatch(fetchItemCategories())
    }, [dispatch]);
    
    useEffect(() => {
        if(categoryId){
            dispatch(fetchItemSubcategories({categoryId}))
        }
    }, [categoryId, dispatch]);


    const handleDataProducts = (e: any) => {
        setDataProducts({
            ...dataProducts,
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
                  <Input value={dataProducts.name} onChange={handleDataProducts} name={ 'name' } placeholder={ 'Company 1' }/>
              </Box>
              <Box>
                  <h1>
                      <img src="/svg/category.svg" alt="User"/>
                      <span>Category</span>
                  </h1>
                  <Select onValueChange={(e) => {
                      setCategoryId(e)
                      setDataProducts({
                          ...dataProducts,
                          category: e
                      })
                  }} value={dataProducts.category }>
                      <SelectTrigger>
                          <SelectValue placeholder="Category"/>
                      </SelectTrigger>
                      <SelectContent>
                          <SelectGroup>
                              {categories?.map( categories => (
                                  <SelectItem key={ categories.id } value={ String(categories.id) }>{ categories.name }</SelectItem>
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
                  <Select onValueChange={(e) => setDataProducts({ ...dataProducts, subcategory: e })} value={dataProducts.subcategory}>
                      <SelectTrigger disabled={!subcategories?.length}>
                          <SelectValue placeholder="Subcategory"/>
                      </SelectTrigger>
                      <SelectContent>
                          <SelectGroup>
                              {subcategories?.map( subcategories => (
                                  <SelectItem key={ subcategories.id } value={ String(subcategories.id) }>{ subcategories.name }</SelectItem>
                              ))}
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
                      <Textarea name={'description'} onChange={handleDataProducts} value={dataProducts.description} className={ 'resize-none w-full h-[155px]' } placeholder="Description"/>
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
                      <Textarea name={'main_features'} onChange={handleDataProducts} value={dataProducts.main_features} className={ 'resize-none w-full h-[155px]'} placeholder="Description"/>
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

export default Stage1;