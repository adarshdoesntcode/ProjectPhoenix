import { apiSlice } from "@/api/apiSlice";

export const defenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDefenseProject: builder.query({
      query: (id) => ({
        url: `/evaluator/defense/project/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),
    defenseEvaluation: builder.mutation({
      query: (credentials) => ({
        url: "/evaluator/defense/evaluation",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: (result, error, credentials) => [
        { type: "Project", id: credentials.projectId },
        { type: "Defense", id: credentials.defenseId },
      ],
    }),
    getDefense: builder.query({
      query: (id) => ({
        url: `/evaluator/defense/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Defense", id }],
    }),
  }),
});

export const {
  useGetDefenseQuery,
  useGetDefenseProjectQuery,
  useDefenseEvaluationMutation,
} = defenseApiSlice;
