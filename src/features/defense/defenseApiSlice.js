import { apiSlice } from "@/api/apiSlice";

export const defenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDefenseProject: builder.query({
      query: (id) => ({
        url: `/evaluator/defense/project/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0.0001,
    }),
    defenseEvaluation: builder.mutation({
      query: (credentials) => ({
        url: "/evaluator/defense/evaluation",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Project", "Defense"],
    }),
    getDefense: builder.query({
      query: (id) => ({
        url: `/evaluator/defense/${id}`,
        method: "GET",
      }),
      providesTags: ["Defense"],
    }),
  }),
});

export const {
  useGetDefenseQuery,
  useGetDefenseProjectQuery,
  useDefenseEvaluationMutation,
} = defenseApiSlice;
