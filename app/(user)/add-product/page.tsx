'use client'

import React, { useState } from 'react';
import './add-product.css';
import Stage1 from "@/app/(user)/add-product/components/Stage1";
import Stage2 from "@/app/(user)/add-product/components/Stage2";
import Stage3 from "@/app/(user)/add-product/components/Stage3";
import { Button } from "@/components/ui/button";

const AddProducts = () => {
    const [activeStage, setActiveStage] = useState(1);
    const [ dataProducts, setDataProducts ] = useState({
        name: '',
        description: '',
        main_features: '',
        price: '',
        discount_price: '',
        code: null,
    })
    
    const handleStage = (stage: any) => {
        setActiveStage(stage);
    };
    
    console.log(dataProducts)
    
    return (
      <div className={'add-products'}>
          <div className={'globalContainer'}>
              <div className={'add-products-steps'}>
                  <div onClick={() => handleStage(1)}
                       className={activeStage === 1 ? 'add-products-step add-products-step-active' : 'add-products-step'}>
                      Stage 1
                  </div>
                  <div onClick={() => handleStage(2)}
                       className={activeStage === 2 ? 'add-products-step add-products-step-active' : 'add-products-step'}>
                      Stage 2
                  </div>
                  <div onClick={() => handleStage(3)}
                       className={activeStage === 3 ? 'add-products-step add-products-step-active' : 'add-products-step'}>
                      Stage 3
                  </div>
              </div>
              <div className={'add-products-stages'}>
                  {activeStage === 1 && <Stage1 dataProducts={dataProducts} setDataProducts={setDataProducts} />}
                  {activeStage === 2 && <Stage2/>}
                  {activeStage === 3 && <Stage3/>}
              </div>
              <div className={'add-products-btn'}>
                  {activeStage === 3 ? (
                    <Button className={'max-w-[416px] w-full'}>Publish</Button>
                  ) : (
                    <Button className={'max-w-[416px] w-full'} onClick={() => handleStage(activeStage + 1)}>Continued</Button>
                  )}
              </div>
          </div>
      </div>
    );
};

export default AddProducts;

