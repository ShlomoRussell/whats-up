import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
let AuthContext = createContext(null);

export function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  let signin = async ({ username, password }, onSubmitId, callback) => {
    try {
      const res = await fetch("http://localhost:5782/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jRes = await res.json();
      if (jRes.token) {
        onSubmitId(jRes.token);
        callback();
      }
    } catch (err) {
      return console.log(err);
    }
  };

  /*let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };*/
  let signup = async (newUser, onSubmitId, callback) => {
    try {
      const res = await fetch("http://localhost:5782/auth/register", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jRes = await res.json();
      if (jRes.token) {
        onSubmitId(jRes.token);
        callback();
      }
    } catch (err) {
      return console.log(err);
    }
  };

  let value = {
    user,
    setUser,
    signup,
    signin,
    //signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ id, children }) {

  let { user, setUser } = useAuth();
  let location = useLocation();

  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
