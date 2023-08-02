// Import required modules
const express = require("express");
const axios = require("axios");
const cors = require("cors");

// Create an instance of Express app
const app = express();

// Middleware to handle CORS
app.use(cors());
app.use(express.json());

// Define the route to fetch quotes
app.get("/api/quotes", async (req, res) => {
  try {
    const response = await axios.get("https://api.quotable.io/quotes/");
    const quotes = response.data.results;
    res.json({ quotes });
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
