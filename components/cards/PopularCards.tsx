import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { AddFavorite } from "@/components/ui/add-favorite";


//STYLES
import './popular.css'
import { AddToOrder } from '../add-to-order';
import { api, apiToken } from '@/axios';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ItemsTypes } from '@/types';
import AddCart from '../ui/add-cart';

interface IPropsPopularCard {
    id: number
    name: string
    image: string
    price: number
    oldPrice: number
    isNew: boolean
    raiting: number
}

const PopularCards = ({ data }: {
    data: ItemsTypes
}): React.ReactElement => {
    const dispatch = useAppDispatch();
    const [product, setProduct] = useState<ItemsTypes | null>(null);
    const [colorModels, setColorModels] = useState<any>(null);
    const [isActiveAlert, setIsActiveAlert] = useState(false);
    const profile = useAppSelector(state => state.user.data);
    const [sentOrder, setSentOrder] = useState(false);
    const [dataOrder, setDataOrder] = useState<any>({
        name: profile?.first_name || '',
        phone: profile?.phone || '',
        comment: '',
        items: [
            {
                quantity: 1,
                item: null,
                item_model: null,
                company: null
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
            })
            .catch((err) => {
                console.log(err);
            });
    }, [isActiveAlert]);

    const handleDelete = (id: number) => {
        apiToken.delete(`/my-items/${id}`)
            .then(() => {
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
        apiToken.post('/send-order/', dataOrder)
            .then(res => {
                setSentOrder(true);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <AddToOrder open={isActiveAlert} onOpenChange={setIsActiveAlert} onSubmit={handleOrder}
                onChange={handleChange} dataOrder={dataOrder}
                onChange1={(e) => setDataOrder({ ...dataOrder, comment: e.target.value })}
                colorModels={product?.models_name[0]?.colors[0]} product={product} />
            <div
                style={{
                    backgroundImage: `url(${data.image})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
                className='popular-card'>
                <div className='popular-card-item'>
                    <div className='cart-top'>
                        <div className='flex items-center'>
                            {[1, 2, 3, 4, 5].map((star: number) => (
                                <img key={star}
                                    src={`/svg/star${star <= data.raiting ? '' : '-outline'}.svg`}
                                    alt='' />
                            ))}
                        </div>
                        {/* {console.log(data, "data")} */}
                        <AddFavorite data={data} />
                    </div>
                    <div className='popular-card-bottom'>
                        <h3>{data.name}</h3>
                        <div className='popular-card-bottom-items'>
                            <p>${data.price}<span>{data.oldPrice}</span></p>
                            <div className='popular-card-bottom-btns'>
                                <Button onClick={() => setIsActiveAlert(prev => !prev)} className='w-[137px] shadow-custom'>Fast buy</Button>
                                <AddCart item={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default PopularCards;
