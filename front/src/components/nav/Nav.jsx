import React from "react";
import "./nav.scss";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/kitchen">
        <button>Orders</button>
      </Link>
      <Link to="/cashier">
        <button>Create Order</button>
      </Link>
      <Link to="/admin">
        <button>Admin</button>
      </Link>
    </nav>
  );
};

export default Nav;
