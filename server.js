const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.responses.create({
      model: "gpt-5.5",
      input: message,
    });

    res.json({
      answer: response.output_text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "صار خطأ أثناء الاتصال بـ OpenAI",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});