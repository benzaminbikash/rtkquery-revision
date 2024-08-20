import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "get",
      }),
    }),
    postUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "post",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "delete",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "put",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  usePostUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = API;
