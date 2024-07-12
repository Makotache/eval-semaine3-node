import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const API_URL = import.meta.env.VITE_API_URL;

export const materialsApiSlice = createApi({
    reducerPath: "materialsApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ["materials"],
    endpoints: (builder) => ({
        getMaterials: builder.query({
            query: () => ({
                url: "/materials/all",
                credentials: "include"
            })
        }),
        addMaterial: builder.mutation({
            query: (data) => ({
                url: "/materials/add",
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data,
                credentials: "include"
            }),
            invalidatesTags: ["materials"]
        }),
        updateMaterial: builder.mutation({
            query: (data) =>
            ({
                url: "/materials/update",
                method: "put",
                body: data,
                credentials: "include"
            }),
            invalidatesTags: ["materials"]
        }),
        getStatistics: builder.query({
            query: () => ({
                url: "/materials/statistics",
                credentials: "include"
            })
        }),

    })
});

export const { useGetMaterialsQuery, useAddMaterialMutation, useUpdateMaterialMutation, useGetStatisticsQuery } = materialsApiSlice;