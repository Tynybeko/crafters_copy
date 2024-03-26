import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user';
import companySlice from './slices/company'

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userSlice,
            company: companySlice
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']