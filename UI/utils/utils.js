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

module.exports = {
    stockPriceInfo,
};
