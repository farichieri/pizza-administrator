import React from "react";
import "./nav.scss";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <Link to="/kitchen">
        <button>Orders</button>
      </Link>
      <Link to="/cashier">
        <button>Create Order</button>
      </Link>
    </nav>
  );
};

export default Nav;
