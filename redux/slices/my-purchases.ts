import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {InitialStateType, IPurchases} from "@/types";
import {apiToken} from "@/axios";
import {reducer} from "next/dist/client/components/router-reducer/router-reducer";


const initialState: InitialStateType<IPurchases[]> = {
    data: null,
    isLoading: false,
    isError: false
}

export const fetchMyPurchases = createAsyncThunk(
    'my-purchases/fetchMyPurchases',
    async () => {
        const response = await apiToken.get('/my-purchases/')
        try {
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }
)

const myPurchases = createSlice({
    name: 'my-purchases',
    initialState,
    reducers: {},
    extraReducers : builder => {
        builder
            .addCase(fetchMyPurchases.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchMyPurchases.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchMyPurchases.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.data = null
            })
    }
})

export const {} = myPurchases.actions

export default myPurchases.reducer