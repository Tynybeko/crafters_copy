import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiToken} from "@/axios";
import {InitialStateType} from "@/types";


interface IChatRooms {

}

const initialState = {
    data: [] as any,
    isLoading: false,
    isError: false
}

export const fetchChatRooms = createAsyncThunk(
    'chatRooms/fetchChatRooms',
    async () => {
        const response = await apiToken.get('/chat/rooms/')
        try {
            return response.data
        }
        catch (e) {
            console.log(e)
        }
    }
)



const chatRooms = createSlice({
    name: 'chatRooms',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchChatRooms.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchChatRooms.fulfilled, (state, actions) => {
                state.isLoading = false
                state.data = actions.payload
            })
            .addCase(fetchChatRooms.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
    }
})

export const {} = chatRooms.actions
export default chatRooms.reducer
