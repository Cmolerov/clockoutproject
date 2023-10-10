const API_KEY = "pUl0JVxf_lsFyYyoaLRBi3WvQFsFzcZF";
// https://api.polygon.io/v3/reference/tickers/AAPL?apiKey=pUl0JVxf_lsFyYyoaLRBi3WvQFsFzcZF

async function fetchTickerData(ticker) {
    try {
        // const apiUrl = `https://api.polygon.io/v3/reference/tickers?ticker=${ticker}&active=true&apiKey=${API_KEY}`;
        const apiUrl = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${API_KEY}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(
                `Error fetching data for ${ticker}: ${response.statusText}`
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return error.message; // Return the error message instead of throwing it, that way the loop can continue.
    }
}

// Function to aggregate multiple GET requests using async/await
async function fetchAggregateTickerData(tickers) {
    const tickerDataBySymbol = {};

    for (const ticker of tickers) {
        const data = await fetchTickerData(ticker);
        if (data) {
            tickerDataBySymbol[ticker] = data;
        }
    }

    return tickerDataBySymbol;
}

module.exports = {
    fetchAggregateTickerData,
};
