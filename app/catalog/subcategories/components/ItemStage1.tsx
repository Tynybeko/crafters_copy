'use client'

import React, { useEffect, useState } from 'react';
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
    const [ modelIndex, setModelIndex ] = useState<number>( 0 )
    const [ modelType, setModelType ] = useState<any>({});
    const handleCopy = () => {
        navigator.clipboard.writeText(product.code);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };
    
    useEffect(() => {
        const model = product.models_name.find((item, index) => index === modelIndex)
        setModelType(model)
    }, [modelIndex])

    
    return (
      <div className={ 'globalContainer' }>
          <div className={ 'item-stage1' }>
              <div className={ 'item-stage1-header' }>
                  <div className={ 'item-stage1-header-img' }>
                      { product.models_name.length !== 0 ?
                        <ImageCorusel model={ modelType } options={ OPTIONS }/> : (
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
                                      Vendor: <span className={ ' text-[#262D29] underline ml-[4px]' }> { product.company.legal_name }</span>
                                  </span>
                                  <div className={ 'w-[24px] h-[24px] rounded-full overflow-hidden' }>
                                      <img className={ 'w-full h-full object-cover object-center' }
                                           src={ product.company.image ? product.company.image : '/images/avatar.jpeg' }
                                           alt=""/>
                                  </div>
                              </div>
                          </div>
                          <Separator orientation='horizontal' className={ 'mb-[24px]' }/>
                          <div className={ 'flex gap-[24px]  mb-[24px]' }>
                              <div className={' w-1/2'}>
                                  <div className={'mb-2'}>
                                      Color:
                                  </div>
                                  <div className={'flex items-center gap-1'}>
                                      { modelType && modelType.colors && modelType?.colors.length !== 0 && modelType?.colors.map((item: any) => (
                                        <div className={'flex items-center justify-center'}>
                                        <span
                                          className={'w-[24px] h-[24px] block p-[2px] rounded-full'}
                                          style={{ border: '1px solid green' }}>
                                          <span style={{borderRadius: '50%', background: item.color.color, display: 'block', width: '100%', height: '100%'}}></span>
                                        </span>
                                        </div>
                                      )) }
                                  </div>
                              </div>
                              <Separator orientation='vertical' className={ 'h-auto block' }/>
                              <div className={ 'w-1/2' }>
                                  <span className={ 'text-[16px] block text-[#262D29] font-[500] leading-[16px] mb-2' }>
                                      Model:
                                  </span>
                                  <div className={ 'flex items-center gap-2' }>
                                      { product.models_name.map((item, index) => (
                                        <Button onClick={() => setModelIndex(index)} variant={ 'outline' }
                                                key={ index }
                                        >{ item.name }
                                        </Button>)) }
                                  </div>
                              </div>
                          </div>
                          <Separator orientation='horizontal' className={ 'mb-[24px]' }/>
                          <div>
                              <label htmlFor="" className={ 'flex items-center' }>
                                  <Button variant={ 'outline' } className={ 'w-[40px] h-[40px] rounded-[50%] p-0 ' }>
                                      <img src="/svg/chevron-left.svg" alt="Left"/>
                                  </Button>
                                  <input
                                    className={ 'w-[40px] text-center text-[16px] text-[#262D29] font-[500] leading-[16px] focus:outline-none' }
                                    type="number" value={ 1 }/>
                                  <Button variant={ 'outline' } className={ 'w-[40px] h-[40px] rounded-[50%] p-0' }>
                                      <img src="/svg/chevron-right.svg" alt="Right"/>
                                  </Button>
                              </label>
                          </div>
                      </Box>
                  </div>
              </div>
          </div>
      </div>
    );
};

export default ItemStage1;
