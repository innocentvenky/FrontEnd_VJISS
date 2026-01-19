// src/pages/admin/AdminHome.jsx
import React from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import AdminDashboardCards from "./AdmDashboard";

const AdminHome = () => {
  return (
<>
<AdminLayout pageTitle="Dashboard" activePage="Dashboard">
  <AdminDashboardCards />
</AdminLayout>
</>
  );
};

export default AdminHome;
