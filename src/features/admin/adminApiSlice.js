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

    getAllSupervisors: builder.query({
      query: () => ({
        url: "/event/event/supervisors",
        method: "GET",
      }),
      providesTags: ["Supervisors"],
    }),
    getAllDefenses: builder.query({
      query: () => ({
        url: "/event/defense/defenses",
        method: "GET",
      }),
      providesTags: ["Defenses"],
    }),
    getDefenseDetail: builder.query({
      query: (credentials) => ({
        url: `/event/defense/${credentials}`,
        method: "GET",
      }),
    }),
    createDefense: builder.mutation({
      query: (credentials) => ({
        url: "/event/defense/create",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Defenses", "Events", "Event"],
    }),
    matchProjects: builder.mutation({
      query: (credentials) => ({
        url: "event/event/matchProjects",
        method: "POST",
        body: credentials,
      }),
    }),
    submitMatchedProjects: builder.mutation({
      query: (credentials) => ({
        url: "event/event/saveMatchedProjects",
        method: "POST",
        body: credentials,
      }),
    }),
    createDefenseData: builder.query({
      query: () => ({
        url: "/event/defense/create",
        method: "GET",
      }),
    }),
    getAdminProjectId: builder.query({
      query: (id) => ({
        url: `event/event/project/${id}`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
    getAdminDashboard: builder.query({
      query: () => ({
        url: "event/event/dashboard/",
        method: "GET",
      }),
      providesTags: ["Defenses", "Events"],
    }),
    getAllProjects: builder.query({
      query: () => ({
        url: "/event/event/projects",
        method: "GET",
      }),
    }),
    getAllStudents: builder.query({
      query: () => ({
        url: "/event/event/students",
        method: "GET",
      }),
    }),
    eventResult: builder.query({
      query: (id) => ({
        url: `/event/event/result/${id}`,
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
  useGetDefenseDetailQuery,
  useGetAllProjectsQuery,
  useGetAllStudentsQuery,
  useGetAllSupervisorsQuery,
  useMatchProjectsMutation,
  useSubmitMatchedProjectsMutation,
  useGetAdminProjectIdQuery,
  useGetAdminDashboardQuery,
  useEventResultQuery,
} = adminApiSlice;
