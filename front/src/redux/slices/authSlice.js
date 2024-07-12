import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogging: false
    },
    reducers: {
        init: (state, action) =>
        {
            state.isLogging = action.payload == true;
            console.log("state.isLogging =>", state.isLogging)
        },
        login: state =>
        {
            state.isLogging = true;
        },
        logout: (state) =>
        {
            state.isLogging = false;
        },
    }
});

export const { init, login, logout } = authSlice.actions;
export default authSlice;