import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const TradeStream = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000
    });

    client.onConnect = () => {
      client.subscribe("/topic/trades", message => {
        const trade = JSON.parse(message.body);
        setTrades(prev => [...prev, trade]);
      });
    };

    client.activate();

    return () => client.deactivate();
  }, []);

  return (
    <div>
      <h3>Live Trades</h3>
      <ul>
        {trades.map((t, index) => (
          <li key={index}>{t.userId} - {t.symbol} - {t.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default TradeStream;