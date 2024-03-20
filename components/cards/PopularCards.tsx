"use client";


import React, { useState } from 'react';

interface IPropsPopularCard
    {
        id : number
        name : string
        img : string
        price : number
        oldPrice : number
        isNew : boolean
        raiting : number
    }

//STYLES
import './popular.css'
import { Button } from "@/components/ui/button";

const PopularCards = ({ data } : {
    data : IPropsPopularCard
}) : React.ReactElement => {
    
    const [ isCart, setIsCart ] = useState(false)
    
    return (
      <div
        style={ {
            backgroundImage: `url(${ data.img })`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        } }
        className='popular-card'>
          <div className='popular-card-item'>
              <div className='cart-top'>
                  <div className='flex items-center'>
                      { [ 1, 2, 3, 4, 5 ].map((star : number) => (
                        <img key={ star }
                             src={ `/svg/star${ star <= data.raiting ? '' : '-outline' }.svg` }
                             alt=''/>
                      )) }
                  </div>
                  <div
                    onClick={ () => setIsCart(!isCart) }
                    style={ {
                        background: isCart ? '#1DBE60' : 'white',
                        boxShadow : isCart ? '0 0 16px 0 #00000029' : 'none'
                    } }
                    className='btn-heart'>
                      <img src={ `/svg/heart-cart${ isCart ? '-white' : '-blue' }.svg` } alt=""/>
                  </div>
              </div>
              <div className='popular-card-bottom'>
                  <h3>{ data.name }</h3>
                  <div className='popular-card-bottom-items'>
                      <p>${ data.price }<span>{ data.oldPrice }</span></p>
                      <div className='popular-card-bottom-btns'>
                          <Button className='w-[137px] shadow-custom'>Fast buy</Button>
                          <div className='btn-heart'>
                              <img src={ `/svg/shopping-green.svg` } alt=""/>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
};

export default PopularCards;
