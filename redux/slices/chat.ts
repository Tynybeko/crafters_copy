import {createSlice} from "@reduxjs/toolkit";




const initialState = {
    data: null,
    isLoading: false,
    isError: false
}




const chatRooms = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: builder => {

    }
})