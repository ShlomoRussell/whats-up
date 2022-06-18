import React, { createContext, useContext, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
let AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const signin = async (
    { username, password },
    onSubmitId,
    onSubmitToken,
    callback
  ) => {
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 201) {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
      }
      const jRes = await res.json();
      if (jRes.token) {
        onSubmitId(jRes.id);
        onSubmitToken(jRes.token);
        callback();
      }
    } catch (err) {
      return setAuthError(err.message);
    }
  };

  /*let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };*/
  const signup = async (newUser, onSubmitId, onSubmitToken, callback) => {
    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 201) {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
      }
      const jRes = await res.json();
      if (jRes.token) {
        onSubmitId(jRes.id);
        onSubmitToken(jRes.token);
        callback();
      }
    } catch (err) {
      return setAuthError(err.message);
    }
  };

  const value = {
    user,
    setUser,
    signup,
    signin,
    authError,
    //signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ token, children }) {
  let { user } = useAuth();
  let location = useLocation();

  if (token) return children;
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
