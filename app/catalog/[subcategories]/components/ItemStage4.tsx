import ProductCard from '@/components/cards/ProductCard';
import { useAppSelector } from '@/redux/hooks';
import { fetchItems } from '@/redux/slices/items';
import { ItemsTypes } from '@/types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const ItemStage4 = ({ colorModels, product }: { colorModels: any, product: ItemsTypes }) => {
  const { data: items } = useAppSelector(state => state.items);
  const dispatch = useDispatch()
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    dispatch(fetchItems({}) as any)
  }, [])

  useEffect(() => {
    if (items && items.length > 0) {
      const sortedItems = items.slice().sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);
      setPopularItems(sortedItems.slice(0, 3));
    }
  }, [items]);

  console.log(product, "git");

  return (
    <section className={'main-features'}>
      <div className={'globalContainer'}>
        <div className=''>
          <div className='mb-[80px]'>
            <h2 className='text-[#262D29] font-[500] text-[24px] leading-[26px] mb-[24px]'>Photo about the soft toy of large size brown color</h2>
            {
              product.models_name.map((item) => {
                return item.colors.map(item2 => {
                  return item2.images.map(item3 => (
                    <img src={item3.image} className=" rounded-[32px] w-[100%] h-[760px] object-cover mb-[24px]" />
                  ))
                })
              })
            }
          </div>
          <div>
            <h2 className='text-[#262D29] text-[24px] leading-[26px] font-[500] mb-[24px]'>Related Products</h2>
            <div className='flex gap-[24px]'>
              {
                popularItems.map((item: any) => (
                  <ProductCard key={item.id} data={item} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemStage4;
