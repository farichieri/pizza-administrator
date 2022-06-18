import React from "react";
import { useSelector } from "react-redux";
import "./actualOrders.scss";
const ActualOrders = () => {
  const actualOrders = useSelector((state) => state.actualOrders);
  console.log(actualOrders);
  return (
    <div className="actual-orders">
      <h1>Orders:</h1>
      {actualOrders &&
        actualOrders?.map((order) => (
          <div className="order" key={order.name}>
            <h3>Order: {order.name}</h3>
            <p>Start: {order.startTime}</p>
            <p>End: {order.endTime}</p>
          </div>
        ))}
    </div>
  );
};

export default ActualOrders;
