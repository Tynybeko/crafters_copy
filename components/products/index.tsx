import React from 'react';
import { ProductData } from "@/fakeObj";
import ProductCard from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/button";

const Products = () => {
    return (
      <>
          <section className='popular'>
              <div className='globalContainer'>
                  <div className='popular-title'>
                      <h2>Soft toy</h2>
                      <div className='popular-title-btns'>
                          <button> New</button>
                          <button> Popular</button>
                      </div>
                  </div>
                  <div className='cards'>
                      { ProductData.map((item, index) => (
                        <ProductCard key={ index } data={ item }/>
                      )) }
                  </div>
              </div>
          </section>
          <section className='popular'>
              <div className='globalContainer'>
                  <div className='popular-title'>
                      <h2>Soft toy</h2>
                      <div className='popular-title-btns'>
                          <button> New</button>
                          <button> Popular</button>
                      </div>
                  </div>
                  <div className='cards'>
                      { ProductData.map((item, index) => (
                        <ProductCard key={ index } data={ item }/>
                      )) }
                  </div>
              </div>
          </section>
          <section className='popular'>
              <div className='globalContainer'>
                  <div className='popular-title'>
                      <h2>Soft toy</h2>
                      <div className='popular-title-btns'>
                          <button> New</button>
                          <button> Popular</button>
                      </div>
                  </div>
                  <div className='cards'>
                      { ProductData.map((item, index) => (
                        <ProductCard key={ index } data={ item }/>
                      )) }
                  </div>
              </div>
          </section>
          <div className='text-center mt-[43px] mb-[120px]'>
              <Button className='w-[127px] mx-auto'>View all</Button>
          </div>
      </>
    );
};

export default Products;
