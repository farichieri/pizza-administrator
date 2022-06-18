import React from "react";
import "./cashier.scss";
import OrderCreate from "../../components/order-create/OrderCreate";
import Nav from "../../components/nav/Nav";

const Cashier = () => {
  return (
    <div className="cashier">
      <Nav />
      <OrderCreate />
    </div>
  );
};

export default Cashier;
