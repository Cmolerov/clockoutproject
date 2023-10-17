import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";
import WatchList from "./components/WatchList";
import TopMovers from "./components/TopMovers";
import Stock from "./components/Stock"; // Import the Stock component
import { stockPriceInfo } from "./utils/utils";

const Stack = createStackNavigator();

export default function App() {
    const [watchlistData, setWatchlistData] = useState([]);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/watchlist"
                );
                setWatchlistData(response.data);
            } catch (error) {
                console.error("There was an error fetching the data!", error);
            }
        };

        fetchWatchlist();
    }, []);
    // console.log("watchlistData:", watchlistData);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" options={{ headerShown: false }}>
                    {(props) => (
                        <View style={styles.container}>
                            <ScrollView
                                contentContainerStyle={styles.scrollViewContent}
                            >
                                <Header data={watchlistData} />
                                <WatchList {...props} data={watchlistData} />
                                <TopMovers {...props} />
                            </ScrollView>
                            <Footer />
                        </View>
                    )}
                </Stack.Screen>
                <Stack.Screen name="Stock" component={Stock} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "#111415",
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});
