import React,{useEffect} from "react";
import Login from "./components/Login";
import { SocketProvider } from "./context/SocketProvider";
import { Routes, Route } from "react-router-dom";
import { RequireAuth, useAuth } from "./context/AuthContext";
import Register from "./components/Register";
import PageContainer from "./components/PageContainer";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const {user,setUser}=useAuth()
  const [id, setId] = useLocalStorage('token');
   useEffect(() => {
     if (id == null) return;
     fetch("http://localhost:5782/api/users/", {
       headers: { authorization: `Bearer ${id}` },
     })
       .then((res) => res.json())
       .then((jres) => setUser({ ...user, ...jres }));
   }, [id]);
  return (
    <Routes>
      <Route path="/login" element={<Login onSubmitId={setId} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <RequireAuth id={id}>
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
