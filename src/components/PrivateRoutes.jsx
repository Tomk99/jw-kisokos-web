import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
