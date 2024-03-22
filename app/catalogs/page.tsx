import React from 'react';



//style
import './catalog.css'
import Link from "next/link";

const Catalogs = () => {
    return (
      <main className='mt-[20px] md:mt-[40px]'>
          <header>
              <div className='globalContainer'>
                  <div className='catalog-banner'>
                      <div className='catalog-banner-content'>
                          <h1>
                              Over 1,000 offers already
                          </h1>
                      </div>
                      <div className='catalog-banner-img'>
                          <img src="/images/catalog1.jpeg" alt="Image"/>
                      </div>
                  </div>
                  <Link href={ '/catalogs/soft-toy' }>Soft Toy</Link>
              </div>
          </header>
      </main>
    );
};

export default Catalogs;
