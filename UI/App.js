import React from "react";
import axios from "axios";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    RefreshControl,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { SafeAreaView } from "react-native";
import Header from "./components/Header";
import WatchList from "./components/WatchList";
import TopMovers from "./components/TopMovers";
import Footer from "./components/Footer";
import Stock from "./components/Stock";

const Stack = createStackNavigator();

const queryClient = new QueryClient();

function App() {
    // const [refreshing, setRefreshing] = React.useState(false);
    // const { refetch } = useWatchlistData();

    // const onRefresh = React.useCallback(() => {
    //     setRefreshing(true);
    //     refetch();
    //     setTimeout(() => {
    //         setRefreshing(false);
    //     }, 2000);
    // }, [refetch]);

    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaView style={{ flex: 1 }}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen
                            name="Home"
                            options={{ headerShown: false }}
                        >
                            {(props) => (
                                <View style={styles.container}>
                                    <ScrollView
                                        contentContainerStyle={
                                            styles.scrollViewContent
                                        }
                                        // refreshControl={
                                        //     <RefreshControl
                                        //         refreshing={refreshing}
                                        //         onRefresh={onRefresh}
                                        //     />
                                        // }
                                    >
                                        <Headers />
                                        <WatchLists {...props} />
                                        <TopMovers {...props} />
                                    </ScrollView>
                                    <Footer />
                                </View>
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="Stock" component={Stock} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </QueryClientProvider>
    );
}

function useWatchlistData() {
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

export default App;
