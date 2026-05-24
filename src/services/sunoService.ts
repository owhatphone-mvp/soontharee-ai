import { generateLyrics, generatePrompt } from "./elevenlabsService";

export interface SunoGenerationParams {
  genre: string;
  tempo: string;
  theme: string;
  recipientName: string;
  sunoApiBaseUrl: string;
  sunoApiKey?: string;
}

export interface SunoGenerationResult {
  audioUrl: string;
  lyrics: string;
  title: string;
  artist: string;
}

export const startSunoGeneration = async (
  params: SunoGenerationParams
): Promise<SunoGenerationResult> => {
  const { genre, tempo, theme, recipientName, sunoApiBaseUrl, sunoApiKey } = params;
  
  if (!sunoApiBaseUrl) {
    throw new Error("กรุณาระบุ Suno API Base URL ในแผงตั้งค่าผู้พัฒนา");
  }

  // Ensure base URL doesn't end with slash
  const baseUrl = sunoApiBaseUrl.replace(/\/$/, "");
  
  const lyrics = generateLyrics(genre, theme, recipientName);
  const tags = generatePrompt(genre, tempo, theme);
  const title = `เพลงจากใจให้ ${recipientName || "คุณ"} (${genre})`;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    if (sunoApiKey) {
      headers["Authorization"] = `Bearer ${sunoApiKey}`;
    }

    const response = await fetch(`${baseUrl}/api/custom_generate`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        prompt: lyrics,
        tags: tags,
        title: title,
        make_instrumental: false,
        wait_audio: false
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Suno API Error: ${response.status} - ${errorText || "ไม่สามารถเริ่มสร้างเพลงได้"}`);
    }

    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Suno API ส่งข้อมูลกลับมาไม่ถูกต้อง (ไม่ใช่รายการเพลง)");
    }

    // Get the first item from the generated pair
    const songId = data[0].id;
    if (!songId) {
      throw new Error("ไม่ได้รับรหัสเพลงจาก Suno API");
    }

    // Polling loop to wait for completion
    const maxPolls = 100; // ~5 minutes max
    let pollCount = 0;
    let completedSong: any = null;

    while (pollCount < maxPolls) {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // poll every 3 seconds
      pollCount++;

      const pollResponse = await fetch(`${baseUrl}/api/get?ids=${songId}`, {
        headers
      });

      if (pollResponse.ok) {
        const pollData = await pollResponse.json();
        if (Array.isArray(pollData) && pollData.length > 0) {
          const songInfo = pollData[0];
          
          // Check if song is complete and has a valid audio URL
          if (
            (songInfo.status === "complete" || songInfo.status === "succeeded") && 
            songInfo.audio_url
          ) {
            completedSong = songInfo;
            break;
          }
          
          if (songInfo.status === "failed") {
            throw new Error("การประมวลผลเพลงบน Suno ล้มเหลว");
          }
        }
      }
    }

    if (completedSong && completedSong.audio_url) {
      return {
        audioUrl: completedSong.audio_url,
        lyrics: lyrics,
        title: title,
        artist: "AI Suno Singer",
      };
    } else {
      throw new Error("การสร้างเพลงใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง");
    }
  } catch (error: any) {
    console.error("Suno generation error:", error);
    throw new Error(error.message || "ล้มเหลวในการเชื่อมต่อกับ Suno API");
  }
};
