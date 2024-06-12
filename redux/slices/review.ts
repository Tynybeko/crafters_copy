import { apiToken } from '@/axios';
import { IResponseInit, IReviewType } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const FetchReviews = createAsyncThunk('items-reviews/FetchReviews', async (_, { rejectWithValue }) => {
    const response = await apiToken.get("my-reviews/")
    try {
        return response.data
    }
    catch (e) {
        console.log(e)
    }
})




interface IReviewInitialState {
    // data: IResponseInit<IReviewType[]> | [],
    data: any,
    loading: boolean,
    error: string
}




const initialState: IReviewInitialState = {
    data: [],
    loading: false,
    error: ''
}



const ReviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FetchReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(FetchReviews.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.error = "false";
            })
            .addCase(FetchReviews.rejected, (state) => {
                state.loading = false;
                state.error = "true";
            })
    },
})

export const { } = ReviewSlice.actions

export default ReviewSlice.reducer