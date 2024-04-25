'use client';
import React, {useEffect, useState} from 'react';
import {api, apiToken} from "@/axios";
import Loading from "@/components/loading";
import Stages from "@/components/ui/Stages";
import ItemStage1 from "@/app/catalog/[subcategories]/components/ItemStage1";
import ItemStage2 from "@/app/catalog/[subcategories]/components/ItemStage2";
import ItemStage3 from "@/app/catalog/[subcategories]/components/ItemStage3";
import ItemStage4 from "@/app/catalog/[subcategories]/components/ItemStage4";
import {ItemsTypes} from "@/types";
import {CardItem} from "@/app/catalog/[subcategories]/components/CardItem";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { X} from "lucide-react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {AddToOrder} from "@/components/add-to-order";


const stageNames = [
    'All about the product',
    'Main features',
    'Reviews',
    'Photo',
]



const ProductPage = ({params}: any) => {
    const [product, setProduct] = useState<ItemsTypes | null>(null);
    const [activeStage, setActiveStage] = useState(1);
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
                    ...prevState.items[0],
                    item: product.id || null,
                    item_model: colorModels.id || null,
                    company: product.company.id || null
                }]
            }));
        }
    }, [product, colorModels, profile]);

    useEffect(() => {
        api.get(`/items/${params.id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
            <Dialog open={sentOrder}>
                <DialogContent className={'max-w-[539px]'}>
                    <span>
                        <X width={24} height={24} onClick={() => setSentOrder(false)}/>
                    </span>
                    <h1>
                        The seller will contact
                        you shortly
                    </h1>
                </DialogContent>
            </Dialog>
            <AddToOrder open={isActiveAlert} onOpenChange={setIsActiveAlert} onSubmit={handleOrder}
                        onChange={handleChange} dataOrder={dataOrder}
                        onChange1={(e) => setDataOrder({...dataOrder, comment: e.target.value})}
                        colorModels={colorModels} product={product}/>
            {product ? (
                <section className={'mt-[16px] md:mt-[36px]'}>
                    <div className={'globalContainer'}>
                        <Stages
                            className={' !grid-cols-2 md:!grid-cols-4 !gap-y-4'}
                            stageNames={stageNames}
                            activeStage={activeStage}
                            setActiveStage={setActiveStage}
                        />
                    </div>
                    <div>
                        {activeStage === 1 && (
                            <ItemStage1
                                setColorModels={setColorModels}
                                setActiveStage={setActiveStage}
                                product={product}
                                setIsActiveAlert={setIsActiveAlert}
                            />
                        )}
                        <div className={'flex gap-8'}>
                            {activeStage === 2 && (
                                <ItemStage2
                                    colorModels={colorModels}
                                    product={product}
                                />
                            )}
                            {activeStage === 3 && (
                                <ItemStage3

                                />
                            )}
                            {activeStage === 4 && (
                                <ItemStage4

                                />
                            )}
                            {colorModels && activeStage !== 1 && (
                                <CardItem setIsActiveAlert={setIsActiveAlert} title={'Your product'}
                                          colorModels={colorModels} product={product} button={true}/>
                            )}
                        </div>
                    </div>
                </section>
            ) : (
                <Loading/>
            )}
        </>
    );
};

export default ProductPage;
