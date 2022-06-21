import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { orderReady } from "../../../redux/actions";
import "./order.scss";

const Order = ({ order }) => {
  const dispatch = useDispatch();
  let time = new Date().toLocaleString();
  // let time = Date.now() - order.startTime;
  const [cTime, setTime] = useState(time);

  const handleReady = (order) => {
    dispatch(orderReady({ ...order, endDate: Date.now() }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("es-AR", { dateStyle: "full", timeStyle: "medium" });
  };

  const formatTime = (date) => {
    return new Date(date).getMinutes() + ":" + new Date(date).getSeconds();
  };

  useEffect(() => {
    setInterval(() => {
      setTime(time);
    }, 1000);
  });

  return (
    <div className="order">
      <h3>Order: {order.name}</h3>
      <p>Start: {formatDate(order.startTime)}</p>
      <p>End: {order.endDate ? formatDate(order.endDate) : "Prepairing"}</p>
      {order.endDate ? (
        <p>Time: {formatTime(order.endDate - order.startTime)}</p>
      ) : (
        <p>Time: {cTime}</p>
        // <p>Time: {formatTime(Date.now() - order.startTime)}</p>
      )}
      {!order.endDate && (
        <button className="ready-button" onClick={() => handleReady(order)}>
          READY
        </button>
      )}
    </div>
  );
};

export default Order;
