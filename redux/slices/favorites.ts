import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InitialStateType} from "@/types";
import {apiToken} from "@/axios";


const initialState: InitialStateType<any> = {
    data: null,
    isLoading: false,
    isError: false
}

export const fetchFavorites = createAsyncThunk(
    'favorites/fetchFavorites',
    async () => {
        const response = await apiToken.get('/favorite-items/')
        try {
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

const favorites = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites(state, action: PayloadAction<any>) {
            state.data = action.payload;
        },
        deleteFavorites(state, action: PayloadAction<any>) {
            state.data = state.data.filter((item: any) => item.item_data.id !== action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFavorites.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.data = null
            })
    }
});

// Export actions and reducer
export const {addToFavorites, deleteFavorites} = favorites.actions;
export default favorites.reducer;

