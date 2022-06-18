import React from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/nav/Nav";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Nav />
      <Link to="/cashier">
        <button>Cashier</button>
      </Link>
      <Link to="/kitchen">
        <button>Kitchen</button>
      </Link>
    </div>
  );
};

export default Home;
