'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { cartHistory, clearCart } from '@/redux/slices/cart'
import React, { ChangeEvent, useEffect, useState } from 'react'
import './cart.css'
import CartItemCard from './CartItemCard'
import OrderStage1 from './order-stages/OrderStage1'
import OrderStages from './order-stages/OrderStages'
import OrderStage2, { IOrderContactDetails } from './order-stages/OrderStage2'
import OrderStage3 from './order-stages/OrderStage3'
import OrderStage4 from './order-stages/OrderStage4'
import { Button } from '../ui/button'
import { setToastiState } from '@/redux/slices/toastiSlice'
import { apiToken } from '@/axios'




export default function Cart() {
    const dispatch = useAppDispatch()
    const cart = useAppSelector(state => state.cart.data)
    const [contactDetails, setContactDetails] = useState<IOrderContactDetails>({
        phone: '',
        name: '',
        comment: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let key = e.target.name
        let value = e.target.value
        setContactDetails(prev => ({ ...prev, [key]: value }))
    }
    const [orderStages, setOrderStages] = useState([
        {
            stage: 1,
            is_complete: true,
            text: 'Goods in cart'
        },
        {
            stage: 2,
            is_complete: false,
            text: 'Contact details'
        },
        {
            stage: 3,
            is_complete: false,
            text: 'Method of obtaining'

        },
        {
            stage: 4,
            is_complete: false,
            text: 'Method of payment'

        },
    ])

    const [stage, setStage] = useState(1)
    const next = () => {
        setOrderStages(prev => prev.map(item => item.stage == stage ? { ...item, is_complete: true } : item))
        if (stage + 1 > 4) {
            let notConfStage = orderStages.find(item => !item.is_complete)
            if (notConfStage) {
                return setStage(notConfStage.stage)
            }
        }
        setStage(prev => prev + 1)
    }
    useEffect(() => {
        if (!cart.length) {
            setOrderStages(prev => prev.map(item => item.stage == 1 ? { ...item, is_complete: false } : item))
        } else {
            setOrderStages(prev => prev.map(item => item.stage == 1 ? { ...item, is_complete: true } : item))
        }
    }, [cart])

    const confirmOrder = () => {
        if (!orderStages.every(item => item.is_complete)) return dispatch(setToastiState([{ type: 'error', data: 'Заполните необходимую информацию!' }]))
        apiToken.post('/send-order/', {
            ...contactDetails,
            items: cart
        }).then(res => {
            dispatch(setToastiState([{ type: 'succes', data: 'Заказ отправлен!' }]))
            window.location.replace('/personal-cabinet/my-purchases')
            dispatch(clearCart())
        }).catch(err => {
            dispatch(setToastiState([{ type: 'error', data: err.message ?? 'Произошла ошибка при отправке заказа!' }]))
        })
    }


    return (
        <div className='cart-page w-full'>
            <div className='cart-page_head relative'>
                <h3>Order placement</h3>
                <div className='line-outer w-full h-[2px] '>
                    <div className='line-inner bg-primary'></div>
                </div>
            </div>
            <div className="cart-page-inner">
                <div className="cart-page-inner-order_content">
                    {
                        orderStages.map(item => (
                            <OrderStages setStage={setStage} isOpen={item.stage == stage} item={item}>
                                {
                                    1 == stage && item.stage == stage && <OrderStage1 />
                                }
                                {
                                    2 == stage && item.stage == stage && <OrderStage2 next={next} setData={handleChange} data={contactDetails} />
                                }
                                {
                                    3 == stage && item.stage == stage && <OrderStage3 next={next} />
                                }
                                {
                                    4 == stage && item.stage == stage && <OrderStage4 next={next} />
                                }

                            </OrderStages>
                        ))
                    }

                </div>
                <div className='cart-page-inner-your_product'>
                    <h2>Your Product</h2>
                    <div>
                        <div className='info'>
                            <div className='block'>
                                <h5>Goods in cart:</h5>
                                <p>
                                    {cart.length} шт
                                </p>
                            </div>
                            <div className='block'>
                                <h5>Contact details:</h5>
                                <p>
                                    {contactDetails.phone}
                                </p>
                                <p>
                                    {contactDetails.name}
                                </p>
                            </div>
                            <div className='block'>
                                <h5>Method of obtaining:</h5>
                                <p>
                                    Familiarized
                                </p>
                            </div>
                            <div className='block'>
                                <h5>Method of payment:</h5>
                                <p>
                                    Familiarized
                                </p>
                            </div>
                        </div>
                        <div className='payable flex justify-between items-center mt-1'>
                            <p>Payable to</p>
                            <h4 className='text-orange-500 font-bold text-[32px]'>${cart.reduce((acc, item) => acc += ((item.quantity ?? 1) * item.price), 0)}</h4>
                        </div>
                        <Button onClick={confirmOrder} variant={'outline'} className='w-full'>Confirm order</Button>
                    </div>

                </div>
            </div>

        </div>
    )
}
