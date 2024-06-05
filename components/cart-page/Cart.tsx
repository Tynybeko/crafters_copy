'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { cartHistory } from '@/redux/slices/cart'
import React, { useEffect } from 'react'
import './cart.css'

export default function Cart() {
    const cart = useAppSelector(state => state.cart.data)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(cartHistory())
    }, [])

    return (
        <div className='cart-page w-full'>
            <div className='cart-page_head relative'>
                <h3>Order placement</h3>
                <div className='line-outer w-full h-[2px] '>
                    <div className='line-inner bg-primary'></div>
                </div>
            </div>
            {
                cart.map(item => (
                    <h1>{item.name}</h1>
                ))
            }
        </div>
    )
}
