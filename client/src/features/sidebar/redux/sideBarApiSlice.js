import { apiSlice } from "../../../app/apiSlice";
import { updateAuthKey } from "../../auth/redux/authSlice";

export const sideBarApislice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newChat: builder.query({
      query: (newChatUsername) => `/api/users/newChat/${newChatUsername}`,
    }),
    updateProfilePic: builder.mutation({
      query: (img) => ({
        url: "/api/users/img",
        method: "PUT",
        body: img,
      }),
    }),
    changePublicName: builder.mutation({
      query: (name) => ({
        url: "/api/users/name",
        method: "PUT",
        body: { name },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(updateAuthKey({ username: arg }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    changeAbout: builder.mutation({
      query: (about) => ({
        url: "/api/users/about",
        method: "PUT",
        body: { about },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(updateAuthKey({ about: arg }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useNewChatQuery,
  useUpdateProfilePicMutation,
  useChangeAboutMutation,
  useChangePublicNameMutation,
} = sideBarApislice;
