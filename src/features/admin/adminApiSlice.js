import { apiSlice } from "@/api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => ({
        url: "/event/events",
        method: "GET",
      }),
      providesTags: ["Events"],
    }),
    getEvent: builder.query({
      query: (id) => ({
        url: `/event/events/${id}`,
        method: "GET",
      }),
      providesTags: ["Event"],
    }),
    createEvent: builder.mutation({
      query: (credentials) => ({
        url: "/event/create",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Events"],
    }),
    extendDeadline: builder.mutation({
      query: (credentials) => ({
        url: "/event/event/extendDeadline",
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: ["Event"],
    }),
    createEvaluator: builder.mutation({
      query: (credentials) => ({
        url: "/event/evaluator/create",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Evaluators"],
    }),
    getAllEvaluator: builder.query({
      query: () => ({
        url: "/event/evaluators",
        method: "GET",
      }),
      providesTags: ["Evaluators"],
    }),
    getAllDefenses: builder.query({
      query: () => ({
        url: "/event/defense/defenses",
        method: "GET",
      }),
      providesTags: ["Defenses"],
    }),
    createDefense: builder.mutation({
      query: (credentials) => ({
        url: "/event/defense/create",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Defenses", "Events", "Event"],
    }),
    createDefenseData: builder.query({
      query: () => ({
        url: "/event/defense/create",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useCreateEventMutation,
  useGetEventQuery,
  useCreateEvaluatorMutation,
  useGetAllEvaluatorQuery,
  useGetAllDefensesQuery,
  useCreateDefenseDataQuery,
  useCreateDefenseMutation,
  useExtendDeadlineMutation,
} = adminApiSlice;
