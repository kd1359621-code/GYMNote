export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return res.status(response.status).json(data);
    }

    const advice =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "アドバイスを取得できませんでした。";

    return res.status(200).json({
      advice,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
}