import { apiSlice } from "@/api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => ({
        url: "/event/events",
        method: "GET",
      }),
    }),
    createEvent: builder.mutation({
      query: (credentials) => ({
        url: "/event/create",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useGetAllEventsQuery, useCreateEventMutation } = adminApiSlice;
