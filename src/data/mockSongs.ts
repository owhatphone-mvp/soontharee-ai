export interface Song {
  id: string;
  title: string;
  genre: string;
  tempo: string;
  theme: string;
  artist: string;
  audioUrl: string;
  lyrics: string;
  era: string;
}

export const mockSongs: Song[] = [
  {
    id: "1",
    title: "มนต์รักท้องนา (ลูกทุ่ง ช้า)",
    genre: "ลูกทุ่ง",
    tempo: "ช้า",
    theme: "คิดถึงบ้าน",
    artist: "AI สมยศ ยอดรัก",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    era: "ยุค 80s",
    lyrics: `[เกริ่น]
โอ้ท้องนาฟ้ากว้างขวางปวงชน
ข้าคนจนจากลาบ้านไปแสนไกล

[ห้องที่ 1]
กลิ่นโคลนสาปควายยังจำติดเตือนใจ
เสียงขลุ่ยผิวแว่วมาแต่ไกลจากคุ้งน้ำ
พี่จากน้องนางมาสู้ลุยงานค่ำ
โอ้ดวงใจจะปวดร้าวสักเพียงใด

[ท่อนฮุค]
คิดถึงแม่น้ำสายเก่า คิดถึงพ่อแม่ที่เฝ้าคอยหา
วันใดมีเงินตรา จะหวนคืนกลับมาบ้านเรา...`
  },
  {
    id: "2",
    title: "สามช่าพาเพลิน (ลูกทุ่ง เร็ว)",
    genre: "ลูกทุ่ง",
    tempo: "เร็ว",
    theme: "ให้กำลังใจ",
    artist: "AI พรเพ็ญ ดารา",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    era: "ยุค 90s",
    lyrics: `[ดนตรีโจ๊ะๆ สามช่า]

[ห้องที่ 1]
สู้ต่อไปนะคนไทยอย่าท้อแท้
เหนื่อยเพียงใดก็ต้องก้าวขาเดินหน้า
ชีวิตมันมีขึ้นมีลงตามกาลเวลา
หยาดเหงื่อที่ไหลมาคือพลังสร้างสรรค์

[ท่อนฮุค]
ยิ้มเข้าไว้คนดี วันพรุ่งนี้ต้องดีกว่าเก่า
รำวงสามช่าแก้เหงา ลุกขึ้นมาเต้นยาวๆ ด้วยกันเอย!`
  },
  {
    id: "3",
    title: "รำลึกสุนทราภรณ์ (สุนทราภรณ์ ช้า)",
    genre: "สุนทราภรณ์",
    tempo: "ช้า",
    theme: "รักหวานซึ้ง",
    artist: "AI สุนทรีย์ ศรีนคร",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    era: "ยุค 60s",
    lyrics: `[เกริ่นแซกโซโฟนหวานๆ]

[ห้องที่ 1]
ดวงจันทร์งามเด่นฉายแสงแห่งราตรี
ใจพี่เปี่ยมรักภักดีต่อดวงหน้า
เจ้างามชดช้อยดังดวงประทีปส่องนภา
วอนสายลมช่วยพาความคิดถึงไปเติมใจ

[ท่อนฮุค]
แสนรักแสนห่วงใย ไม่เคยไกลห่างดวงจิต
มอบกายและมิตรชีวิตนี้มีเพียงเธอ...`
  },
  {
    id: "4",
    title: "เริงลีลาศสุนทราภรณ์ (สุนทราภรณ์ เร็ว)",
    genre: "สุนทราภรณ์",
    tempo: "เร็ว",
    theme: "อวยพรวันเกิด",
    artist: "AI สุนทรา คณะสุนทรีย์",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    era: "ยุค 70s",
    lyrics: `[ดนตรีบิ๊กแบนด์ลีลาศ จังหวะควิกสเต็ป]

[ห้องที่ 1]
ขออวยพรวันเกิดให้ประเสริฐเลิศล้ำ
ทุกคืนวันสุขสันต์ชื่นฉ่ำวิญญาณ์
คิดเงินให้ได้เงิน คิดทองให้ได้ทองมา
โรคภัยอย่ากรายกล้ำมีสุขล้ำชั่วนิรันดร์

[ท่อนฮุค]
เฮฮาปาร์ตี้ สุขีกันถ้วนหน้า
ร่ายรำเริงร่า เฉลิมฉลองวันดีๆ`
  },
  {
    id: "5",
    title: "ลำซิ่งเพื่อชีวิต (เพื่อชีวิต เร็ว)",
    genre: "เพื่อชีวิต",
    tempo: "เร็ว",
    theme: "ให้กำลังใจ",
    artist: "AI ขุนพล เพื่อไทย",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    era: "ยุค 90s",
    lyrics: `[เสียงพิณเสียงแคนเร้าใจ]

[ห้องที่ 1]
จากบ้านนอกคอกนาเข้ามาสู้กรุงใหญ่
แบกความหวังไว้เต็มสองบ่าหนาสู้ตาย
ไม่เคยยอมแพ้ต่อโชคชะตาและร่างกาย
เพื่อคนที่อยู่แนวหลังได้สบายมีกินมีใช้

[ท่อนฮุค]
สู้เขาเถิดพี่น้องไทย หัวใจแกร่งดังหินผา
น้ำตาที่หลั่งรินมา จะกลายเป็นฝนทองชะโลมใจ`
  },
  {
    id: "6",
    title: "ไออุ่นแห่งท้องทุ่ง (ลูกกรุง ช้า)",
    genre: "ลูกกรุง",
    tempo: "ช้า",
    theme: "คิดถึงบ้าน",
    artist: "AI ศรีไพร ใจงาม",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    era: "ยุค 70s",
    lyrics: `[เกริ่นดนตรีเปียโนเบาๆ]

[ห้องที่ 1]
ลมโชยชายพัดผ่านบ้านริมคลอง
มองดูคลื่นน้ำสาดนองหัวใจหวั่น
จากไปไกลแสนนานไม่เคยลืมวัน
ที่เราสัญญาผูกพันใต้ร่มโพธิ์ใหญ่

[ท่อนฮุค]
โอ้บ้านเอ๋ยบ้านนา ที่รักษาจิตใจดวงนี้
รอนานหลายปี พี่จะกลับไปซบไออุ่นเดิม`
  }
];

export const getFallbackSong = (genre: string, tempo: string, theme: string): Song => {
  // Try to find exact match
  const match = mockSongs.find(s => s.genre === genre && s.tempo === tempo && s.theme === theme);
  if (match) return match;

  // Try to find by genre
  const genreMatch = mockSongs.find(s => s.genre === genre);
  if (genreMatch) return genreMatch;

  // Fallback to the first song
  return mockSongs[0];
};
