'use client'

import React, { useState } from 'react';


import './add-product.css';
import Stage1 from "@/app/(user)/add-product/components/Stage1";
import Stage2 from "@/app/(user)/add-product/components/Stage2";
import Stage3 from "@/app/(user)/add-product/components/Stage3";
import { Button } from "@/components/ui/button";

const AddProducts = () => {
    const [ activeStage, setActiveStage ] = useState({
        stage: 1,
    });
    
    const handleStage = () => {
        setActiveStage(prevState => ({
            stage: prevState.stage + 1
        }));
    };
    
    
    return (
      <div className={ 'add-products' }>
          <div className={ 'globalContainer' }>
              <div className={ 'add-products-steps' }>
                  <div onClick={() => setActiveStage({ stage: 1 })} className={ activeStage.stage === 1 ? 'add-products-step add-products-step-active' : 'add-products-step' }>
                      Stage 1
                  </div>
                  <div onClick={() => setActiveStage({ stage: 2 })} className={ activeStage.stage === 2 ? 'add-products-step add-products-step-active' : 'add-products-step' }>
                      Stage 2
                  </div>
                  <div onClick={() => setActiveStage({ stage: 3 })} className={ activeStage.stage === 3 ? 'add-products-step add-products-step-active' : 'add-products-step' }>
                      Stage 3
                  </div>
              </div>
              <div className={ 'add-products-stages' }>
                  { activeStage.stage === 1 && <Stage1/> }
                  { activeStage.stage === 2 && <Stage2/> }
                  { activeStage.stage === 3 && <Stage3/> }
              </div>
              <div className={'add-products-btn'}>
                  { activeStage.stage === 3 ?  (
                      <Button className={'max-w-[416px] w-full'}>Publish</Button>
                  ) : (
                    <Button className={'max-w-[416px] w-full'} onClick={handleStage}>Continued</Button>
                  )}
              </div>
          </div>
      </div>
    );
};

export default AddProducts;




