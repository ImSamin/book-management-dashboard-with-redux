import { api } from "../../api/apiSlice";

const saleHistoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addSaleHistory: builder.mutation({
      query: (saleData) => ({
        url: "/sell",
        method: "POST",
        body: saleData,
      }),
      invalidatesTags: ["sell"],
    }),
    getSaleHistory: builder.query({
      query: ({ interval, startDate, endDate }) => {
        let queryString = `/sell/history?interval=${interval}`;

        if (startDate) queryString += `&startDate=${startDate}`;
        if (endDate) queryString += `&endDate=${endDate}`;

        return queryString;
      },
      providesTags: ["sell"],
    }),
  }),
});

export const { useAddSaleHistoryMutation, useGetSaleHistoryQuery } =
  saleHistoryApi;
