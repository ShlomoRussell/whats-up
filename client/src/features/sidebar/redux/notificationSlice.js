import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    setIncomingNotifications: (state, action) => {
      return [...state, action.payload];
    },
    removeNotification: (state, action) => {
      return state.filter((n) => n !== action.payload);
    },
  },
});

export const { setIncomingNotifications, removeNotification } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;

export const selectNotificationById = (state, id) =>
  state.notifications.filter((n) => n === id);
