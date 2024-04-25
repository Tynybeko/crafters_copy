'use client'

import React, {useEffect, useState} from 'react';
import {ItemsTypes} from "@/types";
import {EmblaOptionsType} from "embla-carousel";
import ImageCorusel from "@/components/image-corusel/ImageCorusel";
//styles
import './components.css'
import Box from "@/components/ui/Box";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const OPTIONS: EmblaOptionsType = {}


const ItemStage1 = ({product, setActiveStage, setColorModels, setIsActiveAlert }: {setIsActiveAlert: any, product: ItemsTypes,setColorModels: any, setActiveStage: (e: number) => void }) => {
    const [copied, setCopied] = useState<boolean>(false);
    const [modelIndex, setModelIndex] = useState<number>(0);
    const [modelType, setModelType] = useState<any | null>(null);
    const [colorId, setColorId] = useState<number | null>(null);
    const [colorModel, setColorModel] = useState<any | null>(null);
    const [productQuantity, setProductQuantity] = useState(1)

    const handleCopy = () => {
        navigator.clipboard.writeText(product.code);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    useEffect(() => {
        setColorId(modelType?.colors?.[0]?.id || null);
    }, [modelType]);

    useEffect(() => {
        const model = product.models_name?.[modelIndex];
        setModelType(model || null);
    }, [modelIndex, product.models_name]);

    useEffect(() => {
        const color = modelType?.colors?.find((color: any) => color.id === colorId) || null;
        setColorModel(color);
        setColorModels(color)
    }, [colorId, modelType]);

    const incrementQuantity = () => {
        if (colorModel && colorModel.quantity > productQuantity) {
            setProductQuantity(prevState => prevState + 1)
        }
    }

    const decrementQuantity = () => {
        if (productQuantity > 1) {
            setProductQuantity(prevState => prevState - 1)
        }
    }

    return (
        <section className={'globalContainer'}>
            <div className={'item-stage1'}>
                <div className={'item-stage1-header'}>
                    <div className={'item-stage1-header-img'}>
                        {colorModel?.images?.length !== 0 ?
                            <ImageCorusel model={colorModel} options={OPTIONS}/> : (
                                <div className={'default-image'}>
                                    <img src={product.company.image} alt=""/>
                                </div>
                            )}
                    </div>
                    <div className={'item-stage1-header-contents'}>
                        <div className={'item-stage1-header-contents-title'}>
                            <div className={'item-stage1-header-contents-stars'}>
                                {[1, 2, 3, 4, 5].map((star: number) => (
                                    <img key={star}
                                         src={`/svg/star${star <= product.raiting ? '' : '-outline'}.svg`}
                                         alt=''/>
                                ))}
                                <span>
                               {product.raiting !== 0 && product.raiting ? product.raiting : 0} reviews
                            </span>
                            </div>
                            <div className={'item-stage1-header-contents-code'}>
                                {copied && <span style={{marginLeft: '10px', color: 'green'}}>Copied!</span>}
                                Code: #{product.code}
                                <img
                                    src="/svg/copy.svg"
                                    alt="Copy Code"
                                    onClick={handleCopy}
                                    style={{cursor: 'pointer'}}
                                />
                            </div>
                        </div>
                        <h1 className={'item-title'}> {product.name}  </h1>
                        <p className={'item-description'}> Description <span> {product.description} </span></p>
                        <p className={'item-description item-description-features'}> Main
                            features <span>  {product.main_features}</span></p>
                        <Link  href={'#'}
                               onClick={() => setActiveStage(2)}
                              className={'flex items-center gap-3 cursor-pointer underline item-description-all'}>
                            All features
                            <img src="/svg/Icon-down.svg" alt="Icon"/>
                        </Link>
                        <Box className={'item-stage1-header-contents-filters'}>
                            <div className={'flex items-center justify-between mb-[24px]'}>
                                <p className={'text-[16px] text-[#1DBE60] font-[400] flex items-center gap-1'}>
                                    <img src="/svg/check-circle-broken.svg" alt="Icon"/>
                                    {colorModel?.quantity !== 0 ? 'In stock' : '0'}
                                </p>
                                <div className={'flex items-center gap-2'}>
                                  <span className={'text-[16px] text-[#262D29]/40 font-[500] leading-[16px]'}>
                                      Vendor: <span
                                      className={' text-[#262D29] underline ml-[4px]'}> {product.company.legal_name}</span>
                                  </span>
                                    <div className={'w-[24px] h-[24px] rounded-full overflow-hidden'}>
                                        <img className={'w-full h-full object-cover object-center'}
                                             src={product.company.image ? product.company.image : '/images/avatar.jpeg'}
                                             alt=""/>
                                    </div>
                                </div>
                            </div>
                            <Separator orientation='horizontal' className={'mb-[24px]'}/>
                            <div className={'flex gap-[24px]  mb-[24px]'}>
                                <div className={' w-1/2'}>
                                    <div className={'mb-2'}>
                                        Color:
                                    </div>
                                    <div className={'flex items-center gap-1'}>
                                        {modelType && modelType.colors && modelType?.colors.length !== 0 && modelType?.colors.map((item: any) => (
                                            <div key={item.id} className={'flex items-center justify-center'}>
                                                <span
                                                    onClick={() => setColorId(item.id)}
                                                    className={'w-[24px] h-[24px] block p-[2px] rounded-full'}
                                                    style={{
                                                        borderWidth: '1px',
                                                        borderStyle: 'solid',
                                                        borderColor: item?.id === colorId ? '#1DBE60' : '#ffffff',
                                                        transition: 'all .2s linear'
                                                    }}>
                                                  <span style={{
                                                      borderRadius: '50%',
                                                      background: item.color.color,
                                                      display: 'block',
                                                      width: '100%',
                                                      height: '100%'
                                                  }}/>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Separator orientation='vertical' className={'h-auto block'}/>
                                <div className={'w-1/2'}>
                                  <span className={'text-[16px] block text-[#262D29] font-[500] leading-[16px] mb-2'}>
                                      Model:
                                  </span>
                                    <div className={'flex items-center gap-2'}>
                                        {product.models_name.map((item, index) => (
                                            <Button onClick={() => setModelIndex(index)}
                                                    variant={modelType?.name === item.name ? 'default' : 'outline'}
                                                    key={index}
                                            >{item.name}
                                            </Button>))}
                                    </div>
                                </div>
                            </div>
                            <Separator orientation='horizontal' className={'mb-[24px]'}/>
                            <div className={'flex items-center justify-between'}>
                                <label htmlFor="" className={'flex items-center'}>
                                    <Button onClick={decrementQuantity} variant={'outline'}
                                            className={'w-[40px] h-[40px] rounded-[50%] p-0 '}>
                                        <img src="/svg/chevron-left.svg" alt="Left"/>
                                    </Button>
                                    <input
                                        onChange={(e) => setProductQuantity(e.target.valueAsNumber)}
                                        className={'w-[40px] text-center text-[16px] text-[#262D29] font-[500] leading-[16px] focus:outline-none'}
                                        type="number" value={productQuantity}/>
                                    <Button onClick={incrementQuantity} variant={'outline'}
                                            className={'w-[40px] h-[40px] rounded-[50%] p-0'}>
                                        <img src="/svg/chevron-right.svg" alt="Right"/>
                                    </Button>
                                </label>
                                <div className={'flex items-center gap-[24px]'}>
                                    <p className={'text-[32px] font-[700] text-[#F83427] flex items-center gap-1'}>
                                        <span>{colorModel?.currency?.code} </span>
                                        {colorModel?.price}
                                        {colorModel?.discount !== null &&
                                            <span className={'font-[500] text-[16px] line-through opacity-40'}>
                                            <span>{colorModel?.currency?.code} {colorModel?.discount} </span>
                                        </span>}
                                    </p>
                                    <div className={'flex items-center gap-2'}>
                                        <Button onClick={() => setIsActiveAlert(true)} variant={'default'} className={'flex items-center gap-1 w-[142px]'}>
                                            <img src="/svg/shopping.svg" alt="Cart"/>
                                            Buy
                                        </Button>
                                        <Button onClick={() => setIsActiveAlert(true)} variant={'outline'} className={'flex items-center gap-1 w-[142px]'}>
                                            Fast buy
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </div>
                </div>
                <div className={'flex items-start justify-between gap-[10px] info'}>
                    <div className={'reviews'}>
                        <h3>Reviews</h3>
                        <Box className={'reviews-box'}>
                            <div className={'reviews-header'}>
                                <div className={'flex items-center gap-3'}>
                                    <span className={'w-[24px] h-[24px] rounded-full block'}>
                                        <img className={'w-full h-full object-cover'} src={product.company.image}
                                             alt="Image"/>
                                    </span>
                                    <p>Ivan Ivanov Ivanovich</p>
                                </div>
                                <div className={'flex items-center gap-1 flex-wrap'}>
                                    <div className={'item-stage1-header-contents-stars'}>
                                        {[1, 2, 3, 4, 5].map((star: number) => (
                                            <img key={star}
                                                 src={`/svg/star${star <= product.raiting ? '' : '-outline'}.svg`}
                                                 alt=''/>
                                        ))}
                                        <span> Quality </span>
                                    </div>
                                    <div className={'item-stage1-header-contents-stars'}>
                                        {[1, 2, 3, 4, 5].map((star: number) => (
                                            <img key={star}
                                                 src={`/svg/star${star <= product.raiting ? '' : '-outline'}.svg`}
                                                 alt=''/>
                                        ))}
                                        <span> Price </span>
                                    </div>
                                    <div className={'item-stage1-header-contents-stars'}>
                                        {[1, 2, 3, 4, 5].map((star: number) => (
                                            <img key={star}
                                                 src={`/svg/star${star <= product.raiting ? '' : '-outline'}.svg`}
                                                 alt=''/>
                                        ))}
                                        <span>Delivery</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>This Privacy Policy describes how we collect, use, and protect the information you
                                    provide when using our website policy describes how we collect, use, and protect the
                                    information you provide when using our website</p>
                                <Separator orientation={'horizontal'} className={'my-[20px]'}/>
                                <p>This Privacy Policy describes how we collect, use, and protect the information you
                                    provide when using our website policy describes how we collect, use, and protect the
                                    information you provide when using our website</p>
                                <Separator orientation={'horizontal'} className={'my-[20px]'}/>
                            </div>
                        </Box>
                    </div>
                    <div className={'information'}>
                        <h3>Additional information</h3>
                        <Box className={'reviews-box'}>
                            <div className={'flex items-start gap-3'}>
                                <div className={'min-w-[24px]'}>
                                    <img src="/svg/wallet.svg" alt="Wallet"/>
                                </div>
                                <p>
                                    Payment
                                   <span>{product.payment?.terms_of_payment}</span>
                                </p>
                            </div>
                            <Separator orientation={'horizontal'} className={'my-[24px]'} />
                            <div className={'flex items-start gap-3'}>
                                <div className={'min-w-[24px]'}>
                                    <img src="/svg/package.svg" alt="Wallet"/>
                                </div>
                                <p>
                                    Delivery
                                    <span>{product.payment?.delivery_conditions}</span>
                                </p>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ItemStage1;
