import { createSlice } from "@reduxjs/toolkit";

const chatInitialState = () => ({
  id: null,
  username: null,
  image: null,
  messages: [],
});

const chatSlice = createSlice({
  name: "chat",
  initialState: chatInitialState(),
  reducers: {
    setCurrentChat: (state, action) => {
      return action.payload;
    },
    setCurrentConversation: (state, action) => {
      return { ...state, messages: [...state.messages, action.payload] };
    },
  },
});

export const { setCurrentConversation, setCurrentChat } = chatSlice.actions;
export default chatSlice.reducer;

export const selectCurrentChat = (state) => state.chat;
export const selectCurrentContactId = (state) => state.chat.id;
export const selectCurrentConversation = (state) => state.chat.messages;
