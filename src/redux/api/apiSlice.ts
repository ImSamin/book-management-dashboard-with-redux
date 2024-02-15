import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base API
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-management-backend.vercel.app/api/v1",
  }),
  tagTypes: ["books", "sell"],
  endpoints: () => ({}),
});

export default api;
