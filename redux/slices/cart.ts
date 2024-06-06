import { ItemsTypes } from "@/types";
import { createSlice } from "@reduxjs/toolkit";


export interface ICartItemsType extends ItemsTypes {
    quantity: number | undefined,
    maxCount: number
}

interface IInitialState {
    data: ICartItemsType[]
}



const cartLocal = () => {
    let data = window.localStorage.getItem('cartItems')
    if (!data) return []
    return JSON.parse(data)
}

const setCart = (data: any) => localStorage.setItem('cartItems', JSON.stringify(data))

const initialState: IInitialState = {
    data: []
}


const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem(state, { payload }) {
            const newData = [...state.data, payload]
            state.data = newData
            setCart(newData)
            return state
        },
        removeCartItem(state, { payload }) {
            const newData = state.data.filter(el => el.id != payload.id)
            state.data = newData
            setCart(newData)
            return state
        },
        cartHistory(state) {
            state.data = cartLocal()
            return state
        },
        counterCartItem(state, { payload }) {
            const newData = state.data.map(el => el.id == payload.id ? payload : el)
            setCart(newData)
            state.data = newData
            return state
        },
        clearCart(state) {
            state.data = []
            setCart([])
            return state
        }
    },
})


export default CartSlice.reducer
export const { addCartItem, removeCartItem, cartHistory, counterCartItem, clearCart } = CartSlice.actions