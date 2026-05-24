export interface GenerationParams {
  genre: string;
  tempo: string;
  theme: string;
  recipientName: string;
  elevenlabsApiKey?: string;
}

export interface GenerationResult {
  audioUrl: string;
  lyrics: string;
  title: string;
  artist: string;
}

// Generate simple custom lyrics based on options
export const generateLyrics = (_genre: string, theme: string, recipientName: string): string => {
  const name = recipientName || "ยายสมศรี";
  
  if (theme === "อวยพรวันเกิด") {
    return `[Intro]
(ดนตรี ทำนอง แสนอบอุ่น บรรเลงนำ)

[Verse 1]
เนื่องในวันดี มิ่งมงคล ของชีวิต
ขอคุณพระ ช่วยลิขิต ดลบันดาล พรชัย
ขอให้คุณ ${name} มีสุขล้น พ้นภัย
กายใจแข็งแรง ปราศจากโรค โรคา

[Chorus]
สุขสันต์วันเกิด ปีนี้ แสนยินดี ปรีดา
ครอบครัว อบอุ่นพร้อมหน้า ร่ำรวยเงินตรา ไหลมาเทมา
อายุมั่น ขวัญยืน หมื่นปี สุขใจเอย

[Verse 2]
วันเกิดวันนี้ ขอจงมี แต่รอยยิ้ม
หัวใจอิ่มเอิบ ไปด้วยรัก และเมตตา
ทุกๆ ความดี ดลบันดาล วาสนา
ให้มีโชคลาภ เข้ามา ในชีวิต ทุกวัน

[Chorus]
สุขสันต์วันเกิด ปีนี้ แสนยินดี ปรีดา
ครอบครัว อบอุ่นพร้อมหน้า ร่ำรวยเงินตรา ไหลมาเทมา
อายุมั่น ขวัญยืน หมื่นปี สุขใจเอย

[Outro]
ขอให้มีความสุข
อายุมั่นขวัญยืน
ตลอดปี ตลอดไป เทอญ`;
  }
  
  if (theme === "คิดถึงบ้าน") {
    return `[Intro]
(เสียงขลุ่ย พริ้วไหว ดนตรีเหงาๆ คิดถึงบ้าน)

[Verse 1]
มองท้องฟ้า ยามเย็น คิดถึงบ้านนา ที่เคยอยู่
กลิ่นดอกแก้ว โชยมาพรู คิดถึงแม่พ่อ จับใจ
ถึงอยู่กรุง แดนไกล ส่งความคิดถึง ไปหาคุณ ${name}
อยากกลับไป กราบตักตอม งามแท้ ธรรมชาติดินดน

[Chorus]
คิดถึง แม่น้ำสายเก่า คิดถึง อ้อมกอดอุ่นๆ
สายลม พัดโชยละมุน วันใดมีทุน จะรีบกลับ บ้านเรา

[Verse 2]
จากบ้านมาไกล มาสู้หา งานทำ
เช้าค่ำตรากตรำ เหน็ดเหนื่อย สักเพียงไหน
เมื่อคิดถึงบ้าน ก็มีแรง สู้ต่อไป
ส่งใจดวงนี้ ไปกราบตัก พ่อแม่

[Chorus]
คิดถึง แม่น้ำสายเก่า คิดถึง อ้อมกอดอุ่นๆ
สายลม พัดโชยละมุน วันใดมีทุน จะรีบกลับ บ้านเรา

[Outro]
ฝากความคิดถึง
ลอยไปตาม สายลม
กลับบ้านเรา เอย`;
  }

  if (theme === "ให้กำลังใจ") {
    return `[Intro]
(ดนตรีกีตาร์โปร่ง ให้ความหวัง และพลังใจ)

[Verse 1]
ชีวิตคนเรา บางคราวก็พบ พายุฝน
ขอเพียงคุณ ${name} อดทน สู้ต่อไป อย่าได้ถอย
ฟ้าหลังฝน งดงามเสมอ วันใหม่เฝ้าคอย
อย่าปล่อย ความฝันให้ลอย หายไปตาม สายลม

[Chorus]
เหนื่อยหน่อย สู้เถิดนะคนดี สองมือเรา ยังมีพลัง
จุดหมาย ไม่ไกลเกินหวัง วันพระพรชัย ต้องส่องแสง ทอง

[Verse 2]
ล้มลงวันนี้ ก็ลุกขึ้นยืน ใหม่ได้
อย่าปล่อยให้ ใจท้อแท้ และสิ้นหวัง
มีคนที่รัก คอยส่งแรงใจ และพลัง
ก้าวเดิน ไปข้างหน้า ด้วยความมั่นใจ

[Chorus]
เหนื่อยหน่อย สู้เถิดนะคนดี สองมือเรา ยังมีพลัง
จุดหมาย ไม่ไกลเกินหวัง วันพระพรชัย ต้องส่องแสง ทอง

[Outro]
ขอให้สู้ ต่อไป
อย่าเพิ่ง ท้อแท้
หัวใจ แข็งแกร่ง เอย`;
  }

  // theme === "รักหวานซึ้ง"
  return `[Intro]
(ดนตรี หวานซึ้ง เสียงเปียโน และเครื่องสาย ละมุน)

[Verse 1]
ตั้งแต่ ได้พบเจอ คุณ ${name} ยอดรักดวงใจ
โลกทั้งใบ ส่องไสว ด้วยแสง แห่งรักละมุน
ขอบคุณ ทุกวันเวลา ที่มี อ้อมกอดแสนอุ่น
รอยยิ้มหวาน แสนละมุน ติดตรึงใจพี่ ไม่คลาย

[Chorus]
รักนี้ ไม่มีวันจาง มอบใจให้เธอ ผู้เดียว
สายสัมพันธ์ แน่นเหนียว เคียงคู่กันไป จนแก่เฒ่า เอย

[Verse 2]
จะร่วมสุข ร่วมทุกข์ ไม่ทอดทิ้ง กันไปไหน
สัญญา จากใจดวงนี้ จะมั่นรัก ตลอดกาล
มีเธอ เคียงข้าง กายนี้ ช่างแสนหวาน
ความรัก เบิกบาน อบอวล อยู่เต็ม หัวใจ

[Chorus]
รักนี้ ไม่มีวันจาง มอบใจให้เธอ ผู้เดียว
สายสัมพันธ์ แน่นเหนียว เคียงคู่กันไป จนแก่เฒ่า เอย

[Outro]
รักเธอ คนเดียว
ตลอดไป
ยอดรัก ของฉัน เอย`;
};

// Translate Thai genre and tempo to English prompt keywords for the AI
export const generatePrompt = (genre: string, tempo: string, _theme: string): string => {
  let style = "";
  
  if (genre === "ลูกทุ่ง") {
    style += "Thai Luk Thung country folk pop song, clean acoustic guitar, clear Thai vocals, crisp pronunciation, ";
  } else if (genre === "ลูกกรุง") {
    style += "Thai Luk Krung classical orchestra pop, clear beautiful Thai vocals, crisp pronunciation, strings, ";
  } else if (genre === "สุนทราภรณ์") {
    style += "Thai Soontharaporn big band swing jazz, clear vintage Thai vocals, crisp pronunciation, brass, ";
  } else if (genre === "เพื่อชีวิต") {
    style += "Thai Phua Cheewit acoustic folk rock, clear emotional Thai vocals, crisp pronunciation, harmonica, ";
  } else if (genre === "หมอลำ") {
    style += "Thai Mor Lam dance folk, clear energetic Thai vocals, crisp pronunciation, phin, khaen, ";
  }

  style += "high fidelity studio master, clear vocals, correct pronunciation, ";

  if (tempo === "ช้า") {
    style += "slow tempo, emotional, sentimental, smooth, slow speed";
  } else if (tempo === "กลาง") {
    style += "medium tempo, pleasant rhythm, easy listening";
  } else if (tempo === "เร็ว") {
    style += "fast tempo, energetic, upbeat, danceable, joyful";
  }

  return style;
};

// Helper to rewrite ElevenLabs API URLs to bypass CORS via local proxy
const getProxyUrl = (url: string): string => {
  return url.replace("https://api.elevenlabs.io", "/api/elevenlabs");
};

export const startElevenLabsGeneration = async (
  params: GenerationParams
): Promise<GenerationResult> => {
  const { genre, tempo, theme, recipientName, elevenlabsApiKey } = params;
  const lyrics = generateLyrics(genre, theme, recipientName);
  const prompt = generatePrompt(genre, tempo, theme);

  if (!elevenlabsApiKey) {
    throw new Error("กรุณาใส่ ElevenLabs API Key ในแผงตั้งค่าผู้พัฒนา");
  }

  try {
    // ElevenLabs accepts prompt and lyrics in the single prompt property.
    // Combining prompt style instructions and the actual lyrics:
    const fullPrompt = `${prompt}\n\n[Lyrics]\n${lyrics}`;

    const response = await fetch(getProxyUrl("https://api.elevenlabs.io/v1/music/stream"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": elevenlabsApiKey,
      },
      body: JSON.stringify({
        prompt: fullPrompt,
        music_length_ms: 120000, // 2 minutes (120,000 ms)
        force_instrumental: false,
      }),
    });

    if (!response.ok) {
      let errMessage = "เกิดข้อผิดพลาดในการเรียก ElevenLabs API";
      try {
        const errData = await response.json();
        if (errData && errData.detail && errData.detail.message) {
          errMessage = errData.detail.message;
        } else if (errData && errData.message) {
          errMessage = errData.message;
        }
      } catch (e) {
        // Fallback if not JSON or error parsing
      }
      throw new Error(errMessage);
    }

    // ElevenLabs returns binary stream of the generated MP3 audio
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);

    return {
      audioUrl: audioUrl,
      lyrics: lyrics,
      title: `เพลงจากใจให้ ${recipientName || "คุณ"} (${genre})`,
      artist: "AI ElevenLabs Singer",
    };
  } catch (error: any) {
    console.error("ElevenLabs generation error:", error);
    throw new Error(error.message || "ล้มเหลวในการเชื่อมต่อกับ ElevenLabs");
  }
};
