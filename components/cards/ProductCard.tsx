'use client';

//Style
import './product.css';
import { Button } from "@/components/ui/button";
import { api, apiToken } from "@/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AddFavorite } from "@/components/ui/add-favorite";
import { Dialog } from "@/components/ui/dialog";
import { AddToOrder } from "@/components/add-to-order";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ItemsTypes } from "@/types";
import { setToastiState } from '@/redux/slices/toastiSlice';
import AddCart from '../ui/add-cart';


const ProductCard = ({ data, owner }: { data: any, owner?: boolean }) => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const [product, setProduct] = useState<ItemsTypes | null>(null);
    const [colorModels, setColorModels] = useState<any>(null);
    const [isActiveAlert, setIsActiveAlert] = useState(false);
    const profile = useAppSelector(state => state.user.data);
    const [dataOrder, setDataOrder] = useState<any>({
        name: profile?.first_name || '',
        phone: profile?.phone || '',
        comment: '',
        items: [
            {
                quantity: 1,
                item: product?.id,
                item_model: product?.models_name[0]?.colors[0]?.id,
                company: product?.company?.id
            }
        ]
    });



    useEffect(() => {
        if (product && colorModels && profile) {
            setDataOrder((prevState: any) => ({
                ...prevState,
                name: profile.first_name || '',
                phone: profile.phone || '',
                items: [{
                    ...prevState?.items[0],
                    item: product?.id || null,
                    item_model: colorModels?.id || null,
                    company: product?.company?.id || null
                }]
            }));
        }
    }, [product, colorModels, profile]);

    useEffect(() => {
        if (!isActiveAlert) return
        api.get(`/items/${data?.id}`)
            .then((res) => {
                setProduct(res.data);
                setDataOrder((prev: any) => ({
                    ...prev,
                    items: [
                        {
                            item: res.data?.id,
                            item_model: res.data?.models_name[0]?.colors[0]?.id,
                            company: res.data?.company?.id
                        }
                    ]
                }))
            })
            .catch((err) => {
                console.log(err);
            });
    }, [isActiveAlert]);

    const handleDelete = (id: number) => {
        apiToken.delete(`/my-items/${id}`)
            .then(() => {
                dispatch(setToastiState([{ type: 'succes', data: 'Заказ принят!' }]))

                console.log('deleted')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDataOrder((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let dataForm = new FormData(e.target as HTMLFormElement)
        for (let [key, item] of dataForm.entries()) {
            if (key != 'comment' && !item) return dispatch(setToastiState([{ type: 'error', data: 'Заполните поля!' }]))
        }
        apiToken.post('/send-order/', dataOrder)
            .then(res => {
                setIsActiveAlert(false)
                dispatch(setToastiState([{ type: 'succes', data: 'Заказ принят!' }]))
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    const errorRes = []
                    for (let key in error.response.data) {
                        if (key != 'items') errorRes.push({ type: 'error', data: error.response.data[key] })
                    }
                    dispatch(setToastiState(errorRes))
                }
            });
    };

    return (
        <>
            <AddToOrder open={isActiveAlert} onOpenChange={setIsActiveAlert} onSubmit={handleOrder}
                onChange={handleChange} dataOrder={dataOrder}
                onChange1={(e) => setDataOrder({ ...dataOrder, comment: e.target.value })}
                colorModels={product?.models_name[0]?.colors[0]} product={product} />
            <div className='card'>
                <div className="card-top">
                    <div className='flex items-center gap-[2px]'>
                        {[...Array(5)].map((star: number, index: number) => (
                            <img key={index}
                                src={`/svg/star${star <= data.raiting ? '' : '-outline'}.svg`}
                                alt='' />
                        ))}
                    </div>
                    <AddFavorite data={data} />
                </div>
                <div onClick={() => router.push(`/catalog/subcategories/${data.code}`)} className='card-img'>
                    <img src={data.image} alt="Image" />
                    <div className={'status-product'}>
                        {data.is_new && <div className='card-img-new'>New</div>}
                        {data.is_popular && <div className='card-img-popular'>Popular</div>}
                    </div>
                </div>
                <div className="card-bottom">
                    <h3 onClick={() => router.push(`/catalog/subcategories/${data.code}`)}>{data.name}</h3>
                    <div className='card-bottom-items'>
                        <p>${data.price}<span>{data.oldPrice}</span></p>
                        {owner ? (
                            <div className={'flex items-center gap-[4px]'}>
                                <Button className='w-[80px] p-0 shadow-custom'>
                                    <Link href={`/edit-product/${data.id}`}>Edit</Link>
                                </Button>
                                <Button onClick={() => handleDelete(data.id)} variant={'destructiveOutline'}
                                    className='w-[80px] p-0 shadow-custom'>Delete</Button>
                            </div>
                        ) : (
                            <div className='flex items-center gap-[4px]'>
                                <Button onClick={() => {
                                    setIsActiveAlert(true)
                                }} className='w-[129px] p-0 shadow-custom'>Fast buy</Button>
                                <AddCart item={data} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
