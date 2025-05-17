import React from "react";
import useAuthFire from "../hooks/useAuthFire";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuthFire();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  console.log(user,loading, isAdmin, isAdminLoading)
  if (loading || isAdminLoading) {
    return <p className=" text-4xl">Loading</p>;
  }
  if (user && isAdmin=='yes') {
    return children;
  }
  return <Navigate to='/'  state={location?.pathname} replace />;
};

export default AdminRoutes;
