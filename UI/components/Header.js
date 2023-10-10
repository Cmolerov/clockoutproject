import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Total Investing</Text>
        <Text style={styles.moneyText}>$10,000.00</Text>
        <Text style={styles.gainsText}>Gains</Text>
        <View>
            <Text style={styles.gainsText}>Buying Power</Text>
            <Text style={styles.gainsText}>$840.00</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    headerContainer: {
        // padding: 20,
        backgroundColor: "#111415",
        // alignItems: "center",
    },
    headerText: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 30,
        marginLeft: 11,
        color: "#393D3E",
    },
    moneyText: {
        fontSize: 32,
        color: "green",
        color: "white",
        marginLeft: 10,
    },
    gainsText: {
        fontSize: 12,
        marginTop: 10,
        color: "white",
    },
    // text: {
    //     color: "white",
    // },
});

export default Header;
