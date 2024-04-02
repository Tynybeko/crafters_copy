import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { InitialStateType, ISubcategories } from "@/types";
import { apiToken } from "@/axios";

const initialState : InitialStateType<ISubcategories[]> = {
    data     : null,
    isLoading: false,
    isError  : false
}

export const fetchItemSubcategories = createAsyncThunk(
    "itemSubcategories/fetchItemSubcategories",
    async ({categoryId} : any) => {
        const response = await apiToken.get(`/item-subcategories/?category=${categoryId}`)
        try {
            return response.data
        }
        catch (e) {
            console.log(e)
        }
    }
)

const itemSubcategoriesSlice = createSlice({
    name         : 'itemSubcategories',
    initialState,
    reducers     : {},
    extraReducers: builder => {
        builder
          .addCase(fetchItemSubcategories.pending, (state) => {
            state.isLoading = true
          })
          .addCase(fetchItemSubcategories.fulfilled, (state, { payload }) => {
            state.data = payload
            state.isLoading = false
          })
          .addCase(fetchItemSubcategories.rejected, (state) => {
            state.isError = true
            state.isLoading = false
            state.data = null
          })
    }
})

export const {} = itemSubcategoriesSlice.actions

export default itemSubcategoriesSlice.reducer