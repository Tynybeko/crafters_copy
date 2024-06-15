import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { InitialStateType, ISubcategories } from "@/types";
import { apiToken } from "@/axios";

const initialState: InitialStateType<ISubcategories[]> = {
    data: [],
    allItems: [],
    isLoading: false,
    isError: false
}

export const fetchAllItemSubcategories = createAsyncThunk(
    "itemSubcategories/fetchAllItemSubcategories",
    async () => {
        const response = await apiToken.get(`/item-subcategories/`)
        try {
            return response.data
        }
        catch (e) {
            console.log(e)
        }
    }
)

export const fetchItemSubcategories = createAsyncThunk(
    "itemSubcategories/fetchItemSubcategories",
    async ({ categoryId }: any) => {
        const response = await apiToken.get(`/item-subcategories/`, {
            params: {
                category: categoryId,
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

const itemSubcategoriesSlice = createSlice({
    name: 'itemSubcategories',
    initialState,
    reducers: {},
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
                state.data = []
            })

            .addCase(fetchAllItemSubcategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAllItemSubcategories.fulfilled, (state, { payload }) => {
                state.allItems = payload
                state.isLoading = false
            })
            .addCase(fetchAllItemSubcategories.rejected, (state) => {
                state.isError = true
                state.isLoading = false
                state.allItems = []
            })
    }
})

export const { } = itemSubcategoriesSlice.actions

export default itemSubcategoriesSlice.reducer