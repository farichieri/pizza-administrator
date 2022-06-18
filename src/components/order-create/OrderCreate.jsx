import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions";
import "./orderCreate.scss";

const Order = () => {
  const [orderInput, setOrderInput] = useState("");
  const dispatch = useDispatch();

  const handleNewOrderInput = (e) => {
    e.preventDefault();
    setOrderInput(e.target.value);
  };

  const handleNewOrderSubmit = () => {
    dispatch(createOrder({ name: orderInput, startTime: Date(Date.now()), endDate: "" }));
  };

  return (
    <div className="order-create">
      <h1>New order:</h1>
      <input onChange={handleNewOrderInput} type="text" />
      <button onClick={handleNewOrderSubmit}>Prepair</button>
    </div>
  );
};

export default Order;
