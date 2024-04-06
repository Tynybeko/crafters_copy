import React from 'react';
import { ItemsTypes } from "@/types";
import { EmblaOptionsType } from "embla-carousel";
import ImageCorusel from "@/components/image-corusel/ImageCorusel";
//styles
import './components.css'

const OPTIONS: EmblaOptionsType = {}


const ItemStage1 = ({product} : {product : ItemsTypes}) => {
    return (
      <div className={'globalContainer'}>
          <div className={'item-stage1'}>
              <div className={'item-stage1-header'}>
                  <div className={'item-stage1-header-img'}>
                    <ImageCorusel images={product.models}  options={OPTIONS}/>
                  </div>
                  <div className={'item-stage1-header-contents'}>
                    <div className={'item-stage1-header-contents-title'}>
                        <div className={'item-stage1-header-contents-stars'}>
                            { [ 1, 2, 3, 4, 5 ].map((star : number) => (
                              <img key={ star }
                                   src={ `/svg/star${ star <= 3 ? '' : '-outline' }.svg` }
                                   alt=''/>
                            )) }
                            <span>
                               5 reviews
                            </span>
                        </div>
                        <div className={'item-stage1-header-contents-code'}>
                            Cod: 532453
                        </div>
                    </div>
                      <h1 className={'item-title'}>
                          { product.name }
                      </h1>
                      <p className={'item-description'}>
                          Description
                          <span>
                              { product.description }
                          </span>
                      </p>
                      <p className={'item-description'}>
                          Main features
                          <span>
                              { product.main_features }
                          </span>
                      </p>
                  </div>
              </div>
          </div>
      </div>
    );
};

export default ItemStage1;
