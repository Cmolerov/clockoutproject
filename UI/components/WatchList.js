import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

const stockData = [
    {
        afterHours: 322.1,
        close: 325.12,
        from: "2023-01-09",
        high: 326.2,
        low: 322.3,
        open: 324.66,
        preMarket: 324.5,
        status: "OK",
        symbol: "AAPL",
        volume: 26122646,
    },
    {
        afterHours: 322.1,
        close: 325.12,
        from: "2023-01-09",
        high: 326.2,
        low: 322.3,
        open: 324.66,
        preMarket: 324.5,
        status: "OK",
        symbol: "EREE",
        volume: 26122646,
    },
    // ... more items
    {
        afterHours: 322.1,
        close: 325.12,
        from: "2023-01-09",
        high: 326.2,
        low: 322.3,
        open: 324.66,
        preMarket: 324.5,
        status: "OK",
        symbol: "SPTF",
        volume: 26122646,
    },
    {
        afterHours: 322.1,
        close: 325.12,
        from: "2023-01-09",
        high: 326.2,
        low: 322.3,
        open: 324.66,
        preMarket: 324.5,
        status: "OK",
        symbol: "LFT",
        volume: 26122646,
    },

    // ... more items
];

const Item = ({ symbol, open }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{symbol}</Text>
        <Text style={styles.openPrice}>{open}</Text>
    </View>
);

const WatchList = () => {
    const renderItem = ({ item }) => (
        <Item symbol={item.symbol} open={item.open} />
    );

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Watchlist</Text>
            </View>
            <FlatList
                data={stockData}
                renderItem={renderItem}
                keyExtractor={(item) => item.symbol}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        // backgroundColor: "blue",
        backgroundColor: "#1C1E20",
        width: "100%",
        height: "", // Set the height to 80% of the screen height
    },
    item: {
        flexDirection: "row", // Changed to 'row' to have items on the same line
        justifyContent: "space-between", // Added to separate symbol and open price
        backgroundColor: "#1C1E20",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        color: "white",
        fontSize: 12,
    },
    openPrice: {
        // fontSize: 18,
        color: "white",
        fontSize: 12,
    },
    text: {
        color: "white",
        fontSize: 18,
        marginLeft: 20,
    },
});

export default WatchList;
