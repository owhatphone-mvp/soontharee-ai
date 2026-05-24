import { useState } from "react";
import { Music } from "lucide-react";
import { StepWizard } from "./components/StepWizard";
import { type Order } from "./components/HistoryDashboard";

function App() {
  // App Order History state (kept in background localstorage)
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("elderly_music_orders");
    return saved ? JSON.parse(saved) : [];
  });

  const handleAddOrder = (newOrder: Order) => {
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem("elderly_music_orders", JSON.stringify(updated));
  };

  return (
    <div className="app-container">
      {/* Background radial glow */}
      <div className="bg-decorations"></div>

      {/* Header Bar */}
      <header className="app-header" style={{ justifyContent: "center" }}>
        <div className="brand" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
          <div className="brand-icon" style={{ margin: 0 }}>
            <Music size={28} strokeWidth={2.5} />
          </div>
          <div className="brand-name" style={{ textAlign: "center" }}>
            Soontharee AI
            <span className="brand-subtitle">สุนทรีย์ AI • เพลงสั่งทำของขวัญความทรงจำผู้สูงอายุ</span>
          </div>
        </div>
      </header>

      {/* Main Container Frame */}
      <main className="main-content" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 90px)" }}>
        <StepWizard
          onAddOrder={handleAddOrder}
        />
      </main>
    </div>
  );
}

export default App;
