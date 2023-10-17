import React from "react";
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { stockPriceInfo } from "../utils/utils";

const Item = ({ symbol, name, onPress, currentPrice, openPrice, imageUrl }) => {
    // since im using the previous close price, i am using it as the current price of the stock
    // i will be calculating if the stock went up or down by comparing the open price and the close price since the close price
    // of the previous day is the opening price of the stock for the next day

    // const priceDiff = openPrice - currentPrice;
    // const priceDiffColor = priceDiff >= 0 ? "green" : "red";
    // const priceDiffIcon = priceDiff >= 0 ? "arrow-up" : "arrow-down";
    // const priceDiffPercentage = ((priceDiff / openPrice) * 100).toFixed(2);
    // rememeber to move to utils later
    console.log("imageUrl:", imageUrl); //change api key to dotenv
    const { priceDiff, priceDiffColor, priceDiffIcon, priceDiffPercentage } =
        stockPriceInfo(openPrice, currentPrice);

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.item}>
                <View style={styles.textContainer}>
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.image}
                            resizeMode="contain" // This is to ensure the entire image is visible
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{symbol}</Text>
                            <Text style={styles.stockName}>{name}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.textPriceContainer}>
                    <Text style={styles.title}>{`$${currentPrice}`}</Text>
                    <View style={styles.priceContainer}>
                        {/* inline style due to being dynamic but can change to
                        stylesheet later have it match a style */}
                        <FontAwesome
                            name={priceDiffIcon}
                            size={12}
                            color={priceDiffColor}
                        />
                        <Text
                            style={{ color: priceDiffColor }}
                        >{`$${priceDiff.toFixed(
                            2
                        )} (${priceDiffPercentage}%)`}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const StockList = ({ data, navigation }) => {
    console.log("data:", data);
    const renderItem = ({ item }) => {
        console.log("item:", item);
        return (
            <Item
                symbol={item.tickerDetails.results.ticker}
                name={item.tickerDetails.results.name}
                currentPrice={item.tickerPrev.results[0].c}
                openPrice={item.tickerPrev.results[0].o}
                imageUrl={`${item.tickerDetails.results.branding.icon_url}?apiKey=pUl0JVxf_lsFyYyoaLRBi3WvQFsFzcZF`}
                // clicking on a stock will show the individual stock page to simulate the user navigating to the stock pressed on
                //which is going to show the individual stock's information
                onPress={() =>
                    navigation.navigate("Stock", {
                        stock: item,
                    })
                }
            />
        );
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.tickerDetails.results.ticker}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1C1E20",
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    textContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    textPriceContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    priceContainer: { flexDirection: "row", alignItems: "center" },
    title: {
        color: "white",
        fontSize: 12,
    },
    openPrice: {
        color: "white",
        fontSize: 12,
    },
    text: {
        color: "white",
        fontSize: 18,
        marginLeft: 20,
    },
    icon: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    stockName: {
        color: "#5B5F60",
        fontSize: 12,
    },
    image: {
        width: 20, // Or whatever size you need
        height: 20, // Or whatever size you need
        marginRight: 10,
        borderRadius: 10,
    },
});

export default StockList;
