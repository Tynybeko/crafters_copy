'use client'

import React, { useState } from 'react';
import './add-product.css';
import Stage1 from "@/app/(user)/add-product/components/Stage1";
import Stage2 from "@/app/(user)/add-product/components/Stage2";
import Stage3 from "@/app/(user)/add-product/components/Stage3";
import { apiToken } from "@/axios";
import { Button } from "@/components/ui/button";
import { AlertThanks } from "@/components/ui/custom-alert";
import Stages from "@/components/ui/Stages";


const stageNames = [
    'Stage 1',
    'Stage 2',
    'Stage 3'
]


const AddProducts = () => {
    const [ activeStage, setActiveStage ] = useState(1);
    const itemId = (typeof window !== 'undefined') && localStorage.getItem('itemId')
    const [ isActiveAlert, setIsActiveAlert ] = useState<boolean>(false)
    const [ dataProducts, setDataProducts ] = useState({
        name         : '',
        description  : '',
        main_features: '',
        category     : '',
        subcategory  : '',
    })
    
    const [ boxes, setBoxes ] = useState([ {
        set_color : [],
        name_model: '',
        quantity  : null,
        price     : null,
        item      : Number(itemId),
        currency  : 1
    } ])
    const [ dataPayment, setDataPayment ] = useState({
        terms_of_payment   : '',
        delivery_conditions: '',
        item               : Number(itemId)
    });
    
    const resetFormData = () => {
        setDataProducts({
            name: '',
            description: '',
            main_features: '',
            category: '',
            subcategory: '',
        });
        
        setBoxes([{
            set_color: [],
            name_model: '',
            quantity: null,
            price: null,
            item: Number(itemId),
            currency: 1
        }]);
        
        setDataPayment({
            terms_of_payment: '',
            delivery_conditions: '',
            item: Number(itemId)
        });
    };
    
    const handleItems = (e : any) => {
        e.preventDefault();
        if ( activeStage === 1 ) {
            apiToken.post('my-items/', {
                name         : dataProducts.name,
                description  : dataProducts.description,
                main_features: dataProducts.main_features,
                category     : Number(dataProducts.category),
                subcategory  : Number(dataProducts.subcategory)
            })
              .then((res) => {
                  console.log(res.data)
                  localStorage.setItem('itemId', JSON.stringify(res.data.id))
                  setActiveStage(2)
              })
              .catch((error) => {
                  console.log(error)
              })
        } else if ( activeStage === 2 ) {
            setActiveStage(3)
        } else if ( activeStage === 3 ) {
            apiToken.post('/item-payments/', dataPayment)
              .then((res) => {
                  resetFormData()
                  setIsActiveAlert(true)
                  !isActiveAlert && localStorage.removeItem('itemId')
                  window.location.href = '/personal-cabinet/my-products'
              })
              .catch((error) => {
                  console.log(error)
              })
        }
    }
    
    return (
      <>
          <AlertThanks isActiveAlert={ isActiveAlert } setIsActiveAlert={ setIsActiveAlert }/>
          <div className={ 'add-products' }>
              <div className={ 'globalContainer' }>
                  <Stages
                    stageNames={stageNames}
                    activeStage={ activeStage }
                    setActiveStage={setActiveStage}
                  />
                  <div className={ 'add-products-stages' }>
                      { activeStage === 1 && <Stage1 dataProducts={ dataProducts } setDataProducts={ setDataProducts }
                      /> }
                      { activeStage === 2 && <Stage2 setBoxes={ setBoxes } boxes={ boxes }/> }
                      { activeStage === 3 && <Stage3 dataPayment={ dataPayment } setDataPayment={ setDataPayment }/> }
                  </div>
              </div>
              
              <div className={ 'add-products-btn' }>
                  <Button className={ 'max-w-[416px] w-full' } onClick={ handleItems }>
                      { activeStage === 3 ? 'Publish' : 'Continued' }
                  </Button>
              </div>
          </div>
      </>
    );
};

export default AddProducts;



