import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StockList from "./StockList";

const WatchList = ({ data, navigation }) => {
    // console.log("data:", data);
    const dataArray = Object.values(data);
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Watchlist</Text>
            </View>
            <StockList data={dataArray} navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: "#1C1E20",
        width: "100%",
        height: "", // Set the height to 80% of the screen height
    },
    text: {
        color: "white",
        fontSize: 18,
        marginLeft: 20,
        padding: 10,
    },
});

export default WatchList;
