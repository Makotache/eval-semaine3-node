import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const API_URL = import.meta.env.VITE_API_URL;

export const authApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ["auth"],
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => ({
                url: "/auth/me",
                credentials: "include"
            })
        }),
        logout: builder.query({
            query: () => ({
                url: "/auth/logout",
                credentials: "include"
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data,
                credentials: "include"
            }),
            invalidatesTags: ["auth"]
        })
    })
});


export const { useGetMeQuery, useLogoutQuery, useLoginMutation } = authApiSlice;