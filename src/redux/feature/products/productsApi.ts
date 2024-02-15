import { api } from "../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productData) => ({
        url: "/books/add-book",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["books"],
    }),
    getProducts: builder.query({
      query: ({
        searchTerm,
        genre,

        language,
        format,
      }) => {
        let queryString = "/books/?";
        if (searchTerm) queryString += `&searchTerm=${searchTerm}`;
        if (genre) queryString += `&genre=${genre}`;
        if (language) queryString += `&language=${language}`;
        if (format) queryString += `&format=${format}`;

        return queryString;
      },
      providesTags: ["books"],
    }),
    deleteProduct: builder.mutation({
      query: (productId: string) => ({
        url: `/books/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useAddProductMutation,
} = productApi;
