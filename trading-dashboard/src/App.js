import React from "react";
import TradeChart from "./components/TradeChart";
import WalletStream from "./components/WalletStream";

function App() {
  return (
    <div className="App">
      <h1>Trading Dashboard</h1>
      <section>
      </section>
      <section>
        <h2>Trades Chart</h2>
        <TradeChart />
      </section>
    </div>
  );
}

export default App;