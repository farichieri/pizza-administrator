import React from "react";
import "./home.scss";
import OrderCreate from "../../components/order-create/OrderCreate";

const Home = () => {
  return (
    <div className="home">
      <OrderCreate />
    </div>
  );
};

export default Home;
