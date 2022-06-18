import React from "react";
import Auth from "../../components/auth/Auth";
import Nav from "../../components/nav/Nav";
import "./admin.scss";

const Admin = () => {
  return (
    <div className="admin">
      <Nav />
      <Auth />
    </div>
  );
};

export default Admin;
