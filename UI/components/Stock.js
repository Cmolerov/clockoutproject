import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const Stock = ({ route }) => {
    const { stock } = route.params;
    const { tickerDetails, tickerPrev } = stock;
    // console.log("stock:", stock);
    const imageUrl = `${tickerDetails.results.branding.icon_url}?apiKey=pUl0JVxf_lsFyYyoaLRBi3WvQFsFzcZF`;
    // console.log("imageUrl:", imageUrl);

    return (
        <View style={styles.card}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="contain" // This is to ensure the entire image is visible
                />
                <Text style={styles.title}>{tickerDetails.results.name}</Text>
                <Text
                    style={styles.text}
                >{`Ticker Symbol: ${tickerDetails.results.ticker}`}</Text>
                <Text
                    style={styles.text}
                >{`Close Price: $${tickerPrev.results[0].c}`}</Text>
                <Text
                    style={styles.text}
                >{`Open Price: $${tickerPrev.results[0].o}`}</Text>
                <Text
                    style={styles.text}
                >{`Market: ${tickerDetails.results.market}`}</Text>
                <Text style={styles.text}>{`Description:`}</Text>
                <Text
                    style={styles.text}
                >{`${tickerDetails.results.description}`}</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#1C1E20",
        borderRadius: 10,
        padding: 20,
        margin: 10,
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    text: {
        color: "white",
        fontSize: 18,
        marginBottom: 5,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    image: {
        width: 50, // Or whatever size you need
        height: 50, // Or whatever size you need
    },
});

export default Stock;
