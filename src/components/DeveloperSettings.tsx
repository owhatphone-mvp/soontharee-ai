import React, { useState } from "react";
import { Settings, Eye, EyeOff, ShieldCheck } from "lucide-react";

interface DeveloperSettingsProps {
  useMock: boolean;
  setUseMock: (value: boolean) => void;
  aiProvider: "elevenlabs" | "suno";
  setAiProvider: (value: "elevenlabs" | "suno") => void;
  elevenlabsApiKey: string;
  setElevenLabsApiKey: (value: string) => void;
  sunoApiBaseUrl: string;
  setSunoApiBaseUrl: (value: string) => void;
  sunoApiKey: string;
  setSunoApiKey: (value: string) => void;
}

export const DeveloperSettings: React.FC<DeveloperSettingsProps> = ({
  useMock,
  setUseMock,
  aiProvider,
  setAiProvider,
  elevenlabsApiKey,
  setElevenLabsApiKey,
  sunoApiBaseUrl,
  setSunoApiBaseUrl,
  sunoApiKey,
  setSunoApiKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [showSunoKey, setShowSunoKey] = useState(false);

  return (
    <>
      <button className="dev-settings-toggle" onClick={() => setIsOpen(!isOpen)}>
        <Settings size={18} />
        ตั้งค่าผู้พัฒนา ({useMock ? "โหมดทดสอบ" : `โหมดจริง - ${aiProvider === "suno" ? "Suno" : "ElevenLabs"}`})
      </button>

      {isOpen && (
        <div className="modal-overlay" style={{ zIndex: 99 }}>
          <div className="modal-content" style={{ maxWidth: "480px" }}>
            <h3 className="dev-panel-title">
              <Settings size={20} />
              แผงตั้งค่าการเชื่อมต่อ API (หลังบ้าน)
            </h3>
            
            <p className="ref-subtext" style={{ marginBottom: "1rem" }}>
              จำลองระบบที่คุณเป็นแอดมินหรือเจ้าของเว็บ เพื่อตั้งค่าหลังบ้านว่าจะต่อเข้า AI จริงหรือใช้ระบบจำลอง
            </p>

            <div className="form-group" style={{ marginBottom: "1rem" }}>
              <label>โหมดการทำงานของระบบ</label>
              <select 
                value={useMock ? "mock" : "real"} 
                onChange={(e) => setUseMock(e.target.value === "mock")}
                style={{ width: "100%" }}
              >
                <option value="mock">โหมดจำลองสถานการณ์ (จำลองการเจนเพลงด้วยไฟล์เพลงตัวอย่าง - ฟรี)</option>
                <option value="real">โหมดเชื่อมต่อ API จริง (เรียกใช้ AI ร้องเพลงจริง - มีค่าใช้จ่าย)</option>
              </select>
            </div>

            {!useMock && (
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label>เลือกผู้ให้บริการ AI (AI Music Provider)</label>
                <select 
                  value={aiProvider} 
                  onChange={(e) => setAiProvider(e.target.value as "elevenlabs" | "suno")}
                  style={{ width: "100%" }}
                >
                  <option value="elevenlabs">ElevenLabs Music API (เร็ว, เสียงไทยชัดที่สุด)</option>
                  <option value="suno">Suno API - Unofficial (ทำนองเพราะที่สุด, รองรับท่อนฮุคเป๊ะ)</option>
                </select>
              </div>
            )}

            {!useMock && aiProvider === "elevenlabs" && (
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label>ElevenLabs API Key</label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type={showToken ? "text" : "password"}
                    value={elevenlabsApiKey}
                    onChange={(e) => setElevenLabsApiKey(e.target.value)}
                    placeholder="ใส่ ElevenLabs API Key ของคุณที่นี่"
                    style={{ width: "100%", paddingRight: "3rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      background: "transparent",
                      border: "none",
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    {showToken ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <span className="help-text">
                  ต้องใช้เพื่อเรียกโมเดล ElevenLabs Music (ได้ API Key จาก elevenlabs.io)
                </span>
              </div>
            )}

            {!useMock && aiProvider === "suno" && (
              <>
                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <label>Suno API Base URL</label>
                  <input
                    type="text"
                    value={sunoApiBaseUrl}
                    onChange={(e) => setSunoApiBaseUrl(e.target.value)}
                    placeholder="http://localhost:3000 หรือ URL ของ API ผู้ให้บริการ"
                    style={{ width: "100%" }}
                  />
                  <span className="help-text" style={{ display: "block", marginTop: "0.25rem" }}>
                    • หากต้องการใช้ฟรี: รันโปรเจกต์ <strong><a href="https://github.com/gcui-art/suno-api" target="_blank" rel="noreferrer" style={{ color: "var(--primary)" }}>gcui-art/suno-api</a></strong> บนเครื่องคุณ แล้วกรอก <code>http://localhost:3000</code><br />
                    • หากต้องการแบบสำเร็จรูป: สมัครบริการ เช่น <strong>sunoapi.org</strong> หรือหาจาก <strong>RapidAPI</strong>
                  </span>
                </div>
                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <label>Suno API Key / Bearer Token (ถ้ามี)</label>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                      type={showSunoKey ? "text" : "password"}
                      value={sunoApiKey}
                      onChange={(e) => setSunoApiKey(e.target.value)}
                      placeholder="ใส่ Token หรือปล่อยว่างไว้ถ้ารันในเครื่องตัวเอง"
                      style={{ width: "100%", paddingRight: "3rem" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSunoKey(!showSunoKey)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        background: "transparent",
                        border: "none",
                        color: "var(--text-secondary)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      {showSunoKey ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <span className="help-text">
                    กรอก Token เพื่อยืนยันสิทธิ์กับผู้ให้บริการ API ภายนอก (หากรัน Suno API บนเครื่องตัวเองให้ปล่อยว่างไว้)
                  </span>
                </div>
              </>
            )}

            <div 
              style={{ 
                background: "var(--bg-tertiary)", 
                padding: "1rem", 
                borderRadius: "12px", 
                border: "1px solid var(--border)",
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-start"
              }}
            >
              <ShieldCheck size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                <strong>ระบบเติมเงินปลอดภัย:</strong> เมื่อเชื่อมระบบจริง ลูกค้าของคุณเติมเงินผ่านพร้อมเพย์ที่นี่ที่เดียว (คุณเป็นคนจ่ายค่า API ผ่านบัตรที่ผูกไว้เฉลี่ยเพลงละประมาณ 2-5 บาท ทำให้คุณทำธุรกิจกินส่วนต่างได้ทันที)
              </div>
            </div>

            <button 
              className="simulate-payment-btn" 
              style={{ background: "var(--primary)", color: "#000", marginTop: "1rem" }}
              onClick={() => setIsOpen(false)}
            >
              บันทึกและปิด
            </button>
          </div>
        </div>
      )}
    </>
  );
};
