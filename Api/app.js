const express = require('express');

const { fetchAggregateTickerData } = require('./utils');

const app = express();
const port = process.env.PORT || 3000; // Use the environment variable PORT or 3000 as the default port

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// API 1
app.get('/watchlist', async (req, res) => {
  try {
    const tickerSymbols = ['AAPL', 'MSFT', 'GOOG', 'AMZN'];
    const tickerDataBySymbol = await fetchAggregateTickerData(tickerSymbols); // { AAPL: { response data }, MSFT: etc }

    res.json(tickerDataBySymbol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

