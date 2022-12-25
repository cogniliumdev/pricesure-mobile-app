import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const priceSureApi = createApi({

    reducerPath: "priceSureApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.0.105:7777" }),
    // baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
    endpoints: (builder) => ({
        getRes: builder.query({
            query: () => "/test"
        }),

        getElasticData: builder.mutation({
            query: (filtersObj) => ({
                url: "/elastic-data",
                method: "POST",
                body: filtersObj
            })
        })
    })

});

export { priceSureApi };
export const { useGetResQuery, useGetElasticDataMutation } = priceSureApi;
