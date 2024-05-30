import { apiSlice } from "@/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    defenseLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/evaluator",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.query({
      query: () => ({
        url: "/refresh",
        method: "GET",
      }),
    }),
    refreshUser: builder.query({
      query: () => ({
        url: "/user/account",
        method: "GET",
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useDefenseLoginMutation } =
  authApiSlice;
