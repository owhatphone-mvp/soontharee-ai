import React, { useState } from "react";
import { Play, Pause, Disc, Radio, Music } from "lucide-react";

interface VintagePlayerProps {
  audioUrl: string | null;
  title: string;
  lyrics: string;
  recipientName: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  audioProgress: number;
  audioDuration: number;
  onSeek: (val: number) => void;
}

export const VintagePlayer: React.FC<VintagePlayerProps> = ({
  audioUrl,
  title,
  lyrics,
  recipientName,
  isPlaying,
  onTogglePlay,
  audioProgress,
  audioDuration,
  onSeek,
}) => {
  const [skin, setSkin] = useState<"vinyl" | "cassette" | "radio">("cassette");

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="vintage-player-container">
      {/* Skin Selection Tabs */}
      <div className="skin-selector">
        <button 
          className={`skin-btn ${skin === "vinyl" ? "active" : ""}`}
          onClick={() => setSkin("vinyl")}
          style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
        >
          <Disc size={16} />
          แผ่นเสียงทองคำ
        </button>
        <button 
          className={`skin-btn ${skin === "cassette" ? "active" : ""}`}
          onClick={() => setSkin("cassette")}
          style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
        >
          <Music size={16} />
          เทปคาสเซ็ทวินเทจ
        </button>
        <button 
          className={`skin-btn ${skin === "radio" ? "active" : ""}`}
          onClick={() => setSkin("radio")}
          style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
        >
          <Radio size={16} />
          วิทยุโบราณสุนทรีย์
        </button>
      </div>

      {/* Viewport showing the active vintage skin */}
      <div className="active-skin-view">
        {/* Skin 1: Vinyl Record */}
        {skin === "vinyl" && (
          <div className={`vinyl-skin ${isPlaying ? "spinning" : ""}`}>
            <div className="vinyl-label">
              <span className="vinyl-label-text" style={{ fontSize: "0.55rem", color: "#000", fontWeight: "bold" }}>
                Soontharee AI
              </span>
              <div className="vinyl-center-hole"></div>
              <span className="vinyl-label-text" style={{ fontSize: "0.5rem", color: "#1e293b", marginTop: "3px" }}>
                {recipientName || "แด่คุณ"}
              </span>
            </div>
          </div>
        )}

        {/* Skin 2: Cassette Tape */}
        {skin === "cassette" && (
          <div className="cassette-skin">
            {/* Top screws */}
            <div className="cassette-screw screw-tl"></div>
            <div className="cassette-screw screw-tr"></div>
            <div className="cassette-screw screw-bl"></div>
            <div className="cassette-screw screw-br"></div>

            {/* Main Sticker Label */}
            <div className="cassette-label-band">
              <div className="cassette-handwritten-title">
                {recipientName ? `มอบแด่... ${recipientName}` : title || "เพลงแสนรักสุนทรีย์"}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.55rem", color: "#475569", fontWeight: "bold", borderTop: "1px solid #cbd5e1", paddingTop: "2px" }}>
                <span>SIDE A</span>
                <span>Soontharee AI • 2026</span>
              </div>
            </div>

            {/* Clear window showing reels */}
            <div className="cassette-reels-window">
              <div className={`cassette-reel ${isPlaying ? "rotating" : ""}`}>
                <div className="cassette-reel-inner"></div>
              </div>
              <div className={`cassette-reel ${isPlaying ? "rotating" : ""}`}>
                <div className="cassette-reel-inner"></div>
              </div>
            </div>

            {/* Bottom Trapezoid Guard */}
            <div className="cassette-bottom-trapezoid"></div>
          </div>
        )}

        {/* Skin 3: Vintage Radio */}
        {skin === "radio" && (
          <div className="radio-skin">
            <div className="radio-speaker-grill"></div>
            
            <div className="radio-dial-panel">
              {/* Dial Screen that glows orange/amber when playing */}
              <div className={`radio-tuning-screen ${isPlaying ? "glowing" : ""}`}>
                <div className="radio-frequencies">
                  <span>AM 530</span>
                  <span>700</span>
                  <span>1000</span>
                  <span>1600 KHz</span>
                </div>
                <div className={`radio-frequency-pointer ${isPlaying ? "tuning" : ""}`}></div>
              </div>

              {/* Volume and Tuning Knobs */}
              <div className="radio-knobs">
                <div className="radio-knob" style={{ transform: isPlaying ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.5s" }}>
                  <div className="radio-knob-indicator"></div>
                </div>
                <div className="radio-knob" style={{ transform: isPlaying ? "rotate(120deg)" : "rotate(30deg)", transition: "transform 1s" }}>
                  <div className="radio-knob-indicator"></div>
                </div>
              </div>

              <div className="radio-brand-logo">Soontharee</div>
            </div>
          </div>
        )}
      </div>

      {/* Main Dashboard Control */}
      <div className="player-dashboard">
        {audioUrl ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {/* Play/Pause Button + Time Bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button 
                className="play-large-btn" 
                onClick={onTogglePlay}
                style={{ width: "55px", height: "55px", flexShrink: 0 }}
              >
                {isPlaying ? <Pause size={24} fill="#000" /> : <Play size={24} fill="#000" style={{ marginLeft: "3px" }} />}
              </button>

              <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", fontWeight: "bold" }}>
                  <span style={{ color: "var(--primary)" }}>{title || "กำลังเล่นเพลง"}</span>
                  <span style={{ fontFamily: "var(--font-eng)" }}>
                    {formatTime(audioProgress)} / {formatTime(audioDuration)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={audioDuration || 100}
                  value={audioProgress}
                  onChange={(e) => onSeek(parseFloat(e.target.value))}
                  style={{
                    width: "100%",
                    accentColor: "var(--primary)",
                    cursor: "pointer",
                    height: "8px",
                    borderRadius: "4px"
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "0.5rem", color: "var(--text-muted)", fontSize: "1.1rem", fontWeight: "bold" }}>
            📻 กรุณาเลือกเปิดเพลงจาก "คลังเพลงของฉัน" ด้านข้าง หรือนำเข้าไฟล์เสียงค่ะ
          </div>
        )}
      </div>

      {/* Lyrics Box */}
      <div className="lyrics-drawer">
        {lyrics || "🎶 บรรเลงเพลงแห่งความอบอุ่นสุนทรีย์..."}
      </div>
    </div>
  );
};
