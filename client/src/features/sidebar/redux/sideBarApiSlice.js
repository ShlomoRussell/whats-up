import { apiSlice } from "../../../app/apiSlice";
import { updateAuthKey } from "../../auth/redux/authSlice";

export const sideBarApislice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newChat: builder.query({
      query: (newChatUsername) => `/api/users/newChat/${newChatUsername}`,
    }),
    uploadProfilePic: builder.mutation({
      query: ({ img, oldImgPath }) => ({
        url: `/api/users/img/${oldImgPath}`,
        method: "PUT",
        body: img,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { image },
          } = await queryFulfilled;
          dispatch(updateAuthKey({ image }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deleteProfilePic: builder.mutation({
      query: (oldImgPath) => ({
        url: "/api/users/img",
        method: "DELETE",
        body: { oldImgPath },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(updateAuthKey({ image: null }));
        } catch (error) {
          console.log(error);
        }
      },
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
  useUploadProfilePicMutation,
  useChangeAboutMutation,
  useChangePublicNameMutation,
  useDeleteProfilePicMutation,
} = sideBarApislice;
