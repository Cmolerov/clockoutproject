const { getFormattedDate } = require("./utils");

const todayDate = getFormattedDate();

const API_KEY = "pUl0JVxf_lsFyYyoaLRBi3WvQFsFzcZF";

async function fetchTickerData(ticker) {
    // this is to get the ticker details (name, symbol, etc)
    try {
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
async function fetchTickerPrevCloseData(ticker) {
    // will be using this api to get the previous close price of the stock to simulate the current price of the stock
    try {
        const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${API_KEY}`;
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
    // creating a function to get all the stocks data at once instead of making multiple api calls for each stock
    // will need to merge the data from the two api calls into one object to get the data for each stock including (price, name, symbol, etc)

    // console.log("tickers:", tickers);
    const tickerDataBySymbol = {};

    for (const ticker of tickers) {
        const tickerDetails = await fetchTickerData(ticker);
        const previousCloseData = await fetchTickerPrevCloseData(ticker);

        const data = {
            tickerDetails: tickerDetails,
            tickerPrev: previousCloseData,
        };

        if (data) {
            tickerDataBySymbol[ticker] = data;
        }
    }

    return tickerDataBySymbol;
}

module.exports = {
    fetchAggregateTickerData,
};
