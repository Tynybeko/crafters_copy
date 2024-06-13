import ProductCard from '@/components/cards/ProductCard';
import { useAppSelector } from '@/redux/hooks';
import { fetchItems } from '@/redux/slices/items';
import { Separator } from "@/components/ui/separator";
import Box from "@/components/ui/Box";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ItemsTypes } from '@/types';
import { apiToken } from '@/axios';
import { FetchReviews } from '@/redux/slices/review';

const ItemStage3 = ({ colorModels, product }: { colorModels: any, product: ItemsTypes }) => {
  // const { data: items } = useAppSelector(state => state.items);
  const { data: reviews } = useAppSelector(state => state.review);
  // const dispatch = useDispatch()
  // const [popularItems, setPopularItems] = useState([]);

  // useEffect(() => {
  //   dispatch(fetchItems({}) as any)
  //   dispatch(FetchReviews() as any)
  // }, [])

  console.log(reviews, "revs");

  // useEffect(() => {
  //   if (items && items.length > 0) {
  //     const sortedItems = items.slice().sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);
  //     setPopularItems(sortedItems.slice(0, 3));
  //   }
  // }, [items]);

  return (
    <section className={'main-features'} id="#fuck">
      <div className={'globalContainer'}>
        <div className=''>
          <div className='mb-[80px]'>
            <h2 className='text-[#262D29] font-[500] text-[24px] leading-[26px] mb-[24px]'>Reviews about the soft toy of large size brown color</h2>
            {
              (!!reviews && reviews?.find((val: any) => val.item?.id != product.id))
              &&
              <h2>You don't have any reviews yet</h2>
            }
            {
              reviews && reviews?.map((item: any) => {
                if (item.item.id == product.id) {
                  return (
                    <Box className={'reviews-box mb-[24px]'}>
                      <div className={'reviews-header'}>
                        <div className={'flex items-center gap-3'}>
                          <span className={'w-[24px] h-[24px] rounded-full block'}>
                            <img className={'w-full h-full object-cover'} src={item.company.image}
                              alt="Image" />
                          </span>
                          <p className='text-[#262D29] font-[400] text-[16px] leading-[18px]'>Ivan Ivanov Ivanovich</p>
                        </div>
                        <div className={'flex items-center gap-1 flex-wrap'}>
                          <div className={'item-stage1-header-contents-stars'}>
                            {[1, 2, 3, 4, 5].map((star: number) => (
                              <img key={star}
                                src={`/svg/star${star <= item.quality ? '' : '-outline'}.svg`}
                                alt='' />
                            ))}
                            <span> Quality </span>
                          </div>
                          <div className={'item-stage1-header-contents-stars'}>
                            {[1, 2, 3, 4, 5].map((star: number) => (
                              <img key={star}
                                src={`/svg/star${star <= item.price_relevance ? '' : '-outline'}.svg`}
                                alt='' />
                            ))}
                            <span> Price </span>
                          </div>
                          <div className={'item-stage1-header-contents-stars'}>
                            {[1, 2, 3, 4, 5].map((star: number) => (
                              <img key={star}
                                src={`/svg/star${star <= item.delivery ? '' : '-outline'}.svg`}
                                alt='' />
                            ))}
                            <span>Delivery</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className='text-[#262D29CC] font-[400] text-[16px] leading-[22px]'>{item.comment}</p>
                        <Separator orientation={'horizontal'} className={'my-[20px]'} />
                        <div>
                          <p className='text-[#262D2966] font-[400] text-[16px] leading-[22px] mb-[8px]'>Advantages</p>
                          <p className='text-[#262D29CC] font-[400] text-[16px] leading-[22px] mb-[20px]'>{item.advantages}</p>
                        </div>
                        <div>
                          <p className='text-[#262D2966] font-[400] text-[16px] leading-[22px] mb-[8px]'>Advantages</p>
                          <p className='text-[#262D29CC] font-[400] text-[16px] leading-[22px]'>{item.disadvantages}</p>
                        </div>
                      </div>
                    </Box>
                  )
                }
              })
            }
            {/* <Box className={'reviews-box mb-[24px]'}>
              <div className={'reviews-header'}>
                <div className={'flex items-center gap-3'}>
                  <span className={'w-[24px] h-[24px] rounded-full block'}>
                    <img className={'w-full h-full object-cover'} src={product.company.image}
                      alt="Image" />
                  </span>
                  <p className='text-[#262D29] font-[400] text-[16px] leading-[18px]'>Ivan Ivanov Ivanovich</p>
                </div>
                <div className={'flex items-center gap-1 flex-wrap'}>
                  <div className={'item-stage1-header-contents-stars'}>
                    {[1, 2, 3, 4, 5].map((star: number) => (
                      <img key={star}
                        src={`/svg/star${star <= product.raiting ? '' : '-outline'}.svg`}
                        alt='' />
                    ))}
                    <span> Quality </span>
                  </div>
                  <div className={'item-stage1-header-contents-stars'}>
                    {[1, 2, 3, 4, 5].map((star: number) => (
                      <img key={star}
                        src={`/svg/star${star <= product.raiting ? '' : '-outline'}.svg`}
                        alt='' />
                    ))}
                    <span> Price </span>
                  </div>
                  <div className={'item-stage1-header-contents-stars'}>
                    {[1, 2, 3, 4, 5].map((star: number) => (
                      <img key={star}
                        src={`/svg/star${star <= product.raiting ? '' : '-outline'}.svg`}
                        alt='' />
                    ))}
                    <span>Delivery</span>
                  </div>
                </div>
              </div>
              <div>
                <p className='text-[#262D29CC] font-[400] text-[16px] leading-[22px]'>This Privacy Policy describes how we collect, use, and protect the information you
                  provide when using our website policy describes how we collect, use, and protect the
                  information you provide when using our website</p>
                <Separator orientation={'horizontal'} className={'my-[20px]'} />
                <div>
                  <p className='text-[#262D2966] font-[400] text-[16px] leading-[22px] mb-[8px]'>Advantages</p>
                  <p className='text-[#262D29CC] font-[400] text-[16px] leading-[22px] mb-[20px]'>This Privacy Policy describes how we collect, use, and protect the information you
                    provide when using our website policy describes how we collect, use, and protect the
                    information you provide when using our website</p>
                </div>
                <div>
                  <p className='text-[#262D2966] font-[400] text-[16px] leading-[22px] mb-[8px]'>Advantages</p>
                  <p className='text-[#262D29CC] font-[400] text-[16px] leading-[22px]'>This Privacy Policy describes how we collect, use, and protect the information you
                    provide when using our website policy describes how we collect, use, and protect the
                    information you provide when using our website</p>
                </div>
              </div>
            </Box>
            <Box className={'reviews-box mb-[24px]'}>
              <div className={'reviews-header'}>
                <div className={'flex items-center gap-3'}>
                  <span className={'w-[24px] h-[24px] rounded-full block'}>
                    <img className={'w-full h-full object-cover'} src={product.company.image}
                      alt="Image" />
                  </span>
                  <p className='text-[#262D29] font-[400] text-[16px] leading-[18px]'>Ivan Ivanov Ivanovich</p>
                </div>
                <div className={'flex items-center gap-1 flex-wrap'}>
                  <div className={'item-stage1-header-contents-stars'}>
                    {[1, 2, 3, 4, 5].map((star: number) => (
                      <img key={star}
                        src={`/svg/star${star <= product.raiting ? '' : '-outline'}.svg`}
                        alt='' />
                    ))}
                    <span> Quality </span>
                  </div>
                  <div className={'item-stage1-header-contents-stars'}>
                    {[1, 2, 3, 4, 5].map((star: number) => (
                      <img key={star}
                        src={`/svg/star${star <= product.raiting ? '' : '-outline'}.svg`}
                        alt='' />
                    ))}
                    <span> Price </span>
                  </div>
                  <div className={'item-stage1-header-contents-stars'}>
                    {[1, 2, 3, 4, 5].map((star: number) => (
                      <img key={star}
                        src={`/svg/star${star <= product.raiting ? '' : '-outline'}.svg`}
                        alt='' />
                    ))}
                    <span>Delivery</span>
                  </div>
                </div>
              </div>
              <div>
                <p className='text-[#262D29CC] font-[400] text-[16px] leading-[22px]'>This Privacy Policy describes how we collect, use, and protect the information you
                  provide when using our website policy describes how we collect, use, and protect the
                  information you provide when using our website</p>
                <Separator orientation={'horizontal'} className={'my-[20px]'} />
                <div>
                  <p className='text-[#262D2966] font-[400] text-[16px] leading-[22px] mb-[8px]'>Advantages</p>
                  <p className='text-[#262D29CC] font-[400] text-[16px] leading-[22px] mb-[20px]'>This Privacy Policy describes how we collect, use, and protect the information you
                    provide when using our website policy describes how we collect, use, and protect the
                    information you provide when using our website</p>
                </div>
                <div>
                  <p className='text-[#262D2966] font-[400] text-[16px] leading-[22px] mb-[8px]'>Advantages</p>
                  <p className='text-[#262D29CC] font-[400] text-[16px] leading-[22px]'>This Privacy Policy describes how we collect, use, and protect the information you
                    provide when using our website policy describes how we collect, use, and protect the
                    information you provide when using our website</p>
                </div>
              </div>
            </Box>
            <Box className={'reviews-box mb-[24px]'}>
              <div className={'reviews-header'}>
                <div className={'flex items-center gap-3'}>
                  <span className={'w-[24px] h-[24px] rounded-full block'}>
                    <img className={'w-full h-full object-cover'} src={product.company.image}
                      alt="Image" />
                  </span>
                  <p className='text-[#262D29] font-[400] text-[16px] leading-[18px]'>Ivan Ivanov Ivanovich</p>
                </div>
                <div className={'flex items-center gap-1 flex-wrap'}>
                  <div className={'item-stage1-header-contents-stars'}>
                    {[1, 2, 3, 4, 5].map((star: number) => (
                      <img key={star}
                        src={`/svg/star${star <= product.raiting ? '' : '-outline'}.svg`}
                        alt='' />
                    ))}
                    <span> Quality </span>
                  </div>
                  <div className={'item-stage1-header-contents-stars'}>
                    {[1, 2, 3, 4, 5].map((star: number) => (
                      <img key={star}
                        src={`/svg/star${star <= product.raiting ? '' : '-outline'}.svg`}
                        alt='' />
                    ))}
                    <span> Price </span>
                  </div>
                  <div className={'item-stage1-header-contents-stars'}>
                    {[1, 2, 3, 4, 5].map((star: number) => (
                      <img key={star}
                        src={`/svg/star${star <= product.raiting ? '' : '-outline'}.svg`}
                        alt='' />
                    ))}
                    <span>Delivery</span>
                  </div>
                </div>
              </div>
              <div>
                <p className='text-[#262D29CC] font-[400] text-[16px] leading-[22px]'>This Privacy Policy describes how we collect, use, and protect the information you
                  provide when using our website policy describes how we collect, use, and protect the
                  information you provide when using our website</p>
                <Separator orientation={'horizontal'} className={'my-[20px]'} />
                <div>
                  <p className='text-[#262D2966] font-[400] text-[16px] leading-[22px] mb-[8px]'>Advantages</p>
                  <p className='text-[#262D29CC] font-[400] text-[16px] leading-[22px] mb-[20px]'>This Privacy Policy describes how we collect, use, and protect the information you
                    provide when using our website policy describes how we collect, use, and protect the
                    information you provide when using our website</p>
                </div>
                <div>
                  <p className='text-[#262D2966] font-[400] text-[16px] leading-[22px] mb-[8px]'>Advantages</p>
                  <p className='text-[#262D29CC] font-[400] text-[16px] leading-[22px]'>This Privacy Policy describes how we collect, use, and protect the information you
                    provide when using our website policy describes how we collect, use, and protect the
                    information you provide when using our website</p>
                </div>
              </div>
            </Box> */}
          </div>
          {/* <div>
            <h2 className='text-[#262D29] text-[24px] leading-[26px] font-[500] mb-[24px]'>Related Products</h2>
            <div className='flex gap-[24px]'>
              {
                popularItems.map((item: any) => (
                  <ProductCard key={item.id} data={item} />
                ))
              }
            </div>
          </div> */}
          <PopularProducts />
        </div>
      </div>
    </section>
  );
};

export default ItemStage3;


function PopularProducts() {
  const [popularItems, setPopularItems] = useState([]);
  const { data: items } = useAppSelector(state => state.items);

  useEffect(() => {
    if (items && items.length > 0) {
      const sortedItems = items.slice().sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);
      setPopularItems(sortedItems.slice(0, 3));
    }
  }, [items]);

  return (
    <div className='mt-[80px]'>
      <h2 className='text-[#262D29] text-[24px] leading-[26px] font-[500] mb-[24px]'>Related Products</h2>
      <div className='flex gap-[24px]'>
        {
          popularItems.map((item: any) => (
            <ProductCard key={item.id} data={item} />
          ))
        }
      </div>
    </div>
  )
}