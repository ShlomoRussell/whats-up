import { apiSlice } from "../../../app/apiSlice";
import { setCurrentChat } from "./chatSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContact: builder.query({
      query: (contactId) => `users/contacts/${contactId}`,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentChat(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetContactQuery } = chatApiSlice;
