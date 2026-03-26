import React, { useState } from "react";
import { sendTrade } from "../api/websocket";

const TradeForm = ({ userId }) => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendTrade({ userId, symbol, quantity: Number(quantity), price: Number(price) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Symbol" />
      <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
      <button type="submit">Execute Trade</button>
    </form>
  );
};

export default TradeForm;