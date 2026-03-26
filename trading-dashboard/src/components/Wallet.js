import React, { useEffect, useState } from "react";
import { getWallet } from "../api/api";

const Wallet = ({ userId }) => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    getWallet(userId).then((res) => setWallet(res.data));
  }, [userId]);

  if (!wallet) return <div>Loading wallet...</div>;

  return (
    <div>
      <h3>Wallet for {wallet.userId}</h3>
      <p>Balance: {wallet.balance}</p>
    </div>
  );
};

export default Wallet;