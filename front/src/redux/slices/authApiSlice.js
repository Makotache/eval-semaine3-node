import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "post",
                body: data,
                credentials: "include"
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "get",
                credentials: "include"
            })
        }),
        me: builder.mutation({
            query: () => ({
                url: "/me",
                method: "get",
                credentials: "include"
            })
        })
    })
});

export const { useLoginMutation, useLogoutMutation, useMeMutation } = authApiSlice;