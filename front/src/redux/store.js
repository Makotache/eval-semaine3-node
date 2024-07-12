import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { productsApiSlice } from "./slices/productsApiSlice";
import { suppliersApiSlice } from "./slices/suppliersApiSlice";
import { materialsApiSlice } from "./slices/materialsApiSlice";

export default configureStore({
    reducer: {
        auth: authSlice.reducer,
        materialsApi: materialsApiSlice.reducer,
        productsApi: productsApiSlice.reducer,
        suppliersApi: suppliersApiSlice.reducer
    },
    middleware: (getDefaultMidlleware) =>
        getDefaultMidlleware().concat(
            materialsApiSlice.middleware,
            productsApiSlice.middleware,
            suppliersApiSlice.middleware
        )
});