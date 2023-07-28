const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Love-Thyself❤️");
});

app.get("/api/quotes/:topic", async (req, res) => {
    console.log('Received a request to fetch quotes.');
  const { topic } = req.params;
  const topics = ["today", "truth", "inspiration", "happiness", "confidence"];

  if (!topics.includes(topic)) {
    return res.status(400).json({ message: "Invalid topic." });
  }

  try {
    const response = await axios.get("https://zenquotes.io/api/quotes");
    const filteredQuotes = response.data.filter((quote) =>
      quote.q.toLowerCase().includes(topic.toLowerCase())
    );

    if (filteredQuotes.length > 0) {
      return res.json({ quotes: filteredQuotes });
    } else {
      return res
        .status(404)
        .json({ message: "No quotes found for the specified topic." });
    }
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return res.status(500).json({ message: "Failed to fetch quotes." });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
