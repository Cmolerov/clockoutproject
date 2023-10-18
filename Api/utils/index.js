const { getFormattedDate } = require("./utils");

const API_KEY = "pUl0JVxf_lsFyYyoaLRBi3WvQFsFzcZF";

async function fetchTickerData(ticker) {
    try {
        const apiUrl = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${API_KEY}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(
                `Error fetching data for ${ticker}: ${response.statusText}`
            );
        }

        const data = await response.json();

        // Add the API key to the branding URLs
        // the data object returns the urls for the logo/icon without the api key
        //im adding the api key here to the urls so that i dont have to access it in the UI
        // can change api to process.env.API_KEY later
        data.results.branding.icon_url = `${data.results.branding.icon_url}?apiKey=${API_KEY}`;
        data.results.branding.logo_url = `${data.results.branding.logo_url}?apiKey=${API_KEY}`;

        return data;
    } catch (error) {
        return error.message;
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
