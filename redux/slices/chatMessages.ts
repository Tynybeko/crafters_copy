import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {InitialStateType} from "@/types";
import {IMessages} from "@/types/message";
import {apiToken} from "@/axios";


const initialState: InitialStateType<IMessages> = {
    data: null,
    isLoading: false,
    isError: false
}


export const fetchChatMessages = createAsyncThunk(
    'chatMessage/fetchChatMessages',
    async ({uuid, query}: any) => {
        const myQuery = new URLSearchParams(query)
        const response = await apiToken.get(`/chat/messages/room/${uuid}/?${myQuery}`)
        try{
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }
)


const chatMessagesSlice = createSlice({
    name: 'chatMessage',
    initialState,
    reducers: {},
    extraReducers : builder => {
        builder
            .addCase(fetchChatMessages.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchChatMessages.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchChatMessages.rejected, (state) => {
                state.isLoading = false
                state.isError = true
                state.data = null
            })
    }
})


export default chatMessagesSlice.reducer