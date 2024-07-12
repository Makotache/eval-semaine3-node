import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogging: false
    },
    reducers: {
        init: (state) =>
        {
            state.isLogging = localStorage.getItem("logging") != null;
        },
        login: state =>
        {
            state.isLogging = true;
            localStorage.setItem("logging", "logged");
        },
        logout: (state) =>
        {
            state.isLogging = false;
            localStorage.removeItem("logging");
        },
    }
});

export const { init, login, logout } = authSlice.actions;
export default authSlice;