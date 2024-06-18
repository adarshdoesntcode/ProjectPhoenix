import { apiSlice } from "@/api/apiSlice";

export const defenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDefenseProject: builder.query({
      query: (id) => ({
        url: `/evaluator/defense/project/${id}`,
        method: "GET",
      }),
    }),
    getDefense: builder.query({
      query: (id) => ({
        url: `/evaluator/defense/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDefenseQuery, useGetDefenseProjectQuery } =
  defenseApiSlice;
