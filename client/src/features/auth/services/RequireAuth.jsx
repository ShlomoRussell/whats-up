import { useLocation, Navigate } from "react-router-dom";
import { selectCurrentToken } from "../redux/authSlice";
import { useSelector } from "react-redux";
import React from "react";

export function RequireAuth({ children }) {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}
