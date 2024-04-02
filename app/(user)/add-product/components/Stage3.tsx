'use client';
import React, { useState } from "react";
import Box from "@/components/ui/Box";
import { Textarea } from "@/components/ui/textarea";

const Stage3 = () => {
    const [ isChecked, setIsChecked ] = useState(false)
    return (
      <div className={ 'add-products-forms-stage3' }>
          <div className={"add-products-form-stage3"}>
              <Box className={'add-products-stage3-box'}>
                  <h1>
                      <img src="/svg/brush.svg" alt="Brush"/>
                      <span>Terms of payment</span>
                  </h1>
                  <div className={"add-products-textarea"}>
                      <Textarea placeholder="This Privacy Policy describes how we collect, use, and protect the information you provide when using our website..."/>
                  </div>
              </Box>
              <Box className={'add-products-stage3-box'}>
                  <h1>
                      <img src="/svg/brush.svg" alt="Brush"/>
                      <span>Terms of payment</span>
                  </h1>
                  <div className={"add-products-textarea"}>
                      <Textarea placeholder="This Privacy Policy describes how we collect, use, and protect the information you provide when using our website..."/>
                  </div>
              </Box>
          </div>
          <div>
              <label className={'add-product-checkbox-wrapper'}>
                  <input className={ isChecked ? "checked" : "" }
                         onChange={() => setIsChecked(!isChecked)} type="checkbox"
                         checked={ isChecked } hidden />
                  { isChecked ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.9987 7.99967L6.9987 9.99967L10.9987 5.99967M14.6654 7.99967C14.6654 11.6816 11.6806 14.6663 7.9987 14.6663C4.3168 14.6663 1.33203 11.6816 1.33203 7.99967C1.33203 4.31778 4.3168 1.33301 7.9987 1.33301C11.6806 1.33301 14.6654 4.31778 14.6654 7.99967Z" stroke="#1DBE60" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ):(
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.9987 14.6663C11.6806 14.6663 14.6654 11.6816 14.6654 7.99967C14.6654 4.31778 11.6806 1.33301 7.9987 1.33301C4.3168 1.33301 1.33203 4.31778 1.33203 7.99967C1.33203 11.6816 4.3168 14.6663 7.9987 14.6663Z" stroke="#262D29" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  <span>M-Bank</span>
              </label>
          </div>
      </div>
    );
}

export default Stage3;