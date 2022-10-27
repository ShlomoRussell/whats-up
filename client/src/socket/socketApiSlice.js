import { apiSlice } from "../app/apiSlice";
import { getSocket } from "./socket";
import { SocketEvents } from "./socketEvents.enum";

const socketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    connectSocket: builder.query({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        { dispatch, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getSocket();
          socket.on(SocketEvents.updateUsersVacations, () => {
            dispatch(setVacationIsUpdated(true));
          });
          socket.on(SocketEvents.followersUpdated, (id) => {
            const { refetch: refetchFollowers } = dispatch(
              usersVacationsApi.endpoints.getVacationFollowers.initiate(id)
            );
            const { refetch: refetchReports } = dispatch(
              reportApiSlice.endpoints.getReports.initiate(null)
            );
            refetchReports();
            refetchFollowers();
          });
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useConnectSocketQuery } = socketApiSlice;
