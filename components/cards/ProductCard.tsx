'use client';

//Style
import './product.css';
import { Button } from "@/components/ui/button";
import { apiToken } from "@/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";


const ProductCard = ({ data, owner } : { data :any , owner? : boolean }) => {
    const router = useRouter()
    
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
                  { [...Array(5)].map((star : number, index : number) => (
                    <img key={ index }
                         src={ `/svg/star${ star <= data.raiting ? '' : '-outline' }.svg` }
                         alt=''/>
                  )) }
              </div>
              <div className='card-top-btn shadow-custom'>
                  <img className='object-cover' src="/svg/heart-cart-blue.svg" alt=""/>
              </div>
          </div>
          <div onClick={() => router.push(`/catalog/subcategories/${ data.code }`)}  className='card-img'>
              <img src={ data.image } alt="Image"/>
              <div className={ 'status-product' }>
                  { data.is_new && <div className='card-img-new'>New</div> }
                  { data.is_popular && <div className='card-img-popular'>Popular</div> }
              </div>
          </div>
          <div className="card-bottom">
              <h3 onClick={() => router.push(`/catalog/subcategories/${ data.code }`)} >{ data.name }</h3>
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
