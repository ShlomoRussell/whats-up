import { apiSlice } from "../../../app/apiSlice";

export const sideBarApislice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newChat: builder.query({
      query: (newChatUsername) => `/api/users/newChat/${newChatUsername}`,
    }),
  }),
});

export const { useNewChatQuery } = sideBarApislice;
