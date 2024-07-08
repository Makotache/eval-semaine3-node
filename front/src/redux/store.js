import { configureStore } from "@reduxjs/toolkit";
import { gameApiSlice } from "./slices/gameApiSlice";
import { authApiSlice } from "./slices/authApiSlice";
import { pastriesApiSlice } from "./slices/pastriesApiSlice";

export default configureStore({
    reducer: {
        gameApi: gameApiSlice.reducer,
        authApi: authApiSlice.reducer,
        pastriesApi: pastriesApiSlice.reducer
    },
    middleware: (getDefaultMidlleware) =>
        getDefaultMidlleware().concat(
            gameApiSlice.middleware,
            authApiSlice.middleware,
            pastriesApiSlice.middleware
        )
});