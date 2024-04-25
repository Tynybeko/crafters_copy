import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialStateType } from "@/types";
import { apiToken } from "@/axios";

const initialState : InitialStateType<any> = {
    data     : null,
    isLoading: false,
    isError  : false,
};

export const fetchItems = createAsyncThunk(
    "items/fetchItems",
    async ({ params, id }: {params?: any,  id?: number}) => {
        const response = await apiToken.get(`items/${id ? id : ''}`, {
            params: {
                category: params?.category,
                subcategory: params?.subcategory
            }
        })
        try {
            return response.data
        }
        catch (e) {
            console.log(e)
        }
    }
)


const itemsSlice = createSlice({
    name    : 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchItems.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
    },
})

export const {} = itemsSlice.actions

export default itemsSlice.reducer