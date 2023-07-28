// Dependencies
const express = require("express");
const axios = require("axios");
const cors = require("cors");

// Configuration
const app = express();

// added cors config requirements to prevent requests going to a different domain
// the home page and the topic page connected to the topic buttons are the two main domains the request muct got
// const acceptOrigin = ["http://localhost:3000"];

// const corsCheck = {
//   origin: function (origin, callback) {
//     if (acceptOrigin.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// Middleware
app.use(cors());
app.use(express.json());

// Routes --v

// today quotes --v
app.get("/api/quotes/today", async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    const todaysQuote = response.data[0].q;
    res.json({ quote: todaysQuote });
  } catch (error) {
    console.error("Error fetching today's quote:", error);
    res.status(500).json({ error: "Failed to fetch today's quote" });
  }
});

// truth quotes --v
app.get("/api/quotes/truth", async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    const truthQuotes = response.data.filter((truth) =>
      quote.q.toLowerCase().includes("truth")
    );
    if (truthQuotes.length > 0) {
      return res.json({ quotes: truthQuotes });
    } else {
      return res.status(404).json({ message: "No truth quotes found" });
    }
  } catch (error) {
    console.error("Error fetching truth quotes:", error);
    return res.status(500).json({ message: "Failed to fetch truth quotes." });
  }
});

// happiness quotes --v
app.get("/api/quotes/happiness", async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    const happinessQuotes = response.data.filter((happiness) =>
      happiness.q.toLowerCase().includes("happiness")
    );
    if (happinessQuotes.length > 0) {
      return res.json({ quotes: happinessQuotes });
    } else {
      return res.status(404).json({ message: "No happiness quotes found" });
    }
  } catch (error) {
    console.error("Error fetching happiness quotes:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch happiness quotes." });
  }
});

// confidence quotes
app.get("/api/quotes/confidence", async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    const confidenceQuotes = response.data.filter((confidence) =>
      confidence.q.toLowerCase().includes("confidence")
    );
    if (confidenceQuotes.length > 0) {
      return res.json({ quotes: confidenceQuotes });
    } else {
      return res.status(404).json({ message: "No confidence quotes found" });
    }
  } catch (error) {
    console.error("Error fetching confidence quotes:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch confidence quotes." });
  }
});

// inspiration  quotes
app.get("/api/quotes/inspiration", async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    const inspirationQuotes = response.data.filter((inspiration) =>
      inspiration.q.toLowerCase().includes("inspiration")
    );
    if (inspirationQuotes.length > 0) {
      return res.json({ quotes: inspirationQuotes });
    } else {
      return res.status(404).json({ message: "No inspiration quotes found" });
    }
  } catch (error) {
    console.error("Error fetching inspiration quotes:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch inspiration quotes." });
  }
});

// declared PORT & listening on the port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
