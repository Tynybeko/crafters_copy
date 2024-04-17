'use client'

import React, { useState } from 'react';
import { ItemsTypes } from "@/types";
import { EmblaOptionsType } from "embla-carousel";
import ImageCorusel from "@/components/image-corusel/ImageCorusel";
//styles
import './components.css'
import Box from "@/components/ui/Box";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const OPTIONS : EmblaOptionsType = {}


const ItemStage1 = ({ product } : { product : ItemsTypes }) => {
    const [ copied, setCopied ] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(product.code);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };
    
    console.log(product)
    
    return (
      <div className={ 'globalContainer' }>
          <div className={ 'item-stage1' }>
              <div className={ 'item-stage1-header' }>
                  <div className={ 'item-stage1-header-img' }>
                      { product.models_name.length !== 0 ?
                        <ImageCorusel images={ product.models_name } options={ OPTIONS }/> : (
                          <img src={ product.company.image } alt=""/>
                        ) }
                  </div>
                  <div className={ 'item-stage1-header-contents' }>
                      <div className={ 'item-stage1-header-contents-title' }>
                          <div className={ 'item-stage1-header-contents-stars' }>
                              { [ 1, 2, 3, 4, 5 ].map((star : number) => (
                                <img key={ star }
                                     src={ `/svg/star${ star <= product.raiting ? '' : '-outline' }.svg` }
                                     alt=''/>
                              )) }
                              <span>
                               { product.raiting !== 0 && product.raiting ? product.raiting : 0 } reviews
                            </span>
                          </div>
                          <div className={ 'item-stage1-header-contents-code' }>
                              { copied && <span style={ { marginLeft: '10px', color: 'green' } }>Copied!</span> }
                              Code: #{ product.code }
                              <img
                                src="/svg/copy.svg"
                                alt="Copy Code"
                                onClick={ handleCopy }
                                style={ { cursor: 'pointer' } }
                              />
                          </div>
                      </div>
                      <h1 className={ 'item-title' }>
                          { product.name }
                      </h1>
                      <p className={ 'item-description' }>
                          Description
                          <span>
                              { product.description }
                          </span>
                      </p>
                      <p className={ 'item-description' }>
                          Main features
                          <span>
                              { product.main_features }
                          </span>
                      </p>
                      <Box className={ 'item-stage1-header-contents-filters' }>
                          <div className={ 'flex items-center justify-between mb-[24px]' }>
                              <p>
                                  { product.models_name.length !== 0 ? 'in stock' : '0' }
                              </p>
                              <div className={ 'flex items-center gap-2' }>
                                  <span className={ 'text-[16px] text-[#262D29]/40 font-[500] leading-[16px]' }>
                                      Vendor: <span
                                    className={ ' text-[#262D29] underline ml-[4px]' }> { product.company.legal_name }</span>
                                  </span>
                                  <div className={ 'w-[24px] h-[24px] rounded-full overflow-hidden' }>
                                      <img className={ 'w-full h-full object-cover object-center' }
                                           src={ product.company.image ? product.company.image : '/images/avatar.jpeg' }
                                           alt=""/>
                                  </div>
                              </div>
                          </div>
                          <Separator orientation='horizontal' className={ 'mb-[24px]' }/>
                          <div className={ 'flex gap-[24px]' }>
                              <div className={ 'max-w-[292px] w-full' }>
                                  <span
                                    className={ 'text-[16px] text-[#262D29] font-[500] leading-[16px]' }>
                                      Color:
                                  </span>
                                  <div className={ 'flex items-center gap-2' }>
                                      { product.models_name[0] && product.models_name[0].colors.map((item) => (
                                        <div
                                          className={ 'flex items-center justify-center' }
                                          key={ item.id }
                                          style={ {
                                              width       : '24px',
                                              height      : '24px',
                                              borderRadius: '50%',
                                              cursor      : 'pointer',
                                              border      : '1px solid #262D29',
                                          } }><span style={ {
                                            width          : '16px',
                                            height         : '16px',
                                            display        : 'block',
                                            borderRadius   : '50%',
                                            backgroundColor: item.color.color
                                        } }></span>
                                        </div>)) }
                                  </div>
                              </div>
                              <Separator orientation='vertical' className={ 'h-auto block' }/>
                              <div className={ 'max-w-[292px] w-full' }>
                               <span
                                 className={ 'text-[16px] text-[#262D29] font-[500] leading-[16px]' }>
                                      Model:
                                  </span>
                                  <div className={ 'flex items-center gap-2' }>
                                      { product.models_name.map((item, index) => (
                                        <Button variant={'outline'}
                                          key={ index }
                                         >{ item.name }
                                        </Button>)) }
                                  </div>
                              </div>
                          </div>
                          <Separator orientation='horizontal' className={ 'mb-[24px]' }/>
                          <div>
                            
                          </div>
                      </Box>
                  </div>
              </div>
          </div>
      </div>
    );
};

export default ItemStage1;
