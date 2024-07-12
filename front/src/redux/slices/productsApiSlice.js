import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const API_URL = import.meta.env.VITE_API_URL;


export const productsApiSlice = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ["products"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () =>
            ({
                url: "/products/all",
                credentials: "include"
            })
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: "/products/add",
                method: "post",
                body: data,
                credentials: "include"
            }),
            invalidatesTags: ["products"]
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: "/products/update",
                method: "put",
                body: data,
                credentials: "include"
            }),
            invalidatesTags: ["products"]
        }),
    })
});

export const { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation } = productsApiSlice;