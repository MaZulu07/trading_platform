import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getAllTrades } from "../api";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TradeChart = () => {
  const [trades, setTrades] = useState([]);

  // Fetch initial trades
  useEffect(() => {
    const fetchTrades = async () => {
      const data = await getAllTrades();
      const parsedData = data.map(t => ({
        ...t,
        price: Number(t.price),
        quantity: Number(t.quantity)
      }));
      setTrades(parsedData);
    };
    fetchTrades();
  }, []);

  // Subscribe to WebSocket for live updates
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws"); // match your backend WS endpoint
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000
    });

    client.onConnect = () => {
      client.subscribe("/topic/trades", message => {
        const trade = JSON.parse(message.body);
        setTrades(prev => [
          ...prev,
          { ...trade, price: Number(trade.price), quantity: Number(trade.quantity) }
        ]);
      });
    };

    client.activate();
    return () => client.deactivate();
  }, []);

  // Prepare chart data
  const chartData = {
    labels: trades.map(t => new Date(t.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "Price",
        data: trades.map(t => t.price),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        yAxisID: "y1"
      },
      {
        label: "Quantity",
        data: trades.map(t => t.quantity),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        yAxisID: "y2"
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Live Trades Chart"
      }
    },
    scales: {
      y1: {
        type: "linear",
        display: true,
        position: "left",
        title: { display: true, text: "Price" }
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        title: { display: true, text: "Quantity" },
        grid: { drawOnChartArea: false }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default TradeChart;