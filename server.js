// Import required modules
const express = require("express");
const axios = require("axios");
const cors = require("cors");

// Create an instance of Express app
const app = express();

// Middleware to handle CORS
app.use(cors());
app.use(express.json());

let allQuotes = [];

// Endpoint to fetch all quotes from the external API
app.get("/api/quotes", async (req, res) => {
  try {
    const response = await axios.get("https://api.quotable.io/quotes");
    const data = response.data;
    const allQuotes = data.results;
    res.json({ quotes: allQuotes });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

app.get("/api/search/quotes", (req, res) => {
  try {
    const { tags } = req.query;

    if (!tags) {
      return res.status(400).json({ error: "Tag parameter is required" });
    }

    // Filter quotes that have any of the specified tags
    const searchResults = allQuotes.filter((quote) =>
      quote.tags.some((tag) => tags.includes(tag))
    );

    res.json({ quotes: searchResults });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

// Define the port number and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
