const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_BASE_URL = "https://api.quotable.io";

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

// Endpoint to fetch all quotes by author from the external API - http://localhost:5000/api/authors
app.get("/api/authors", async (req, res) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/authors`);
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
      res.status(500).json({ error: "Failed to fetch authors" });
    }
  });
  

// Endpoint to fetch all available tags - http://localhost:5000/api/tags
// app.get("/api/tags", async (req, res) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/tags`);
//     res.json(response.data); // Send the entire response data as tags
//   } catch (error) {
//     console.error("Error fetching tags:", error);
//     res.status(500).json({ error: "Failed to fetch tags" });
//   }
// });

// Endpoint to fetch selected tags - http://localhost:5000/api/tag-quotes/:tagSlug

// app.get("/api/tag-quotes/:tagSlug", async (req, res) => {
//     try {
//       const tagSlug = req.params.tagSlug;
//       const response = await axios.get(`${API_BASE_URL}/search/quotes?tag=${tagSlug}`);
//       const data = response.data;
//       const tagQuotes = data.results;
//       res.json({ quotes: tagQuotes });
//     } catch (error) {
//       console.error("Error fetching tag quotes:", error);
//       res.status(500).json({ error: "Failed to fetch tag quotes" });
//     }
//   });


  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
