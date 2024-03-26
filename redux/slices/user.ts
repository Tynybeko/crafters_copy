import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiToken } from "@/axios";
import { InitialStateType, IUser } from "@/types";
import { useAppDispatch } from "@/redux/hooks";


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
        },
        LogoutUser(state) {
            state.data = null
            state.isAuth = false
            if(typeof window !== 'undefined') {
              localStorage.removeItem('token')
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

export const { LoginUser, RegisterUser, LogoutUser } = userSlice.actions

export default userSlice.reducer



export function onEditUserData(data: any) {
    const dispatch = useAppDispatch();
    apiToken.patch('/accounts/profile/', data)
      .then(() => {
          dispatch(fetchUser());
      })
      .catch((error) => {
          console.log(error)
      })
}
