import { apiToken } from '@/axios';
import { IResponseInit, IReviewType } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const FetchReviews = createAsyncThunk('items-reviews/FetchReviews', async (payload: { query: { [key: string]: any },  }, { rejectWithValue }) => {
    const query = new URLSearchParams(payload.query)
    try {
        const { data } = await apiToken.get('')
    } catch (err) {

    }
})




interface IReviewInitialState {
    data: IResponseInit<IReviewType[]> | null,
    loading: boolean,
    error: string
}




const initialState: IReviewInitialState = {
    data: null,
    loading: false,
    error: ''
}



const ReviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {

    },
})