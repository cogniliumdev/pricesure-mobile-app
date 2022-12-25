import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counterSlice/counterSlice.js"
import { priceSureApi } from "../api/pricesureApi.js"
import { setupListeners } from '@reduxjs/toolkit/query'


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [priceSureApi.reducerPath]: priceSureApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(priceSureApi.middleware)
})

setupListeners(store.dispatch);

