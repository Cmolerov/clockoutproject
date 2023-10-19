import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, ScrollView, Text, RefreshControl } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import Header from "./components/Header";
import WatchList from "./components/WatchList";
import TopMovers from "./components/TopMovers";
import Footer from "./components/Footer";
import Stock from "./components/Stock";

const Stack = createStackNavigator();

const queryClient = new QueryClient();

// another option would be to set these styles as components to be able to reuse them in other components
const SafeArea = styled.SafeAreaView`
    flex: 1;
`;

const Container = styled.View`
    flex: 1;
    margin-top: 20px;
    background-color: #111415;
`;

const scrollViewContentStyle = {
    flexGrow: 1,
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SafeArea>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen
                            name="Home"
                            options={{ headerShown: false }}
                        >
                            {(props) => (
                                <Container>
                                    <ScrollView
                                        contentContainerStyle={
                                            scrollViewContentStyle
                                        }
                                    >
                                        <Headers />
                                        <WatchLists {...props} />
                                        <TopMovers {...props} />
                                    </ScrollView>
                                    <Footer />
                                </Container>
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="Stock" component={Stock} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeArea>
        </QueryClientProvider>
    );
}

function useWatchlistData() {
    // add logic for this fetch to wait if the app was reloading too quickly due to api limit
    return useQuery("watchlistData", async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/watchlist");
            return data;
        } catch (error) {
            throw new Error("Error fetching data");
        }
    });
}

function Headers() {
    const { data, isLoading, isError } = useWatchlistData();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (isError) {
        return <Text>{isError.message}</Text>;
    }

    return <Header data={data} />;
}

function WatchLists(props) {
    const { data, isLoading, isError } = useWatchlistData();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (isError) {
        return <Text>Error fetching data</Text>;
    }

    return <WatchList {...props} data={data} />;
}

export default App;
