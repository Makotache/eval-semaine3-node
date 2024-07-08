import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const pastriesApiSlice = createApi({
    reducerPath: "pastriesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api" }),
    tagTypes: ["pastries"],
    endpoints: (builder) => ({
        getPastries: builder.query({
            query: () => ({
                url: "/pastries",
                method: "get",
                credentials: "include"
            }),
            providesTags: ["pastries"]
        }),
        addPastry: builder.mutation({
            query: (data) => ({
                url: "/pastrie",
                method: "post",
                body: data,
                credentials: "include"
            }),
            invalidatesTags: ["pastries"]
        }),
        modifyPastry: builder.mutation({
            query: (data) => ({
                url: "/pastrie/" + data.id,
                method: "put",
                body: data,
                credentials: "include"
            }),
            invalidatesTags: ["pastries"]
        }),
        deletePastry: builder.mutation({
            query: (id) => ({
                url: "/pastrie/" + id,
                method: "delete",
                credentials: "include"
            }),
            invalidatesTags: ["pastries"]
        })

    })
});

export const { useGetPastriesQuery, useAddPastryMutation, useModifyPastryMutation, useDeletePastryMutation } = pastriesApiSlice;