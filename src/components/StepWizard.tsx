import React, { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import type { Order } from "./HistoryDashboard";

interface StepWizardProps {
  onAddOrder: (order: Order) => void;
}

const OCCASIONS = [
  { name: "วันเกิด 🎂", desc: "มอบพรวันเกิดแด่คนสำคัญให้สุขใจ" },
  { name: "เกษียณอายุ 🎉", desc: "เฉลิมฉลองวันพักผ่อนอย่างมีความสุข" },
  { name: "ครบรอบ/ยินดี 🤝", desc: "วันครบรอบแต่งงาน หรือแสดงความยินดีความสำเร็จ" },
  { name: "ส่งสุขรายวัน ☀️", desc: "ส่งความรู้สึกดีๆ รายวัน เช่น สวัสดีวันจันทร์" }
];

const BLESSINGS_BY_OCCASION: { [key: string]: { name: string; desc: string }[] } = {
  "วันเกิด 🎂": [
    { name: "สุขภาพแข็งแรง 🍎", desc: "ขอให้ร่างกายแข็งแรง ไม่มีโรคภัยไข้เจ็บ" },
    { name: "ร่ำรวยเงินทอง 💰", desc: "ขอให้โชคลาภเงินทองไหลมาเทมามั่งคั่ง" },
    { name: "มีความสุขสมหวัง 😊", desc: "ขอให้ชีวิตราบรื่น มีแต่ความสุขสมปรารถนา" },
    { name: "อายุยืนหมื่นปี 🎂", desc: "ขอให้อายุมั่นขวัญยืน อยู่เป็นร่มโพธิ์ร่มไทร" }
  ],
  "เกษียณอายุ 🎉": [
    { name: "พักผ่อนแสนสบาย 🏖️", desc: "ขอให้มีความสุขกับการพักผ่อนและชีวิตอิสระ" },
    { name: "ท่องเที่ยวรอบโลก ✈️", desc: "ขอให้ได้เดินทางท่องเที่ยวตามใจปรารถนา" },
    { name: "สุขภาพแข็งแรง 🍏", desc: "ขอให้อายุยืน มีกำลังวังชาแข็งแรงดี" },
    { name: "ร่ำรวยมั่นคง 📈", desc: "ขอให้เงินทองงอกเงย มีกินมีใช้มั่นคงตลอดไป" }
  ],
  "ครบรอบ/ยินดี 🤝": [
    { name: "รักหวานยืนยาว ❤️", desc: "ขอให้รักกันหวานชื่น เคียงข้างกันจนแก่เฒ่า" },
    { name: "ก้าวหน้ารุ่งเรือง 🏆", desc: "ขอให้สำเร็จการงาน ยศตำแหน่งเจริญเติบโต" },
    { name: "ร่ำรวยมั่งคั่ง 💸", desc: "ขอให้ร่ำรวยค้าขายร่ำรวย ทรัพย์สินมหาศาล" },
    { name: "ครอบครัวแสนสุข 🏡", desc: "ขอให้ครอบครัวร่มเย็นรักใคร่สามัคคีกัน" }
  ],
  "ส่งสุขรายวัน ☀️": [
    { name: "สดใสรับอรุณ ☀️", desc: "ขอให้มีวันที่สดชื่นแจ่มใส มีพลังรับเช้าวันใหม่" },
    { name: "จิตใจสงบสุข 🧘", desc: "ขอให้พบความสงบ ร่มเย็น สบายกายสบายใจ" },
    { name: "การงานราบรื่น 💼", desc: "ขอให้หมดปัญหาอุปสรรค ทำสิ่งใดก็สำเร็จราบรื่น" },
    { name: "แคล้วคลาดปลอดภัย 🛡️", desc: "ขอให้คุณพระคุ้มครอง เดินทางปลอดภัยในทุกที่" }
  ]
};

const SPECIAL_DETAILS_BY_OCCASION: { [key: string]: { name: string; desc: string }[] } = {
  "วันเกิด 🎂": [
    { name: "เป่าเค้กฉลองวันเกิด 🎂", desc: "เน้นบรรยากาศเป่าเค้กวันเกิดและงานสังสรรค์อบอุ่น" },
    { name: "ของขวัญกล่องใหญ่ 🎁", desc: "เล่าถึงกล่องของขวัญและการเปิดของขวัญประทับใจ" },
    { name: "รอยยิ้มเสียงหัวเราะ 😊", desc: "เน้นบรรยากาศที่เปี่ยมไปด้วยรอยยิ้มแห่งความสุข" },
    { name: "เน้นกลอนอวยพรทั่วไป 🌟", desc: "ใช้คำร้องแนวสุนทรีย์อวยพรเรื่องทั่วไปแบบละมุนใจ" }
  ],
  "เกษียณอายุ 🎉": [
    { name: "ตื่นสายจิบกาแฟชิลๆ ☕", desc: "ชีวิตสุดสบายจิบชากาแฟอุ่นๆ ในเช้าวันใหม่" },
    { name: "ปลูกต้นไม้ทำสวนชิลงาม 🪴", desc: "กิจกรรมแสนเรียบง่ายดูแลดอกไม้และสวนหลังบ้าน" },
    { name: "เที่ยวพักผ่อนตามฝัน 🏖️", desc: "การออกเดินทางท่องเที่ยวธรรมชาติรับชีวิตอิสระ" },
    { name: "เน้นกลอนอวยพรทั่วไป 🌟", desc: "ใช้คำร้องแนวสุนทรีย์อวยพรเรื่องทั่วไปแบบละมุนใจ" }
  ],
  "ครบรอบ/ยินดี 🤝": [
    { name: "ดินเนอร์หรูแสนหวาน 🍷", desc: "ร่วมรับประทานอาหารฉลองและดื่มด่ำช่วงเวลาสำคัญ" },
    { name: "กุมมือเคียงข้างรักนิรันดร์ 👩‍❤️‍👨", desc: "ความรักที่หนักแน่นเคียงคู่กันไปจนแก่เฒ่า" },
    { name: "ความสำเร็จน่าภาคภูมิใจ 🏆", desc: "ยินดีในเกียรติยศ ถ้วยรางวัล และความเพียรที่บรรลุ" },
    { name: "เน้นกลอนอวยพรทั่วไป 🌟", desc: "ใช้คำร้องแนวสุนทรีย์อวยพรเรื่องทั่วไปแบบละมุนใจ" }
  ],
  "ส่งสุขรายวัน ☀️": [
    { name: "แสงแดดเช้าแสนสดชื่น 🌅", desc: "ต้อนรับลมหนาวและรับแสงเช้าวันใหม่ด้วยความหวัง" },
    { name: "จิบน้ำชาคุยสัพเพเหระ 🍵", desc: "นั่งล้อมวงคุยจิบชากับเพื่อนพ้อง/ครอบครัวอบอุ่น" },
    { name: "ฟังธรรมะสงบใจร่มเย็น 🧘", desc: "บ่มเพาะสติและสมาธิให้จิตใจผ่องแผ้วไร้ทุกข์โศก" },
    { name: "เน้นกลอนอวยพรทั่วไป 🌟", desc: "ใช้คำร้องแนวสุนทรีย์อวยพรเรื่องทั่วไปแบบละมุนใจ" }
  ]
};

const GENRES = [
  { name: "ลูกทุ่ง 🌾", desc: "ทำนองเพลงไทยพื้นบ้าน ดนตรีสนุกจริงใจ" },
  { name: "ลูกกรุง 🎻", desc: "บรรเลงออเคสตร้าหวานซึ้ง นุ่มนวลสุดไพเราะ" },
  { name: "สุนทราภรณ์ 🎷", desc: "จังหวะสวิงบิ๊กแบนด์ลีลาศ ย้อนยุคสุดคลาสสิก" },
  { name: "เพื่อชีวิต 🎸", desc: "กีตาร์โปร่งอบอุ่น เนื้อหากระชับสู้ชีวิตอบอุ่น" }
];

const TEMPOS = [
  { name: "ช้า ซึ้งใจ 🐢", desc: "จังหวะช้าๆ ไพเราะ หวานซึ้ง อบอุ่นน้ำตาซึม" },
  { name: "เร็ว สนุกสนาน 🐇", desc: "จังหวะเร็ว โจ๊ะๆ สนุกสนาน โยกย้ายโยกตามเพลิน" }
];

const RELATIONSHIPS = [
  { name: "หลานรัก 👶", key: "grandchildren", desc: "ส่งความเอ็นดูอวยพรหลานๆ" },
  { name: "ลูกรัก 👦", key: "children", desc: "ส่งความห่วงใยให้ลูกรัก" },
  { name: "พี่น้อง 🧑‍🤝‍🧑", key: "siblings", desc: "มอบความปรารถนาดีให้พี่น้อง" },
  { name: "เพื่อนรัก 🤝", key: "friends", desc: "ส่งความอบอุ่นให้เพื่อนยาก" },
  { name: "คู่ชีวิต 💖", key: "spouse", desc: "บอกความในใจให้คู่ชีวิต" }
];

const NICKNAMES_BY_GROUP: { [key: string]: string[] } = {
  grandchildren: ["บอย", "กอล์ฟ", "เปิ้ล", "โบว์", "นิว", "เจี๊ยบ", "ตูน", "แอปเปิ้ล", "บี", "ปุ้ย", "ฝน", "โอ๊ต"],
  children: ["เล็ก", "แดง", "ป้อม", "หน่อย", "หนึ่ง", "โต้ง", "ต้น", "ไก่", "บอล", "แป้ง", "หนุ่ม", "หญิง"],
  siblings: ["สมศรี", "เปี๊ยก", "อ้อย", "หมวย", "ติ๋ม", "อ๊อด", "แอ๊ด", "ตุ๊ก", "ดำ", "ปิ๋ว", "อุ่น", "สมศักดิ์"],
  friends: ["สมศรี", "เปี๊ยก", "อ้อย", "หมวย", "ติ๋ม", "อ๊อด", "แอ๊ด", "ตุ๊ก", "ดำ", "ปิ๋ว", "อุ่น", "สมศักดิ์"],
  spouse: ["คุณพี่", "คุณน้อง", "เธอ", "คนดี", "สมศรี", "สมศักดิ์", "อ้อย", "อ๊อด", "ติ๋ม", "เปี๊ยก", "หมวย", "ตุ๊ก"]
};

export const StepWizard: React.FC<StepWizardProps> = ({ onAddOrder }) => {
  const [step, setStep] = useState(1);
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [selectedBlessings, setSelectedBlessings] = useState<string[]>([]);
  const [selectedSpecialDetail, setSelectedSpecialDetail] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedTempo, setSelectedTempo] = useState("");
  
  // Relationship & Nickname Selection
  const [selectedRel, setSelectedRel] = useState<{ name: string; key: string } | null>(null);
  const [selectedNickname, setSelectedNickname] = useState("");

  // Additional Information (Optional Typing)
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Order Details (Generated once Step 8 is completed)
  const [orderId, setOrderId] = useState("");
  const [generatedLyrics, setGeneratedLyrics] = useState("");
  const [copied, setCopied] = useState(false);

  // Dynamic Options based on Occasion
  const currentBlessings = BLESSINGS_BY_OCCASION[selectedOccasion] || [];
  const currentSpecialDetails = SPECIAL_DETAILS_BY_OCCASION[selectedOccasion] || [];

  const handleSelectOccasion = (name: string) => {
    setSelectedOccasion(name);
    setSelectedBlessings([]); // Reset
    setSelectedSpecialDetail(""); // Reset
    setStep(2);
  };

  const handleToggleBlessing = (name: string) => {
    let nextBlessings: string[];
    if (selectedBlessings.includes(name)) {
      nextBlessings = selectedBlessings.filter((b) => b !== name);
    } else {
      nextBlessings = [...selectedBlessings, name];
    }
    setSelectedBlessings(nextBlessings);
  };

  const handleSelectSpecialDetail = (name: string) => {
    setSelectedSpecialDetail(name);
    setStep(4);
  };

  const handleSelectGenre = (name: string) => {
    setSelectedGenre(name);
    setStep(5);
  };

  const handleSelectTempo = (name: string) => {
    setSelectedTempo(name);
    setStep(6);
  };

  const handleSelectRel = (rel: typeof RELATIONSHIPS[0]) => {
    setSelectedRel(rel);
    setSelectedNickname(""); // Reset
    setStep(7);
  };

  const handleSelectNickname = (nickname: string) => {
    setSelectedNickname(nickname);
    setStep(8);
  };

  const handleProceedToSummary = (infoText: string) => {
    setAdditionalInfo(infoText);
    
    // Generate Order ID & Custom lyrics for preview
    const randId = `ST-${Math.floor(100 + Math.random() * 900)}`;
    setOrderId(randId);
    
    // Format blessings with Thai grammar
    const blessingsList = selectedBlessings.map(b => b.replace(/[\u1F600-\u1F64F\u1F300-\u1F5FF\u1F680-\u1F6FF\u2600-\u26FF\u2700-\u27BF]/g, "").trim());
    let blessingPhrase = "";
    if (blessingsList.length === 1) {
      blessingPhrase = blessingsList[0];
    } else if (blessingsList.length > 1) {
      blessingPhrase = blessingsList.slice(0, -1).join(", ") + " และ" + blessingsList[blessingsList.length - 1];
    } else {
      blessingPhrase = "มีความสุขสมหวัง";
    }

    const occasionClean = selectedOccasion.replace(/[\u1F600-\u1F64F\u1F300-\u1F5FF\u1F680-\u1F6FF\u2600-\u26FF\u2700-\u27BF]/g, "").trim();
    const name = selectedNickname === "พูดชื่อเล่นเองใน LINE 🎙️" ? "คุณคนพิเศษ" : selectedNickname;
    
    let specialLine = "";
    if (selectedSpecialDetail && !selectedSpecialDetail.includes("เน้นกลอนอวยพรทั่วไป")) {
      const cleanDetail = selectedSpecialDetail.replace(/[\u1F600-\u1F64F\u1F300-\u1F5FF\u1F680-\u1F6FF\u2600-\u26FF\u2700-\u27BF]/g, "").trim();
      specialLine = `ร่วมเสกสรรสร้าง ${cleanDetail} สุขใจ\n`;
    }

    let infoLine = "";
    if (infoText.trim()) {
      infoLine = `ฝากความรักกล่อมเกลาแห่ง ${infoText.trim()} ร่วมทวี\n`;
    }

    const lyricsString = `[ท่อนอวยพรพิเศษ]
ส่งท่วงทำนองบรรเลง กล่อมจิตดวงใจ
เนื่องในโอกาส${occasionClean}อันแสนอบอุ่น
${specialLine}${infoLine}ขอมอบเพลงสุนทรีย์นี้ ให้เป็นของขวัญชีวัน
แด่ ${name} ผู้เป็นที่รักยิ่ง

[ท่อนสร้อยพรรณนา]
ขอคุณพระรัตนตรัยดลพรประเสริฐเลิศล้ำ
ให้ท่าน${blessingPhrase} สมหวังทุกๆ ประการ
โรคภัยไข้เจ็บมลายสิ้น มีสุขเกษมสำราญ
ยิ้มแย้มเบิกบาน กายใจผ่องใสเอย

[ท่อนฮุคสุนทรีย์]
โอ้ ${name} ที่รัก จงโชคดี
ความสุขทวี ก้าวหน้าปลอดภัยทุกวัน
Soontharee AI บรรจงเขียนดนตรีรักผูกพัน
มอบความรักชั่วนิรันดร์ ตลอดปีเทอญ`;
    
    setGeneratedLyrics(lyricsString);
    setStep(9);
  };

  const getSummaryText = () => {
    const blessingsLabel = selectedBlessings.join(", ");
    const specialLabel = selectedSpecialDetail || "ทั่วไป";
    const nicknameLabel = selectedNickname === "พูดชื่อเล่นเองใน LINE 🎙️" ? "🎙️ อัดเสียงพูดชื่อใน LINE" : selectedNickname;
    return `🎵 สั่งแต่งเพลงสุนทรีย์ AI 🎵
รหัสใบสั่งทำ: ${orderId}
โอกาสพิเศษ: ${selectedOccasion}
คำอวยพรที่เลือก: ${blessingsLabel}
เรื่องราวพิเศษในเพลง: ${specialLabel}
แนวเพลง: ${selectedGenre}
จังหวะเพลง: ${selectedTempo}
ความสัมพันธ์: ${selectedRel?.name}
ชื่อเล่นผู้รับ: ${nicknameLabel}
ข้อมูลเพิ่มเติม: ${additionalInfo.trim() || "ไม่มี"}`;
  };

  const handleCopySummary = () => {
    const text = getSummaryText();
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(e => {
        console.log("Clipboard block", e);
      });
  };

  const handleFinishAndSave = () => {
    // Create Order object to add to list
    const newOrder: Order = {
      id: orderId,
      occasion: selectedOccasion,
      genre: selectedGenre,
      tempo: selectedTempo,
      relationship: selectedRel?.name || "",
      nickname: selectedNickname === "พูดชื่อเล่นเองใน LINE 🎙️" ? "🎙️ พูดชื่อเล่นใน LINE" : selectedNickname,
      lyrics: generatedLyrics,
      status: "composing",
      timestamp: new Date().toLocaleDateString("th-TH"),
    };
    onAddOrder(newOrder);

    // Proceed to LINE screen directly (Step 10)
    setStep(10);
  };

  const handleSubmitToLine = () => {
    const text = getSummaryText();
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log("Clipboard write success");
      })
      .catch(e => console.log("Clipboard block", e));

    const lineUrl = `https://line.me/R/ti/p/@909tiufg`;
    window.open(lineUrl, "_blank");
  };

  const handleReset = () => {
    setStep(1);
    setSelectedOccasion("");
    setSelectedBlessings([]);
    setSelectedSpecialDetail("");
    setSelectedGenre("");
    setSelectedTempo("");
    setSelectedRel(null);
    setSelectedNickname("");
    setAdditionalInfo("");
    setOrderId("");
    setGeneratedLyrics("");
    setCopied(false);
  };

  return (
    <div className="wizard-card">
      {/* Stepper Progress Bar (Step 1 to 8) */}
      {step <= 8 && (
        <div className="wizard-progress">
          <div className="progress-line"></div>
          <div 
            className="progress-line-active" 
            style={{ width: `${((step - 1) / 7) * 100}%` }}
          ></div>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <div 
              key={s} 
              className={`progress-step ${step === s ? "active" : ""} ${step > s ? "completed" : ""}`}
            >
              {step > s ? <Check size={12} /> : s}
            </div>
          ))}
        </div>
      )}

      <div className="step-container">
        {/* STEP 1: Occasion */}
        {step === 1 && (
          <>
            <div className="step-header">
              <h2 className="step-title">เลือกโอกาสพิเศษ 🎂</h2>
              <p className="step-subtitle">เพลงชิ้นเอกเพื่อคนที่คุณรักชิ้นนี้ จะแต่งขึ้นเนื่องในวันสำคัญใดดีครับ?</p>
            </div>
            <div className="options-grid">
              {OCCASIONS.map((o) => (
                <div 
                  key={o.name}
                  className={`option-card ${selectedOccasion === o.name ? "selected" : ""}`}
                  onClick={() => handleSelectOccasion(o.name)}
                >
                  <h3 className="option-title">{o.name}</h3>
                  <p className="option-description">{o.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* STEP 2: Occasion-specific dynamic blessings */}
        {step === 2 && (
          <>
            <div className="step-header">
              <h2 className="step-title">อวยพรเรื่องอะไรเพิ่มดีครับ? 🍎</h2>
              <p className="step-subtitle">แนะนำคำถามย่อยตามธีม: จิ้มเลือกได้มากกว่าหนึ่งคำ แล้วกดถัดไปค่ะ</p>
            </div>
            <div className="options-grid">
              {currentBlessings.map((b) => {
                const isSelected = selectedBlessings.includes(b.name);
                return (
                  <div 
                    key={b.name}
                    className={`option-card ${isSelected ? "selected" : ""}`}
                    onClick={() => handleToggleBlessing(b.name)}
                  >
                    <h3 className="option-title">{b.name}</h3>
                    <p className="option-description">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* STEP 3 [NEW]: Occasion-specific dynamic special detail */}
        {step === 3 && (
          <>
            <div className="step-header">
              <h2 className="step-title">อยากใส่เรื่องราวพิเศษอะไรในเพลงไหมคะ? 🌟</h2>
              <p className="step-subtitle">จิ้มเรื่องที่คุณชื่นชอบเพื่อนำไปแต่งเป็นคำร้องส่วนตัวได้เลยค่ะ</p>
            </div>
            <div className="options-grid">
              {currentSpecialDetails.map((s) => (
                <div 
                  key={s.name}
                  className={`option-card ${selectedSpecialDetail === s.name ? "selected" : ""}`}
                  onClick={() => handleSelectSpecialDetail(s.name)}
                >
                  <h3 className="option-title">{s.name}</h3>
                  <p className="option-description">{s.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* STEP 4: Genre Style */}
        {step === 4 && (
          <>
            <div className="step-header">
              <h2 className="step-title">เลือกแนวเพลงที่ชอบ 🌾</h2>
              <p className="step-subtitle">คุณตาคุณยายชอบฟังทำนองเสียงเพลงและดนตรีแนวไหนดีครับ?</p>
            </div>
            <div className="options-grid">
              {GENRES.map((g) => (
                <div 
                  key={g.name}
                  className={`option-card ${selectedGenre === g.name ? "selected" : ""}`}
                  onClick={() => handleSelectGenre(g.name)}
                >
                  <h3 className="option-title">{g.name}</h3>
                  <p className="option-description">{g.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* STEP 5: Tempo */}
        {step === 5 && (
          <>
            <div className="step-header">
              <h2 className="step-title">เลือกจังหวะอารมณ์ 🐢</h2>
              <p className="step-subtitle">ชอบทำนองเพลงฟังสบายซึ้งใจ หรือ เร็วโจ๊ะๆ ขยับเต้นสนุกสนานดีครับ?</p>
            </div>
            <div className="options-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {TEMPOS.map((t) => (
                <div 
                  key={t.name}
                  className={`option-card ${selectedTempo === t.name ? "selected" : ""}`}
                  onClick={() => handleSelectTempo(t.name)}
                  style={{ padding: "2.5rem 1rem" }}
                >
                  <h3 className="option-title" style={{ fontSize: "1.7rem" }}>{t.name}</h3>
                  <p className="option-description">{t.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* STEP 6: Relationship */}
        {step === 6 && (
          <>
            <div className="step-header">
              <h2 className="step-title">เพลงนี้จะมอบให้ใครครับ? 👶</h2>
              <p className="step-subtitle">จิ้มระบุกลุ่มความสัมพันธ์ เพื่อประกอบกลอนคำร้องให้จับใจ</p>
            </div>
            <div className="options-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {RELATIONSHIPS.map((r) => (
                <div 
                  key={r.name}
                  className="option-card"
                  onClick={() => handleSelectRel(r)}
                  style={{ padding: "1.25rem 0.5rem" }}
                >
                  <h3 className="option-title" style={{ fontSize: "1.35rem" }}>{r.name}</h3>
                  <p className="option-description">{r.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* STEP 7: Nicknames Dynamic Grid */}
        {step === 7 && selectedRel && (
          <>
            <div className="step-header">
              <h2 className="step-title">ชื่อเล่นของ {selectedRel.name} คืออะไรคะ? 🎙️</h2>
              <p className="step-subtitle">จิ้มเลือกชื่อของเขา หรือแต็ปปุ่มเสียงไมโครโฟนเพื่อส่งเสียงในแชตไลน์ค่ะ</p>
            </div>
            <div className="nicknames-grid">
              {NICKNAMES_BY_GROUP[selectedRel.key]?.map((name) => (
                <div 
                  key={name}
                  className="nickname-card"
                  onClick={() => handleSelectNickname(name)}
                >
                  {name}
                </div>
              ))}
              <div 
                className="nickname-card special-mic"
                onClick={() => handleSelectNickname("พูดชื่อเล่นเองใน LINE 🎙️")}
                style={{ gridColumn: "span 2", fontWeight: "bold" }}
              >
                พูดชื่ออื่นผ่านไลน์ 🎙️
              </div>
            </div>
          </>
        )}

        {/* STEP 8 [NEW]: Additional Info */}
        {step === 8 && (
          <div className="step-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1rem", height: "100%", justifyContent: "space-between" }}>
            <div className="step-header">
              <h2 className="step-title">อยากใส่เรื่องราวอื่นๆ เพิ่มเติมไหมคะ? ✍️</h2>
              <p className="step-subtitle">เช่น ชื่อรุ่นโรงเรียน/มหาวิทยาลัย ชื่อก๊วนกอล์ฟ หรือความทรงจำที่อยากให้แต่งเพิ่มเติมค่ะ (หากไม่มีให้แตะข้ามได้เลยค่ะ)</p>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", maxWidth: "600px", margin: "0 auto", gap: "1.25rem" }}>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="พิมพ์รายละเอียดเพิ่มเติม เช่น รุ่นสิงห์แดง, ก๊วนกอล์ฟ 8 เซียน, เพื่อนร่วมรุ่น 2515, ชอบขี่จักรยาน..."
                className="elder-textarea"
                rows={4}
              />
              
              {/* Giant No additional info button */}
              <button 
                className="btn-line-submit-huge" 
                style={{ background: "var(--bg-secondary)", border: "2px solid var(--primary)", color: "var(--primary)", boxShadow: "none" }}
                onClick={() => handleProceedToSummary("")}
              >
                ไม่มีเพิ่มเติมแล้ว ข้อมูลเท่านี้พอแล้วค่ะ 👍
              </button>
            </div>

            <div className="wizard-footer" style={{ borderTop: "none" }}>
              <button className="btn-elder btn-elder-back" onClick={() => setStep(7)}>
                <ArrowLeft size={18} /> ย้อนกลับ
              </button>
              
              <button 
                className="btn-elder btn-elder-next"
                disabled={!additionalInfo.trim()}
                onClick={() => handleProceedToSummary(additionalInfo)}
              >
                บันทึกและไปต่อ ➡️
              </button>
            </div>
          </div>
        )}

        {/* STEP 9: Clean Receipt Summary Ticket */}
        {step === 9 && (
          <div className="step-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1rem", height: "100%", justifyContent: "space-between" }}>
            <div className="step-header">
              <h2 className="step-title" style={{ color: "var(--primary)" }}>ใบสรุปข้อมูลเพลงสั่งทำ 🎁</h2>
              <p className="step-subtitle" style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#fbbf24" }}>
                👉 กรุณากดปุ่มสีเหลืองด้านล่างเพื่อคัดลอกข้อมูล และแคปรูปหน้าจอนี้เก็บไว้ค่ะ
              </p>
            </div>

            <div className="receipt-single-column">
              <div className="receipt-ticket-premium">
                <div className="ticket-header-premium">
                  <span className="ticket-logo-premium">Soontharee AI</span>
                  <div style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: "bold", marginTop: "0.2rem" }}>
                    ใบสรุปข้อมูลเพลงสั่งทำพิเศษพรีเมียม
                  </div>
                </div>

                <div className="ticket-details-premium">
                  <div className="ticket-row-premium">
                    <span className="ticket-label-premium">รหัสใบสั่งทำ:</span>
                    <span className="ticket-value-premium" style={{ color: "var(--primary-hover)" }}>{orderId}</span>
                  </div>
                  <div className="ticket-row-premium">
                    <span className="ticket-label-premium">โอกาสพิเศษ:</span>
                    <span className="ticket-value-premium">{selectedOccasion}</span>
                  </div>
                  <div className="ticket-row-premium">
                    <span className="ticket-label-premium">คำอวยพรที่เลือก:</span>
                    <span className="ticket-value-premium">
                      {selectedBlessings.join(", ") || "ความสุขสมหวัง"}
                    </span>
                  </div>
                  <div className="ticket-row-premium">
                    <span className="ticket-label-premium">เรื่องราวพิเศษ:</span>
                    <span className="ticket-value-premium">
                      {selectedSpecialDetail || "ทั่วไป"}
                    </span>
                  </div>
                  <div className="ticket-row-premium">
                    <span className="ticket-label-premium">แนวเพลง:</span>
                    <span className="ticket-value-premium">{selectedGenre}</span>
                  </div>
                  <div className="ticket-row-premium">
                    <span className="ticket-label-premium">จังหวะเพลง:</span>
                    <span className="ticket-value-premium">{selectedTempo}</span>
                  </div>
                  <div className="ticket-row-premium">
                    <span className="ticket-label-premium">ความสัมพันธ์:</span>
                    <span className="ticket-value-premium">{selectedRel?.name}</span>
                  </div>
                  <div className="ticket-row-premium">
                    <span className="ticket-label-premium">ชื่อเล่นผู้รับ:</span>
                    <span className="ticket-value-premium" style={{ fontWeight: "800", textDecoration: "underline", color: "var(--primary-hover)" }}>
                      {selectedNickname === "พูดชื่อเล่นเองใน LINE 🎙️" ? "🎙️ อัดเสียงพูดชื่อใน LINE" : selectedNickname}
                    </span>
                  </div>
                  <div className="ticket-row-premium" style={{ gridColumn: "span 2" }}>
                    <span className="ticket-label-premium">ข้อมูลเพิ่มเติม:</span>
                    <span className="ticket-value-premium" style={{ color: "var(--success)", fontWeight: "bold" }}>
                      {additionalInfo.trim() || "-"}
                    </span>
                  </div>
                </div>

                <div className="ticket-price-badge" style={{ marginTop: "0.25rem" }}>
                  ร่วมสมทบทุนตามความพึงพอใจภายหลังได้รับเพลง 💛
                </div>
              </div>
            </div>

            {/* Big copy button */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "0.25rem 0" }}>
              <button 
                className={`btn-copy-ticket ${copied ? "copied" : ""}`} 
                onClick={handleCopySummary}
              >
                {copied ? "คัดลอกข้อมูลเรียบร้อยแล้ว! ✅" : "📋 แตะปุ่มนี้เพื่อคัดลอกข้อมูลเพลง"}
              </button>
            </div>

            <div className="wizard-footer" style={{ borderTop: "none" }}>
              <button className="btn-elder btn-elder-back" onClick={() => setStep(8)}>
                <ArrowLeft size={18} /> ย้อนกลับ
              </button>
              <button 
                className="btn-elder btn-elder-next"
                style={{ background: "linear-gradient(135deg, var(--primary), #eab308)" }}
                onClick={handleFinishAndSave}
              >
                ไปหน้าส่งข้อมูลเข้า LINE ➡️
              </button>
            </div>
          </div>
        )}

        {/* STEP 10: Clean LINE Submission Screen */}
        {step === 10 && (
          <div className="step-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", height: "100%", justifyContent: "space-between", alignItems: "center" }}>
            <div className="step-header" style={{ width: "100%", textAlign: "center" }}>
              <h2 className="step-title" style={{ color: "#06c755" }}>ขั้นตอนสุดท้าย: ส่งข้อมูลในแชต LINE 💬</h2>
              <p className="step-subtitle">ส่งรูปที่แคปเจอร์และวางข้อมูลที่คัดลอกมา ในไลน์แชตได้เลยค่ะ</p>
            </div>

            <div className="line-instructions-box">
              <div className="instruction-item">
                <span className="item-num">1</span>
                <span className="item-desc"><strong>แคปรูปภาพหน้าจอ</strong> ใบสรุปข้อมูลการ์ดที่แล้วไว้</span>
              </div>
              <div className="instruction-item">
                <span className="item-num">2</span>
                <span className="item-desc">แตะปุ่มสีเขียวด้านล่าง <strong>ระบบจะเปิดแอป LINE ให้กดเพิ่มเพื่อนอัตโนมัติทันที (ไม่ต้องหยิบกล้องมาสแกนค่ะ)</strong></span>
              </div>
              <div className="instruction-item">
                <span className="item-num">3</span>
                <span className="item-desc">ในห้องแชต ให้<strong>แตะค้างที่ช่องพิมพ์ข้อความแล้วกด 'วาง' (Paste)</strong> และส่งรูปภาพให้เราได้เลยค่ะ!</span>
              </div>
            </div>

            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <button className="btn-line-submit-huge" onClick={handleSubmitToLine}>
                เปิดแอป LINE เพื่อส่งข้อมูลสั่งทำเพลง 💬
              </button>
            </div>

            <div className="wizard-footer" style={{ borderTop: "none", width: "100%", justifyContent: "space-between" }}>
              <button className="btn-elder btn-elder-back" onClick={() => setStep(9)}>
                <ArrowLeft size={18} /> ย้อนกลับ
              </button>
              <button 
                className="btn-elder btn-elder-reset"
                onClick={handleReset}
                style={{ 
                  background: "var(--bg-secondary)", 
                  border: "2px solid var(--primary)", 
                  color: "var(--primary)",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "16px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                🔄 แต่งเพลงใหม่อีกเพลง
              </button>
            </div>
          </div>
        )}

        {/* Normal Step Wizard Footer (Steps 2 to 7) */}
        {step > 1 && step <= 7 && (
          <div className="wizard-footer">
            <button 
              className="btn-elder btn-elder-back"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft size={18} />
              ย้อนกลับ
            </button>

            {step === 2 && (
              <button 
                className="btn-elder btn-elder-next"
                disabled={selectedBlessings.length === 0}
                onClick={() => setStep(3)}
              >
                ขั้นตอนถัดไป
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
