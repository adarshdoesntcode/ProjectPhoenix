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
    getSupervisorAssignedProjectDetails: builder.query({
      query: (id) => ({
        url: `supervisor/project/${id}`,
        method: "GET",
      }),
      providesTags: ["AssignedProject"],
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
    verifyProgressLog: builder.mutation({
      query: (credentials) => ({
        url: `supervisor/supervisor/progress-log/verify/${credentials.id}`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["AssignedProject"],
    }),
    grantDefensePermission: builder.mutation({
      query: (credentials) => ({
        url: `supervisor/supervisor/progress-log/grant-approval/${credentials.id}`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["AssignedProject"],
    }),
  }),
});

export const {
  useUpdateSupervisorMutation,
  useGetSupervisorArchiveProjectsQuery,
  useGetSupervisorEventsQuery,
  useGetSupervisorAssignedProjectsQuery,
  useGetSupervisorAssignedProjectDetailsQuery,
  useVerifyProgressLogMutation,
  useGrantDefensePermissionMutation,
} = supervisorApiSlice;
