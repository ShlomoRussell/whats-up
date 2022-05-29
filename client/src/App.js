import React from "react";
import Login from "./components/Login";
import { SocketProvider } from "./context/SocketProvider";
import {
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider, RequireAuth } from "./context/AuthContext";
import Messages from "./components/Messages";
import Home from "./components/Home";

function App() {
  return (
    <SocketProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/chat"
            element={
              <RequireAuth>
                <Messages />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </SocketProvider>
  );
}

export default App;
