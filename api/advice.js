export default async function handler(req, res) {
  console.log("API実行");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    if (!body) {
      return res.status(400).json({ error: "No body" });
    }

    const { category, exercise, weight, reps } = body;

    const prompt = `
あなたは優秀なパーソナルトレーナーです。

部位：${category}
種目：${exercise}
最高重量：${weight}kg
最高レップ：${reps}回

120文字以内で、やる気が出る日本語でアドバイスしてください。
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    return res.status(200).json({
      advice: data.choices?.[0]?.message?.content
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}