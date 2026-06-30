import { GoogleGenAI } from "@google/genai";

// ❌ ここにあった const ai = new GoogleGenAI(...) を消す

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "POST only",
    });
  }

  try {
    // ⭕️ ここ（関数の内部）で初期化する
    // こうすることで、リクエストが来た瞬間に確実に環境変数を読み込めます
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { category, exercise, weight, reps } = req.body;

    const prompt = `
あなたは優秀なパーソナルトレーナーです。

部位：${category}
種目：${exercise}
最高重量：${weight}kg
最高レップ：${reps}回

120文字以内で、
やる気が出る日本語でアドバイスしてください。
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return res.status(200).json({
      advice: response.text,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err.message,
    });
  }
}