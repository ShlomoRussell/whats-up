import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authSlice, { authMiddleware } from "../features/auth/redux/authSlice";
import chatSlice from "../features/chat/redux/chatSlice";
import notificationsSlice from "../features/sidebar/redux/notificationSlice";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    chat: chatSlice,
    notifications: notificationsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, authMiddleware),
  devTools: true,
});

setupListeners(store.dispatch);
