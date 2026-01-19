import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = ({ children, pageTitle, activePage }) => {
  return (
    <div>
      {/* Sidebar should be fixed via CSS */}
      <Sidebar activePage={activePage} />

      {/* Navbar should also be fixed */}
      <Navbar pageTitle={pageTitle} />

      {/* Main content */}
      <main
        style={{
          marginLeft: "260px", // width of sidebar
          marginTop: "64px",   // height of navbar
          padding: "20px",
          display: "flex",
          flexDirection: "row", // cards side by side
          flexWrap: "wrap",     // wrap if screen is small
          gap: "20px",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
