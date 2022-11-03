import { apiSlice } from "../app/apiSlice";
import { getSocket } from "./socket";
import { SocketEvents } from "./socketEvent";
import { store } from "../app/store";
import { setCurrentConversation } from "../features/chat/redux/chatSlice";
import { setIncomingNotifications } from "../features/sidebar/redux/sideBarSlice";

const socketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    connectSocket: builder.query({
      queryFn: () => ({ data }),
      async onCacheEntryAdded(
        arg,
        { dispatch, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getSocket();
          socket.on(SocketEvents.receiveMessage, (incoming) => {
            const { id } = store.getState().chat;
            if (incoming.from === id) {
              dispatch(
                setCurrentConversation({
                  message: incoming.message,
                  type: "received",
                })
              );
            } else {
              dispatch(setIncomingNotifications(incoming.from));
            }
          });
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useConnectSocketQuery } = socketApiSlice;
