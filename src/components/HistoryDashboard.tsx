import React, { useRef } from "react";
import { Play, FileAudio, Trash2, Clock, CheckCircle } from "lucide-react";
import { saveAudioBlob, getAudioBlob, deleteAudioBlob } from "../services/db";
import { speakText } from "../services/voiceService";

export interface Order {
  id: string;
  occasion: string;
  genre: string;
  tempo: string;
  relationship: string;
  nickname: string;
  lyrics: string;
  status: "composing" | "ready";
  timestamp: string;
}

interface HistoryDashboardProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  onPlaySong: (audioUrl: string, title: string, lyrics: string, recipientName: string) => void;
  activeOrderPlayingId: string | null;
}

export const HistoryDashboard: React.FC<HistoryDashboardProps> = ({
  orders,
  setOrders,
  onPlaySong,
  activeOrderPlayingId,
}) => {
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleTriggerFileInput = (orderId: string) => {
    fileInputRefs.current[orderId]?.click();
  };

  const handleFileChange = async (orderId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 1. Save file to IndexedDB
      await saveAudioBlob(orderId, file);

      // 2. Generate temporary URL for immediate play
      const audioUrl = URL.createObjectURL(file);

      // 3. Update status in orders list
      const updated = orders.map((o) => {
        if (o.id === orderId) {
          return { ...o, status: "ready" as const };
        }
        return o;
      });

      setOrders(updated);
      localStorage.setItem("elderly_music_orders", JSON.stringify(updated));

      speakText("นำเข้าไฟล์เพลงสำเร็จแล้วค่ะ พร้อมเปิดฟังแล้วค่ะ");

      // 4. Auto play the imported song
      const matched = updated.find((o) => o.id === orderId);
      if (matched) {
        onPlaySong(
          audioUrl,
          `เพลงสำหรับ${matched.relationship} (${matched.nickname})`,
          matched.lyrics,
          matched.nickname
        );
      }
    } catch (err) {
      console.error("Error importing file:", err);
      alert("ไม่สามารถนำเข้าไฟล์เพลงได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const handlePlayClick = async (order: Order) => {
    try {
      // Get the audio file blob from IndexedDB
      const blob = await getAudioBlob(order.id);
      if (!blob) {
        // If not found in IndexedDB, prompt to re-import
        speakText("ไม่พบไฟล์เพลงในเครื่องนี้ กรุณากดปุ่มนำเข้าไฟล์เพลงอีกครั้งค่ะ");
        alert("ไม่พบไฟล์เพลงในระบบเก็บไฟล์ของเบราว์เซอร์นี้ กรุณานำเข้าไฟล์เพลง MP3 อีกครั้งค่ะ");
        
        // Reset status back to composing
        const updated = orders.map((o) => {
          if (o.id === order.id) {
            return { ...o, status: "composing" as const };
          }
          return o;
        });
        setOrders(updated);
        localStorage.setItem("elderly_music_orders", JSON.stringify(updated));
        return;
      }

      const audioUrl = URL.createObjectURL(blob);
      onPlaySong(
        audioUrl,
        `เพลงสำหรับ${order.relationship} (${order.nickname})`,
        order.lyrics,
        order.nickname
      );
      speakText(`กำลังเล่นเพลงของ ${order.relationship} น้อง ${order.nickname} ค่ะ`);
    } catch (err) {
      console.error("Error playing historical song:", err);
    }
  };

  const handleDelete = async (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("คุณยายคุณตาต้องการลบเพลงนี้ออกจากคลังประวัติใช่ไหมคะ?")) return;

    try {
      // Remove from IndexedDB
      await deleteAudioBlob(orderId);

      // Remove from orders list
      const updated = orders.filter((o) => o.id !== orderId);
      setOrders(updated);
      localStorage.setItem("elderly_music_orders", JSON.stringify(updated));
      speakText("ลบเพลงออกจากคลังเรียบร้อยค่ะ");
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  return (
    <div className="history-container">
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2 className="step-title" style={{ fontSize: "1.8rem" }}>คลังวิทยุของฉัน</h2>
        <p className="step-subtitle" style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          เพลงที่คุณยายคุณตาเคยสั่งทำไว้ทั้งหมดเปิดฟังที่นี่ได้เลยค่ะ
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-placeholder">
          <div className="empty-icon">📻</div>
          <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>ยังไม่มีเพลงในคลังเลยค่ะ</p>
          <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", maxWidth: "400px" }}>
            คุณยายคุณตาสามารถกดสั่งทำเพลงชิ้นพิเศษได้ที่แท็บ <strong>"สร้างเพลงใหม่ 🪄"</strong> ด้านบนค่ะ
          </p>
        </div>
      ) : (
        <div className="history-scroll">
          {orders.map((order) => {
            const isPlaying = activeOrderPlayingId === order.id;

            return (
              <div 
                key={order.id} 
                className={`history-card ${isPlaying ? "selected" : ""}`}
                style={{
                  borderWidth: isPlaying ? "2px" : "1px",
                  borderColor: isPlaying ? "var(--primary)" : "var(--border)",
                }}
              >
                {/* Main Information */}
                <div className="history-main-info">
                  <div 
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      background: order.status === "ready" ? "var(--primary-light)" : "rgba(245, 158, 11, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: order.status === "ready" ? "var(--primary)" : "var(--text-muted)",
                      flexShrink: 0,
                    }}
                  >
                    {order.status === "ready" ? (
                      <CheckCircle size={22} color="var(--success)" />
                    ) : (
                      <Clock size={22} className="spinning-slow" style={{ animation: "spin 4s linear infinite" }} />
                    )}
                  </div>
                  
                  <div className="history-details">
                    <span className="history-title">
                      สำหรับ: {order.relationship} {order.nickname}
                    </span>
                    <span className="history-meta">
                      รหัส: <strong style={{ color: "var(--primary)" }}>{order.id}</strong> • โอกาส: {order.occasion} • ดนตรี: {order.genre} ({order.tempo})
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="history-actions">
                  {order.status === "composing" ? (
                    <div>
                      <button 
                        className="btn-acc" 
                        onClick={() => handleTriggerFileInput(order.id)}
                        style={{ 
                          background: "var(--primary)", 
                          color: "#000", 
                          borderColor: "var(--primary)",
                          padding: "0.4rem 1rem",
                          fontSize: "1rem" 
                        }}
                      >
                        <FileAudio size={16} style={{ marginRight: "4px" }} />
                        นำเข้าเพลงจาก LINE
                      </button>
                      <input 
                        type="file" 
                        accept="audio/mp3,audio/*"
                        ref={(el) => { fileInputRefs.current[order.id] = el; }}
                        style={{ display: "none" }}
                        onChange={(e) => handleFileChange(order.id, e)}
                      />
                    </div>
                  ) : (
                    <button 
                      className={`btn-acc ${isPlaying ? "active" : ""}`}
                      onClick={() => handlePlayClick(order)}
                      style={{ padding: "0.4rem 1rem", fontSize: "1rem" }}
                    >
                      <Play size={16} style={{ marginRight: "4px" }} />
                      เปิดฟังบนวิทยุ
                    </button>
                  )}

                  <button 
                    className="btn-acc" 
                    onClick={(e) => handleDelete(order.id, e)}
                    style={{ 
                      borderColor: "rgba(239, 68, 68, 0.3)", 
                      color: "var(--error)",
                      padding: "0.4rem" 
                    }}
                    title="ลบเพลง"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
