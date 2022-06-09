import React,{useEffect, useState} from "react";
import Login from "./components/Login";
import { SocketProvider } from "./context/SocketProvider";
import { Routes, Route } from "react-router-dom";
import { RequireAuth, useAuth } from "./context/AuthContext";
import Register from "./components/Register";
import PageContainer from "./components/PageContainer";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const { user, setUser } = useAuth()
  const [token, setToken] = useLocalStorage("token");
  const [id, setId] = useLocalStorage('id');

   useEffect(() => {
     if (token == null) return;
     fetch("http://localhost:5782/api/users/", {
       headers: { authorization: `Bearer ${token}` },
     })
       .then((res) => res.json())
       .then((jres) => setUser({ ...user, ...jres }));
   }, [token]);
  
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Login token={token} onSubmitId={setId} onSubmitToken={setToken} />
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <RequireAuth token={token}>
            <SocketProvider id={id}>
              <PageContainer />
            </SocketProvider>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
