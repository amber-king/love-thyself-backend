// Dependencies
const express = require("express");
const axios = require("axios");
const cors = require("cors");

// Configuration
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes --v

// home page --v
app.get("/", (req, res) => {
  res.send("Welcome to Love-Thyself❤️");
});

// fetches/gets quotes filtered by the stated topics
// topics = today, truth, inspiration, happiness, confidence
// IF topic not found an error message is thrown
// seems to be a time limit on API called - could cause not all related data to be returned but majority works
app.get("/api/quotes/:topic", async (req, res) => {
  // console.log('Test to fetch quotes.'); // testing to see if the api is fectched
  
  // sets for which topics to pull from API
  const { topic } = req.params;
  const topics = ["today", "truth", "inspiration", "happiness", "confidence"];

  // if no matching topic - return 400; invaild topic msg
  if (!topics.includes(topic)) {
    return res.status(400).json({ message: "Invalid topic." });
  }

  // try - catch = to retrieve the quotes in the proper format as requested via topic
  // IF no quotes for selected topic then return error - no matching quote found 
  // w/ a catch error msg - fail to catch quotes˝
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

// declared PORT & listening on the port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
