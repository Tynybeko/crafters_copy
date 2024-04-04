import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICategories, InitialStateType } from "@/types";
import { apiToken } from "@/axios";

const initialState: InitialStateType<ICategories[]> = {
    data     : [],
    isLoading: false,
    isError  : false
}

export const fetchItemCategories = createAsyncThunk(
    "itemCategories/fetchItemCategories",
    async () => {
        const response = await apiToken.get('/item-categories/')
        try {
            return response.data
        }
        catch (e) {
            console.log(e)
        }
    }
)

const itemCategoriesSlice = createSlice({
    name         : 'itemCategories',
    initialState,
    reducers     : {},
    extraReducers: builder => {
        builder
            .addCase(fetchItemCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchItemCategories.fulfilled, (state, { payload }) => {
                state.data = payload
                state.isLoading = false
            })
            .addCase(fetchItemCategories.rejected, (state) => {
                state.isError = true
                state.isLoading = false
                state.data = []
            })
    }
})

export const {} = itemCategoriesSlice.actions

export default itemCategoriesSlice.reducer