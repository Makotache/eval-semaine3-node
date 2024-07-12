import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { productsApiSlice } from "./slices/productsApiSlice";
import { suppliersApiSlice } from "./slices/suppliersApiSlice";
import { materialsApiSlice } from "./slices/materialsApiSlice";
import { authApiSlice } from "./slices/authApiSlice";

export default configureStore({
    reducer: {
        auth: authSlice.reducer,
        authApi: authApiSlice.reducer,
        materialsApi: materialsApiSlice.reducer,
        productsApi: productsApiSlice.reducer,
        suppliersApi: suppliersApiSlice.reducer
    },
    middleware: (getDefaultMidlleware) =>
        getDefaultMidlleware().concat(
            authApiSlice.middleware,
            materialsApiSlice.middleware,
            productsApiSlice.middleware,
            suppliersApiSlice.middleware
        )
});