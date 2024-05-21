import { apiSlice } from "@/api/apiSlice";

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTargetedEvent: builder.query({
      query: () => ({
        url: "/student/event",
        method: "GET",
      }),
    }),
    getProject: builder.query({
      query: (id) => ({
        url: `/student/project/${id}`,
        method: "GET",
      }),
    }),
    getEvents: builder.query({
      query: () => ({
        url: "/student/events",
        method: "GET",
      }),
    }),
    updateStudent: builder.mutation({
      query: (credentials) => ({
        url: `/student/students/${credentials.id}`,
        method: "PUT",
        body: { ...credentials.data },
      }),
    }),

    getSelectionStudents: builder.query({
      query: () => ({
        url: "/student/team/students",
        method: "GET",
      }),
    }),
    createProject: builder.mutation({
      query: (credentials) => ({
        url: `/student/team/create`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    submitReport: builder.mutation({
      query: (credentials) => ({
        url: `/student/team/report/${credentials.id}`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useUpdateStudentMutation,
  useGetEventsQuery,
  useGetTargetedEventQuery,
  useGetProjectQuery,
  useGetSelectionStudentsQuery,
  useCreateProjectMutation,
  useSubmitReportMutation,
} = studentApiSlice;
