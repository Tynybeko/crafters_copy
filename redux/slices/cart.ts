import { ItemsTypes } from "@/types";
import { createSlice } from "@reduxjs/toolkit";




interface IInitialState {
    data: ItemsTypes[]
}

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
            return state
        },
        removeCartItem(state, { payload }) {
            const newData = state.data.filter(el => el.id != payload.id)
            state.data = newData
            return state
        }
    },
})


export default CartSlice.reducer
export const { addCartItem, removeCartItem } = CartSlice.actions