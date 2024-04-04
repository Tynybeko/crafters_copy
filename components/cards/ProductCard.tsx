'use client';

//Style
import './product.css';
import { Button } from "@/components/ui/button";
import { apiToken } from "@/axios";
import Link from "next/link";


const ProductCard = ({ data, owner } : { data :any , owner? : boolean }) => {
    
    const handleDelete = (id : number) => {
        console.log(id)
        apiToken.delete(`/my-items/${ id }`)
            .then(() => {
                console.log('deleted')
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    return (
      <div className='card'>
          <div className="card-top">
              <div className='flex items-center gap-[2px]'>
                  { [...Array(5)].map((star : number) => (
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
              <img src={ data.image } alt=""/>
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
                        <Button className='w-[80px] p-0 shadow-custom'>
                            <Link href={`/edit-product/${ data.id }`} >Edit</Link>
                        </Button>
                        <Button onClick={() => handleDelete(data.id)} variant={ 'destructiveOutline' } className='w-[80px] p-0 shadow-custom'>Delete</Button>
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
