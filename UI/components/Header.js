import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const { stockPriceInfo } = require("../utils/utils");

const ORDER_HISTORY = {
    AAPL: {
        quantity: 30,
        price: 170.34,
    },
    NKE: {
        quantity: 20,
        price: 95.34,
    },
};

const totalSpent = Object.values(ORDER_HISTORY).reduce((acc, el) => {
    return el.price * el.quantity;
}, 0);

const Header = ({ data }) => {
    const stockPrice = {};
    let totalInvested = 0;

    Object.values(data).forEach(({ tickerPrev }) => {
        stockPrice[tickerPrev.results[0].T] = tickerPrev.results[0].c;
    });

    for (const key in ORDER_HISTORY) {
        totalInvested += stockPrice[key] * ORDER_HISTORY[key].quantity;
    }

    const change = totalInvested - totalSpent;
    const percentChange = ((change / totalSpent) * 100).toFixed(2);

    const { priceDiffColor, priceDiffIcon } = stockPriceInfo(
        totalSpent,
        totalInvested
    );

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>TOTAL INVESTING</Text>
            <Text style={styles.amountText}>${totalInvested.toFixed(2)}</Text>
            <Text style={styles.changeText}>
                <FontAwesome
                    name={priceDiffIcon}
                    size={12}
                    color={priceDiffColor}
                />
                ${change.toFixed(2)} ({percentChange}%)
            </Text>

            <View style={styles.buyingPowerContainer}>
                <View>
                    <Text style={styles.buyingPowerText}>BUYING POWER</Text>
                    <Text style={styles.amountText}>
                        ${totalSpent.toFixed(2)}
                    </Text>
                </View>
                <View style={styles.depositButton}>
                    <Text style={styles.depositButtonText}>+ Deposit</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        padding: 20,
        // backgroundColor: "#2A2A2A",
        // borderRadius: 15,
    },
    headerText: {
        color: "#A9A9A9",
        fontSize: 14,
    },
    amountText: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
    },
    changeText: {
        fontSize: 16,
        marginTop: 10,
    },
    buyingPowerText: {
        color: "#A9A9A9",
        fontSize: 14,
        marginTop: 20,
    },
    buyingPowerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    depositButton: {
        backgroundColor: "#4D4D4D",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    depositButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
    },
});

export default Header;
