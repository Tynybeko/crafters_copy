'use client'



import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addCartItem, removeCartItem } from '@/redux/slices/cart'
import { ItemsTypes } from '@/types'
import React from 'react'

export default function AddCart({ item }: { item: ItemsTypes }) {
    const dipatch = useAppDispatch()
    const cart = useAppSelector(state => state.cart.data)
    const isCart = cart.some(el => el.id == item.id)

    const handleAddCart = () => dipatch(addCartItem(item))
    const handleRemoveCart = () => dipatch(removeCartItem(item))
    const switchCart = () => isCart ? handleRemoveCart() : handleAddCart()

    return (
        <div onClick={switchCart} className={`cart-btn flex justify-center items-center text-primary  hover:text-white hover:bg-primary delay-500 ${isCart ? 'active' : ''}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_4323_2533)">
                    <path d="M1.33203 1.33301H2.20281C2.36682 1.33301 2.44883 1.33301 2.51482 1.36317C2.57298 1.38975 2.62226 1.43249 2.6568 1.4863C2.69599 1.54737 2.70759 1.62855 2.73078 1.79092L3.04632 3.99967M3.04632 3.99967L3.74758 9.15394C3.83657 9.80802 3.88106 10.1351 4.03743 10.3812C4.17522 10.5982 4.37275 10.7706 4.60627 10.8779C4.87127 10.9997 5.20133 10.9997 5.86144 10.9997H11.5667C12.1951 10.9997 12.5092 10.9997 12.766 10.8866C12.9924 10.7869 13.1866 10.6262 13.3269 10.4225C13.486 10.1914 13.5448 9.88278 13.6623 9.26551L14.5448 4.6328C14.5862 4.41555 14.6068 4.30692 14.5769 4.22201C14.5506 4.14752 14.4986 4.0848 14.4304 4.04502C14.3526 3.99967 14.242 3.99967 14.0209 3.99967H3.04632ZM6.66536 13.9997C6.66536 14.3679 6.36689 14.6663 5.9987 14.6663C5.63051 14.6663 5.33203 14.3679 5.33203 13.9997C5.33203 13.6315 5.63051 13.333 5.9987 13.333C6.36689 13.333 6.66536 13.6315 6.66536 13.9997ZM11.9987 13.9997C11.9987 14.3679 11.7002 14.6663 11.332 14.6663C10.9638 14.6663 10.6654 14.3679 10.6654 13.9997C10.6654 13.6315 10.9638 13.333 11.332 13.333C11.7002 13.333 11.9987 13.6315 11.9987 13.9997Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_4323_2533">
                        <rect width="16" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    )
}
