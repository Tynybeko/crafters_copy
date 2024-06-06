import React, { useEffect } from 'react'
import CartItemCard from '../CartItemCard'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { cartHistory } from '@/redux/slices/cart'
import EmptyBox from '@/components/empty-box'

export default function OrderStage1() {
    const cart = useAppSelector(state => state.cart.data)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(cartHistory())
    }, [])

    return (
        <div className='order-stage-one'>
            {
                cart.map(item => (
                    <CartItemCard item={item} />
                ))
            }
            {
                cart.length == 0 && <EmptyBox />
            }
        </div>
    )
}
