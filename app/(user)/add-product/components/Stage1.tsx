import Box from "@/components/ui/Box";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const Stage1 = () => {
    return (
      <div className={ 'add-products-forms' }>
          <div className={ 'add-products-form' }>
              <Box>
                  <h1>
                      <img src="/svg/user.svg" alt="User"/>
                      <span>
                                 Name
                              </span>
                  </h1>
                  <Input placeholder={ 'Company 1' }/>
              </Box>
              <Box>
                  <h1>
                      <img src="/svg/category.svg" alt="User"/>
                      <span>
                                 Category
                              </span>
                  </h1>
                  <Select>
                      <SelectTrigger>
                          <SelectValue placeholder="Category"/>
                      </SelectTrigger>
                      <SelectContent>
                          <SelectGroup>
                              <SelectItem value="en">Category 1</SelectItem>
                              <SelectItem value="uzb">Category 2</SelectItem>
                              <SelectItem value="kg">Category 3</SelectItem>
                          </SelectGroup>
                      </SelectContent>
                  </Select>
              </Box>
              <Box>
                  <h1>
                      <img src="/svg/sub-category.svg" alt="User"/>
                      <span>
                                 Subcategory
                              </span>
                  </h1>
                  <Select>
                      <SelectTrigger>
                          <SelectValue placeholder="Subcategory"/>
                      </SelectTrigger>
                      <SelectContent>
                          <SelectGroup>
                              <SelectItem value="en">Subcategory 1</SelectItem>
                              <SelectItem value="uzb">Subcategory 2</SelectItem>
                              <SelectItem value="kg">Subcategory 3</SelectItem>
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
                      <Textarea className={ 'resize-none w-full h-[155px]' } placeholder="Description"/>
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
                      <Textarea placeholder="Description"/>
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