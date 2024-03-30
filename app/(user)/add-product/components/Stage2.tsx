import Box from "@/components/ui/Box";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

const Stage2 = () => {
    return (
      <div className={ 'add-products-forms' }>
          <div className={ 'add-products-form' }>
              <Box>
                  <h1>
                      <img src="/svg/category.svg" alt="User"/>
                      <span> Category </span>
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
          </div>
      </div>
    );
}

export default Stage2;