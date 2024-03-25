import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiToken } from "@/axios";
import { InitialStateType, IUser } from "@/types";


export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
      const response = await apiToken.get('/accounts/profile/', )
      try {
          return response.data
      }
      catch ( error ) { throw error }
  })



const initialState: InitialStateType<IUser> = {
    data: null,
    isAuth: false,
    isLoading: false,
    isError: false
}

const userSlice = createSlice({
    name         : 'user',
    initialState,
    reducers     : {
        LoginUser(state, action) {
            state.data = action.payload
            if ( action.payload ) {
                state.isAuth = true
            }
        },
        RegisterUser(state, action) {
            state.data = action.payload
            if ( action.payload ) {
                state.isAuth = true
            }
        }
    },
    extraReducers: builder => {
        builder
          .addCase(fetchUser.pending, (state) => {
              state.isLoading = true;
              state.isError = false;
          })
          .addCase(fetchUser.fulfilled, (state, action) => {
              state.isLoading = false;
              state.data = action.payload;
              state.isAuth = true;
              state.isError = false;
          })
          .addCase(fetchUser.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.data = null
          });
    }
})

export const { LoginUser, RegisterUser } = userSlice.actions

export default userSlice.reducer