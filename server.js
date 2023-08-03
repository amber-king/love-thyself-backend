// Import required modules
const express = require("express");
const axios = require("axios");
const cors = require("cors");

// Create an instance of Express app
const app = express();

// Middleware to handle CORS
app.use(cors());
app.use(express.json());


app.get("/api/quotes", async (req, res) => {
    try {
      const { tag } = req.query;
      let url = "https://api.quotable.io/quotes/";
  
      // If a tag is provided, append it to the API URL
      if (tag) {
        url += `?tag=${tag}`;
      }
  
      const response = await axios.get(url);
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
  With this code, when you make a GET request to /api/quotes, you can provide a tag query parameter to filter the quotes by a specific tag. For example, if you want quotes with the tag "inspirational", you can make a request to /api/quotes?tag=inspirational, and the server will fetch quotes from the external API with the "inspirational" tag.
  
  Remember to restart your server after making these changes for the updated code to take effect.
  
  
  
  
  
  
// app.get("/api/quotes", async (req, res) => {
//     try {
//       const { tag } = req.query;
//       let url = "https://api.quotable.io/quotes/";
      
//       // If a tag is provided, append it to the API URL
//       if (tag) {
//         url += `?tag=${tag}`;
//       }
  
//       const response = await axios.get(url);
//       const quotes = response.data.results;
//       res.json({ quotes });
//     } catch (error) {
//       console.error("Error fetching quotes:", error);
//       res.status(500).json({ error: "Failed to fetch quotes" });
//     }
//   });

// Define the port number and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
