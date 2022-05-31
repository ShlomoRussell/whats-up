import React, { useState } from "react";
import Login from "./components/Login";
import { SocketProvider } from "./context/SocketProvider";
import { Routes, Route } from "react-router-dom";
import {  RequireAuth } from "./context/AuthContext";
import { ConversationsProvider } from "./context/ConversationsProvider";
import MessageInput from "./components/MessageInput";
import Register from "./components/Register";

function App() {
const [id,setId]=useState(null)
  return (
    <Routes>
      <Route path="/login" element={<Login onSubmitId={setId} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <SocketProvider id={id}>
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
