import React from 'react';


//Style
import './product.css';
import { Button } from "@/components/ui/button";

interface IPropsProductCard
    {
        id : number
        name : string
        img : string
        price : number
        oldPrice : number
        isNew : boolean
        raiting : number
        popular? : boolean
    }

const ProductCard = ({ data, owner } : { data : IPropsProductCard, owner? : boolean }) => {
    return (
      <div className='card'>
          <div className="card-top">
              <div className='flex items-center gap-[2px]'>
                  { [ 1, 2, 3, 4, 5 ].map((star : number) => (
                    <img key={ star }
                         src={ `/svg/star${ star <= data.raiting ? '' : '-outline' }.svg` }
                         alt=''/>
                  )) }
              </div>
              <div className='card-top-btn shadow-custom'>
                  <img className='object-cover' src="/svg/heart-cart-blue.svg" alt=""/>
              </div>
          </div>
          <div className='card-img'>
              <img src={ data.img } alt=""/>
              <div className={ 'status-product' }>
                  { data.isNew && <div className='card-img-new'>New</div> }
                  { data.popular && <div className='card-img-popular'>Popular</div> }
              </div>
          </div>
          <div className="card-bottom">
              <h3>{ data.name }</h3>
              <div className='card-bottom-items'>
                  <p>${ data.price }<span>{ data.oldPrice }</span></p>
                  { owner ? (
                    <div className={'flex items-center gap-[4px]'}>
                        <Button className='w-[80px] p-0 shadow-custom'>Edit</Button>
                        <Button variant={ 'destructiveOutline' } className='w-[80px] p-0 shadow-custom'>Delete</Button>
                    </div>
                  ) : (
                    <div className='flex items-center gap-[4px]'>
                        <Button className='w-[129px] p-0 shadow-custom'>Fast buy</Button>
                        <div className='card-top-btn'>
                            <img className='object-cover' src="/svg/shopping-green.svg" alt=""/>
                        </div>
                    </div>
                  ) }
              </div>
          </div>
      </div>
    );
};

export default ProductCard;
