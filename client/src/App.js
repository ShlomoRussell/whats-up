import React from "react";
import Login from "./components/Login";
import { SocketProvider } from "./context/SocketProvider";
import { Routes, Route } from "react-router-dom";
import {  RequireAuth, useAuth } from "./context/AuthContext";
import { ConversationsProvider } from "./context/ConversationsProvider";
import MessageInput from "./components/MessageInput";

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
              <ConversationsProvider>
                <MessageInput />
              </ConversationsProvider>
            </SocketProvider>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
