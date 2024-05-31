import { apiSlice } from "@/api/apiSlice";

export const defenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDefense: builder.query({
      query: (id) => ({
        url: `/evaluator/defense/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDefenseQuery } = defenseApiSlice;
