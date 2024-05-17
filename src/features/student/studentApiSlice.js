import { apiSlice } from "@/api/apiSlice";

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useUpdateStudentMutation, useGetEventsQuery } = studentApiSlice;
