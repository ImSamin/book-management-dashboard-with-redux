import { api } from "../../api/apiSlice";

const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users/create-user",
        method: "POST",
        body: newUser,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyToken: builder.mutation({
      query: (credentials) => ({
        url: "/auth/verify-token",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useVerifyTokenMutation,
} = loginApi;
