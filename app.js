const express = require("express");
const axios = require("axios");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// const API_BASE_URL = "https://api.quotable.io";

const API_BASE_URL = process.env.API_BASE_URL;

// Routes
// home page route
app.get("/", (req, res) => {
  res.json("Welcome to  Love-Thyself ❤️");
});

// Endpoint to fetch all quotes from the external API - http://localhost:5000/api/quotes
app.get("/api/quotes", async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/quotes`);
    const data = response.data;
    const allQuotes = data.results;
    res.json({ quotes: allQuotes });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

// Endpoint to search through all quotes via keyword input - http://localhost:5000/api/search/quotes?query=<your-search-query>
app.get("/api/search/quotes", async (req, res) => {
  const searchQuery = req.query.query;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/quotes?query=${encodeURIComponent(searchQuery)}`
    );
    const data = response.data;
    const searchResults = data.results;
    res.json({ results: searchResults });
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

// Endpoint to fetch all quotes by author from the external API - http://localhost:5000/api/authors
app.get("/api/authors", async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/authors`);
    const data = response.data;
    const authorsQuotesCount = data.results;
    res.json({ authors: authorsQuotesCount });
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).json({ error: "Failed to fetch authors" });
  }
});

// Endpoint to fetch quotes by author - http://localhost:5000/api/quotes/by-author/:authorSlugOrId
app.get("/api/quotes/by-author/:authorSlugOrId", async (req, res) => {
  const authorSlugOrId = req.params.authorSlugOrId;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/quotes?author=${encodeURIComponent(authorSlugOrId)}`
    );
    const data = response.data;
    const quotesByAuthor = data.results;
    res.json({ quotes: quotesByAuthor });
  } catch (error) {
    console.error("Error fetching quotes by author:", error);
    res.status(500).json({ error: "Failed to fetch quotes by author" });
  }
});

module.exports = app;
