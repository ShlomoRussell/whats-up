import React, { useEffect } from "react";
import Login from "../features/auth/components/Login";
import { SocketProvider } from "../context/SocketProvider";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "../features/auth/services/RequireAuth";
import Register from "../features/auth/components/Register";
import PageContainer from "../components/PageContainer";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken } from "../features/auth/redux/authSlice";
import { authApiSlice } from "../features/auth/redux/authApiSlice";

function App() {
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token === null) return;
    dispatch(authApiSlice.endpoints.onRefresh.initiate());
  }, [token]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <RequireAuth token={token}>
            <SocketProvider>
              <PageContainer />
            </SocketProvider>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
