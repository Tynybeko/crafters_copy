import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICompany, InitialStateType } from "@/types";
import { apiToken } from "@/axios";


const initialState: InitialStateType<ICompany> = {
    data: null,
    isLoading: false,
    isError: false,
}

export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async () => {
        const response = await apiToken.get('my-company/')
      try {
        return response.data
      }
      catch (e) {
        console.log(e)
      }
   }
)


const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: { },
  extraReducers: builder => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCompany.fulfilled, (state, { payload }) => {
        state.data = payload
        state.isLoading = false
      })
      .addCase(fetchCompany.rejected, (state) => {
        state.isError = true
        state.isLoading = false
        state.data = null
      })
  }
})


export default companySlice.reducer