import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICurrency, InitialStateType } from "@/types";
import { apiToken } from "@/axios";

const initialState: InitialStateType<ICurrency> = {
  data     : null,
  isLoading: false,
  isError  : false
}


export const fetchCurrency = createAsyncThunk(
  "currency/fetchCurrency",
  async () => {
    const response = await apiToken.get('/currencies/')
    try {
      return response.data
    }
    catch (e) {
      console.log(e)
    }
  }
)

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCurrency.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCurrency.fulfilled, (state, { payload }) => {
        state.data = payload
        state.isLoading = false
      })
      .addCase(fetchCurrency.rejected, (state) => {
        state.isError = true
        state.isLoading = false
        state.data = null
      })
  }
})

export const {} = currencySlice.actions

export default currencySlice.reducer