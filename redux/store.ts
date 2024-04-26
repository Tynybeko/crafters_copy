import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user';
import companySlice from './slices/company'
import itemCategoriesSlice from './slices/item-categories'
import itemSubcategoriesSlice from "@/redux/slices/item-subcategories";
import colorsSlice from "@/redux/slices/colors";
import currencySlice from "@/redux/slices/currency";
import myItemsSlice from "@/redux/slices/my-items";
import itemsSlice from "@/redux/slices/items";
import myPurchases from "@/redux/slices/my-purchases";
import favorites from "@/redux/slices/favorites";
import chatRoomsSlice from "@/redux/slices/chatRooms";

export const makeStore = () => {
    return configureStore({
        reducer   : {
            user   : userSlice,
            company: companySlice,
            categories: itemCategoriesSlice,
            subCategories: itemSubcategoriesSlice,
            colors: colorsSlice,
            currency: currencySlice,
            myItems: myItemsSlice,
            items: itemsSlice,
            myPurchases: myPurchases,
            favorites: favorites,
            chatRooms: chatRoomsSlice,
        },
        devTools  : true,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                serializableCheck: false
            })
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']