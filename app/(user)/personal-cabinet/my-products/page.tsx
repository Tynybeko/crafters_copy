"use client"

//styles
import './my-products.css'
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/cards/ProductCard";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchMyItems } from "@/redux/slices/my-items";

const MyProducts = () => {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const {data: myProducts} = useAppSelector(state => state.myItems)
    
    useEffect(() => {
        dispatch(fetchMyItems())
    }, [dispatch])
    
    
    
    return (
      <div className={ 'my-products' }>
          <div className={ 'my-products-title' }>
              <h1>My products</h1>
              <Button onClick={() => router.push('/add-product')}>Add</Button>
          </div>
          <div className={ 'my-products-cards' }>
              { myProducts && myProducts.map((item) => <ProductCard owner key={ item.id } data={ item }/>) }
          </div>
      </div>
    )
}

export default MyProducts
