import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      console.log({ ...refreshResult.data, user });
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    refresh: builder.query({
      query: () => ({
        url: "/refresh",
        method: "GET",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((result) => {
            dispatch(setCredentials({ ...result }));
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }),
  }),
});

export const { useRefreshQuery, useGetUsersQuery } = apiSlice;
