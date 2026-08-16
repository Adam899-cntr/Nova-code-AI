import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Введите описание сайта"
      });
    }

    const response = await client.responses.create({

      model: "gpt-5.6",

      instructions: `
Ты Nova Code AI — профессиональный AI-разработчик сайтов.

Пользователь описывает сайт.
Твоя задача — создать полноценный проект.

Верни ТОЛЬКО JSON:

{
  "name": "название",
  "html": "полный HTML",
  "css": "полный CSS",
  "js": "полный JavaScript"
}

Требования:

- современный дизайн
- адаптация под телефон
- качественный HTML
- качественный CSS
- рабочий JavaScript
- красивые анимации
- никаких TODO
- никаких объяснений
- HTML должен подключать style.css и script.js
`,

      input: prompt

    });

    const text =
      response.output_text;

    let project;

    try {

      project = JSON.parse(text);

    } catch {

      return res.status(500).json({
        error: "AI вернул неправильный JSON"
      });

    }

    return res.status(200).json(project);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error:
        error.message ||
        "Ошибка AI"
    });

  }

}
