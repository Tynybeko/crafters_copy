import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMyItems } from "@/types";
import { apiToken } from "@/axios";

const initialState = {
    data     : [] as IMyItems[],
    isLoading: false,
    isError  : false
};

export const fetchMyItems =  createAsyncThunk(
  'myItems/fetchMyItems',
  async () => {
      const response = await apiToken.get('/my-items/')
      try {
          return response.data
      }
      catch ( error ) {
          throw error
      }
  }
)


const MyItems = createSlice({
    name         : 'myItems',
    initialState,
    reducers     : {
        deleteMyItem: (state, action) => {
            state.data = state.data?.filter((item) => item.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchMyItems.pending, (state) => {
              state.isLoading = true
          })
          .addCase(fetchMyItems.fulfilled, (state, action) => {
              state.isLoading = false
              state.data = action.payload
          })
          .addCase(fetchMyItems.rejected, (state) => {
              state.isLoading = false
              state.isError = true
          })
    }
})

export const {deleteMyItem} = MyItems.actions

export default MyItems.reducer

