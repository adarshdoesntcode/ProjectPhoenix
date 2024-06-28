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
      providesTags: ["Project"],
    }),
    getEvents: builder.query({
      query: () => ({
        url: "/student/events",
        method: "GET",
      }),
      providesTags: ["AllEvents"],
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

    getProjectProgress: builder.query({
      query: (credentials) => ({
        url: `/student/progress-log/${credentials}`,
        method: "GET",
      }),
      providesTags: ["Progress"],
    }),
    createProgress: builder.mutation({
      query: (credentials) => ({
        url: `/student/progress-log/create`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Progress", "Project"],
    }),
    getArchive: builder.query({
      query: () => ({
        url: "/student/archive",
        method: "GET",
      }),
    }),
    getArchiveProject: builder.query({
      query: (credentials) => ({
        url: `/student/associatedProjects/${credentials}`,
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
      query: ({ file, userProject, submittedBy, submittedOn }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("submittedBy", submittedBy);
        formData.append("submittedOn", submittedOn);
        return {
          url: `/student/team/report/${userProject}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Project"],
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
  useGetArchiveQuery,
  useGetProjectProgressQuery,
  useCreateProgressMutation,
} = studentApiSlice;
