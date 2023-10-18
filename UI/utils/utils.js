function stockPriceInfo(openPrice, currentPrice) {
    const priceDiff = currentPrice - openPrice;
    const priceDiffColor = priceDiff >= 0 ? "green" : "red";
    const priceDiffIcon = priceDiff >= 0 ? "arrow-up" : "arrow-down";
    const priceDiffPercentage = ((priceDiff / openPrice) * 100).toFixed(2);

    return {
        priceDiff,
        priceDiffColor,
        priceDiffIcon,
        priceDiffPercentage,
    };
}

function formatToDollarAmount(number) {
    // Use toLocaleString() with 'en-US' locale to format as USD
    return number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2, // Ensure two decimal places
    });
}

module.exports = {
    stockPriceInfo,
    formatToDollarAmount,
};
