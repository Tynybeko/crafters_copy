"use client"

//styles
import './my-products.css'
import { Button } from "@/components/ui/button";
import { ProductData } from "@/fakeObj";
import ProductCard from "@/components/cards/ProductCard";
import { useRouter } from "next/navigation";

const MyProducts = () => {
    const router = useRouter();
    return (
      <div className={ 'my-products' }>
          <div className={ 'my-products-title' }>
              <h1>My products</h1>
              <Button onClick={() => router.push('/add-product')}>Add</Button>
          </div>
          <div className={ 'my-products-cards' }>
              { ProductData && ProductData.map((item, index) => <ProductCard owner key={ index } data={ item }/>) }
          </div>
      </div>
    )
}

export default MyProducts
