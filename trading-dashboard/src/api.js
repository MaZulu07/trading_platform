import axios from "axios";

export const getAllWallets = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/wallet/all");
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getAllTrades = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/trade/all");
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};