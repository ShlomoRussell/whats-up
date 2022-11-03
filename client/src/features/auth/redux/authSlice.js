import { createSlice } from "@reduxjs/toolkit";

const authInitialState = () => ({
  id: null,
  email: null,
  username: null,
  image: null,
  isAdmin: false,
  contacts: [],
  token: JSON.parse(localStorage.getItem("what's-up")) || null,
});

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      return { ...state, ...action.payload };
    },
    logOut: (_state, _action) => {
      return authInitialState();
    },
  },
});

export const authMiddleware = (_store) => (next) => (action) => {
  if (authSlice.actions.setCredentials.match(action)) {
    localStorage.setItem("what's-up", JSON.stringify(action.payload.token));
  } else if (authSlice.actions.logOut.match(action)) {
    localStorage.removeItem("what's-up");
  }
  return next(action);
};

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const selectCurrentUserId = (state) => state.auth.id;
export const selectContacts = (state) => state.auth.contacts;
