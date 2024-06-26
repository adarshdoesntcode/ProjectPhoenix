import { apiSlice } from "@/api/apiSlice";

export const supervisorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateSupervisor: builder.mutation({
      query: (credentials) => ({
        url: `/supervisor/supervisors/${credentials.id}`,
        method: "PUT",
        body: { ...credentials.data },
      }),
    }),
  }),
});

export const { useUpdateSupervisorMutation } = supervisorApiSlice;
