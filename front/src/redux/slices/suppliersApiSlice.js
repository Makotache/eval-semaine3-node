import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const API_URL = import.meta.env.VITE_API_URL;

export const suppliersApiSlice = createApi({
    reducerPath: "suppliersApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ["suppliers"],
    endpoints: (builder) => ({
        getSuppliers: builder.query({
            query: () => "/suppliers/all"
        }),
        addSupplier: builder.mutation({
            query: (data) => ({
                url: "/suppliers/add",
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data,
                credentials: "include"
            }),
            invalidatesTags: ["suppliers"]
        }),
        updateSupplier: builder.mutation({
            query: (data) =>
            ({
                url: "/suppliers/update",
                method: "put",
                body: data,
                credentials: "include"
            }),
            invalidatesTags: ["suppliers"]
        }),
    })
});

export const { useGetSuppliersQuery, useAddSupplierMutation, useUpdateSupplierMutation } = suppliersApiSlice;