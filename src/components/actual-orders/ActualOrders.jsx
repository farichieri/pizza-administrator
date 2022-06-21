import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./actualOrders.scss";
import Order from "./order/Order";

const ActualOrders = () => {
  const actualOrders = useSelector((state) => state.actualOrders);

  return (
    <div className="actual-orders">
      <h1>Orders:</h1>
      {actualOrders && actualOrders.map((order) => <Order order={order} key={order.name} />)}
    </div>
  );
};

export default ActualOrders;
