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
  }),
});

export const {
  useGetAllEventsQuery,
  useCreateEventMutation,
  useGetEventQuery,
  useCreateEvaluatorMutation,
  useGetAllEvaluatorQuery,
} = adminApiSlice;
