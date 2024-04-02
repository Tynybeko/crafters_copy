import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IColors, InitialStateType } from "@/types";
import { apiToken } from "@/axios";

const initialState: InitialStateType<IColors> = {
  data     : null,
  isLoading: false,
  isError  : false
}


export const fetchColors = createAsyncThunk(
  "colors/fetchColors",
  async () => {
    const response = await apiToken.get('/colors/')
    try {
      return response.data
    }
    catch (e) {
      console.log(e)
    }
  }
)


const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchColors.fulfilled, (state, { payload }) => {
        state.data = payload
        state.isLoading = false
      })
      .addCase(fetchColors.rejected, (state) => {
        state.isError = true
        state.isLoading = false
        state.data = null
      })
  }
})

export const {} = colorsSlice.actions

export default colorsSlice.reducer