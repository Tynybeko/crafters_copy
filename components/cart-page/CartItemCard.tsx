import { ICartItemsType } from '@/redux/slices/cart'
import React from 'react'


interface ICartItemCardProps {
    item: ICartItemsType
}

export default function CartItemCard({ item }: ICartItemCardProps) {


    return (
        <div className='cart-card'>{item.name}</div>
    )
}
