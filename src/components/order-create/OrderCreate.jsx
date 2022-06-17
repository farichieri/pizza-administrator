import React, { useEffect, useState } from "react";
import "./orderCreate.scss";

const Order = () => {
  const [orderInput, setOrderInput] = useState("");
  const [newOrder, setNewOrder] = useState("");

  const handleNewOrderInput = (e) => {
    e.preventDefault();
    setOrderInput(e.target.value);
  };

  const handleNewOrderSubmit = () => {
    setNewOrder(orderInput);
  };

  return (
    <div>
      <h1>New order:</h1>
      <input onChange={handleNewOrderInput} type="text" />
      <button onClick={handleNewOrderSubmit}>Prepair</button>
    </div>
  );
};

export default Order;
