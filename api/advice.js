import { GoogleGenAI } from "@google/genai";



export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "POST only",
    });
  }

  try {
    
    const ai = new GoogleGenAI({
      apiKey: process.env.Gemini_API_Key,
    });

    const { category, exercise, weight, reps } = req.body;

    const prompt = `
あなたは優秀なパーソナルトレーナーです。

部位：${category}
種目：${exercise}
最高重量：${weight}kg
最高レップ：${reps}回

ユーザーは、今からこの「次回の目標」に挑戦しようとしています（まだ達成していません）。
この目標回数をギリギリでも全うできるように、
120文字以内で、
やる気が出る男気溢れる日本語でアドバイスしてください。
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