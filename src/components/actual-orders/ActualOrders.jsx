import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderReady } from "../../redux/actions";
import "./actualOrders.scss";
const ActualOrders = () => {
  const actualOrders = useSelector((state) => state.actualOrders);
  const dispatch = useDispatch();

  const handleReady = (order) => {
    dispatch(orderReady({ ...order, endDate: Date(Date.now()) }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("es-AR", { dateStyle: "full", timeStyle: "medium" });
  };

  return (
    <div className="actual-orders">
      <h1>Orders:</h1>
      {actualOrders &&
        actualOrders?.map((order) => (
          <div className="order" key={order.name}>
            <h3>Order: {order.name}</h3>
            <p>Start: {formatDate(order.startTime)}</p>
            <p>End: {formatDate(order.endDate)}</p>
            <button className="ready-button" onClick={() => handleReady(order)}>
              READY
            </button>
          </div>
        ))}
    </div>
  );
};

export default ActualOrders;
