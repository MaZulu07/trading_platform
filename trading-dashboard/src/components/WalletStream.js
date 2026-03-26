import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WalletStream = () => {
  const [wallets, setWallets] = useState([]);

  // Fetch all existing wallets on mount
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/wallet/all"); // your backend URL
        const data = await res.json();
        setWallets(data);
      } catch (err) {
        console.error("Failed to fetch wallets:", err);
      }
    };
    fetchWallets();
  }, []);

  // Subscribe to WebSocket for live updates
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws"); // match your backend WS endpoint
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      client.subscribe("/topic/wallets", (message) => {
        const wallet = JSON.parse(message.body);

        setWallets((prev) => {
          const exists = prev.find((w) => w.id === wallet.id);
          if (exists) {
            // update existing wallet
            return prev.map((w) => (w.id === wallet.id ? wallet : w));
          } else {
            // add new wallet
            return [...prev, wallet];
          }
        });
      });
    };

    client.activate();

    return () => client.deactivate();
  }, []);

  return (
    <div>
      <h3>Wallets (Live)</h3>
      {wallets.length === 0 ? (
        <p>No wallets available.</p>
      ) : (
        <ul>
          {wallets.map((w) => (
            <li key={w.id}>
              <strong>{w.userId}</strong>: ${w.balance.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WalletStream;