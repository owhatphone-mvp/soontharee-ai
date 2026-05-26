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

      {/* Floating Music Notes */}
      <div className="music-notes-container">
        <div className="floating-note">🎵</div>
        <div className="floating-note">🎶</div>
        <div className="floating-note">🎼</div>
        <div className="floating-note">🎵</div>
      </div>

      {/* Header Bar */}
      <header className="app-header">
        <div className="brand" style={{ width: "100%", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div className="brand-icon">
              <Music size={24} strokeWidth={2.5} />
            </div>
            <div className="brand-name">
              Soontharee AI
              <span className="brand-subtitle">สุนทรีย์ AI • เพลงสั่งทำของขวัญความทรงจำผู้สูงอายุ</span>
            </div>
          </div>

          {/* Dancing Audio Equalizer */}
          <div className="audio-visualizer">
            <div className="visualizer-bar"></div>
            <div className="visualizer-bar"></div>
            <div className="visualizer-bar"></div>
            <div className="visualizer-bar"></div>
            <div className="visualizer-bar"></div>
          </div>
        </div>
      </header>

      {/* Main Container Frame */}
      <main className="main-content" style={{ display: "flex", flexDirection: "column", minHeight: 0, zIndex: 1 }}>
        <StepWizard
          onAddOrder={handleAddOrder}
        />
      </main>
    </div>
  );
}

export default App;
