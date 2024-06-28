import { apiSlice } from "@/api/apiSlice";

export const supervisorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupervisorArchiveProjects: builder.query({
      query: () => ({
        url: "supervisor/projects/archive",
        method: "GET",
      }),
    }),
    getSupervisorAssignedProjects: builder.query({
      query: () => ({
        url: "supervisor/projects/active",
        method: "GET",
      }),
    }),
    getSupervisorEvents: builder.query({
      query: () => ({
        url: "supervisor/events/active",
        method: "GET",
      }),
    }),

    updateSupervisor: builder.mutation({
      query: (credentials) => ({
        url: `supervisor/supervisors/${credentials.id}`,
        method: "PUT",
        body: { ...credentials.data },
      }),
    }),
  }),
});

export const {
  useUpdateSupervisorMutation,
  useGetSupervisorArchiveProjectsQuery,
  useGetSupervisorEventsQuery,
  useGetSupervisorAssignedProjectsQuery,
} = supervisorApiSlice;
