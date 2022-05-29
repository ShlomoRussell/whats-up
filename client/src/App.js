import React from "react";
import Login from "./components/Login";
import { SocketProvider } from "./context/SocketProvider";
import { Routes, Route } from "react-router-dom";
import {  RequireAuth, useAuth } from "./context/AuthContext";
import Chat from "./components/Chat";

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <SocketProvider>
              <Chat />
            </SocketProvider>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
