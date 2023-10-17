const express = require("express");
const cors = require("cors");

const { fetchAggregateTickerData } = require("./utils");

const app = express();
const port = process.env.PORT || 3000; // Use the environment variable PORT or 3000 as the default port

app.use(cors());
app.use(
    cors({
        origin: "http://localhost:19006", // replace with your frontend app's URL
    })
);
// Define a basic route
app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

// API 1
app.get("/watchlist", async (req, res) => {
    try {
        // const tickerSymbols = ["AAPL", "NKE", "UBER", "AMZN"];
        const tickerSymbols = ["AAPL", "NKE"];
        const tickerDataBySymbol = await fetchAggregateTickerData(
            tickerSymbols
        ); // { AAPL: { response data }, MSFT: etc }

        res.json(tickerDataBySymbol);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// API 2
// app.get("/watchlistprice", async (req, res) => {
//     try {
//         const tickerSymbols = ["AAPL", "NKE", "GOOG", "AMZN"];
//         const tickerDataBySymbol = await fetchAggregateTickerData(
//             tickerSymbols
//         ); // { AAPL: { response data }, MSFT: etc }

//         res.json(tickerDataBySymbol);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// API 2
app.get("/trending", async (req, res) => {
    try {
        const tickerSymbols = ["SPOT", "ADBE"];
        const tickerDataBySymbol = await fetchAggregateTickerData(
            tickerSymbols
        ); // { AAPL: { response data }, MSFT: etc }

        res.json(tickerDataBySymbol);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API 3
app.get("/topgainers", async (req, res) => {
    try {
        const tickerSymbols = ["T", "BMWYY"];
        const tickerDataBySymbol = await fetchAggregateTickerData(
            tickerSymbols
        ); // { AAPL: { response data }, MSFT: etc }

        res.json(tickerDataBySymbol);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// API 4
app.get("/toplosers", async (req, res) => {
    try {
        const tickerSymbols = ["NFLX", "MSFT"];
        const tickerDataBySymbol = await fetchAggregateTickerData(
            tickerSymbols
        ); // { AAPL: { response data }, MSFT: etc }

        res.json(tickerDataBySymbol);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
