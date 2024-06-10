import { useAppDispatch } from '@/redux/hooks'
import { ICartItemsType, counterCartItem, removeCartItem } from '@/redux/slices/cart'
import { setToastiState } from '@/redux/slices/toastiSlice'
import React, { useCallback } from 'react'

interface ICartItemCardProps {
    item: ICartItemsType,
    index: number
}

export default function CartItemCard({ item, index }: ICartItemCardProps) {
    const dispatch = useAppDispatch()

    const handleCopy = () => {
        navigator.clipboard.writeText(item.code ?? '12345');
        dispatch(setToastiState([{ type: 'succes', data: 'Скопировано' }]))
    }

    const handleRemoveItemCart = () => dispatch(removeCartItem(item))
    const increment = useCallback(() => (item.quantity ?? 1) < item.maxCount ? dispatch(counterCartItem({ ...item, quantity: (item.quantity ?? 1) + 1 })) : null, [item.quantity])
    const decrement = useCallback(() => (item.quantity ?? 1) > 1 ? dispatch(counterCartItem({ ...item, quantity: (item.quantity ?? 1) - 1 })) : null, [item.quantity])

    console.log(item);

    return (
        <div className='cart-card'>
            {/* {console.log(item.models_name[index].colors[index].images[index].image, index)} */}
            <div className='cart-card-img'>
                {/* <img src={item.image} alt="Img" /> */}
                <img src={item.models_name[0].colors[0].images[0].image} alt="Img" />
            </div>
            <div className='cart-card-content'>
                <div className="title">
                    <h2>{item.name}</h2>
                    <svg onClick={handleRemoveItemCart} width="24.000000" height="24.000000" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <clipPath id="clip4092_25331">
                                <rect id="x-circle" width="24.000000" height="24.000000" fill="white" fill-opacity="0" />
                            </clipPath>
                        </defs>
                        <g clip-path="url(#clip4092_25331)">
                            <path id="Icon" d="M12 22C6.47 22 2 17.52 2 12C2 6.47 6.47 2 12 2C17.52 2 22 6.47 22 12C22 17.52 17.52 22 12 22ZM15 9L9 15M9 9L15 15" stroke="currentColor" stroke-opacity="1.000000" stroke-width="1.500000" stroke-linejoin="round" />
                        </g>
                    </svg>
                </div>
                <div className="info">
                    <p className='stock'>
                        {
                            item.maxCount ? (
                                <>
                                    <img src="/svg/check-circle-broken.svg" alt="" />
                                    In stock
                                </>) :
                                <>
                                    <img src="/svg/check-circle-broken.svg" alt="" />
                                    Out of stock
                                </>
                        }

                    </p>
                    <p onClick={handleCopy} className='code'>
                        Code: {item.code} <img src="/svg/copy.svg" alt="" />
                    </p>
                </div>
                <div className="action">
                    <div className="quantity-action">
                        <button onClick={decrement} className='dec'>
                            <svg width="5.507812" height="9.505859" viewBox="0 0 5.50781 9.50586" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <defs />
                                <path id="Icon" d="M4.75 8.75L0.75 4.75L4.75 0.75" stroke="#1DBE60" stroke-opacity="1.000000" stroke-width="1.500000" stroke-linejoin="round" stroke-linecap="round" />
                            </svg>
                        </button>
                        <p>
                            {item.quantity ?? 1}
                        </p>
                        <button onClick={increment} className='inc'>
                            <svg width="5.507812" height="9.505859" viewBox="0 0 5.50781 9.50586" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <defs />
                                <path id="Icon" d="M4.75 8.75L0.75 4.75L4.75 0.75" stroke="#1DBE60" stroke-opacity="1.000000" stroke-width="1.500000" stroke-linejoin="round" stroke-linecap="round" />
                            </svg>
                        </button>
                    </div>
                    <p className='text-[32px] text-orange-500 font-bold'>{item?.currency?.code ?? '$'}{item?.price * (item?.quantity || 1)}</p>
                </div>
            </div>
        </div>
    )
}
