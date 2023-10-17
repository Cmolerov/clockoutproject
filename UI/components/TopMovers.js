import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import axios from "axios";
import StockList from "./StockList";

// const stockData = [
//     {
//         request_id: "31d59dda-80e5-4721-8496-d0d32a654afe",
//         results: {
//             active: true,
//             address: {
//                 address1: "One Apple Park Way",
//                 city: "Cupertino",
//                 postal_code: "95014",
//                 state: "CA",
//             },
//             branding: {
//                 icon_url:
//                     "https://api.polygon.io/v1/reference/company-branding/d3d3LmFwcGxlLmNvbQ/images/2022-01-10_icon.png",
//                 logo_url:
//                     "https://api.polygon.io/v1/reference/company-branding/d3d3LmFwcGxlLmNvbQ/images/2022-01-10_logo.svg",
//             },
//             cik: "0000320193",
//             composite_figi: "BBG000B9XRY4",
//             currency_name: "usd",
//             description:
//                 "Apple designs a wide variety of consumer electronic devices, including smartphones (iPhone), tablets (iPad), PCs (Mac), smartwatches (Apple Watch), AirPods, and TV boxes (Apple TV), among others. The iPhone makes up the majority of Apple's total revenue. In addition, Apple offers its customers a variety of services such as Apple Music, iCloud, Apple Care, Apple TV+, Apple Arcade, Apple Card, and Apple Pay, among others. Apple's products run internally developed software and semiconductors, and the firm is well known for its integration of hardware, software and services. Apple's products are distributed online as well as through company-owned stores and third-party retailers. The company generates roughly 40% of its revenue from the Americas, with the remainder earned internationally.",
//             homepage_url: "https://www.apple.com",
//             list_date: "1980-12-12",
//             locale: "us",
//             market: "stocks",
//             market_cap: 2771126040150,
//             name: "Apple Inc.",
//             phone_number: "(408) 996-1010",
//             primary_exchange: "XNAS",
//             round_lot: 100,
//             share_class_figi: "BBG001S5N8V8",
//             share_class_shares_outstanding: 16406400000,
//             sic_code: "3571",
//             sic_description: "ELECTRONIC COMPUTERS",
//             ticker: "AAPL",
//             ticker_root: "AAPL",
//             total_employees: 154000,
//             type: "CS",
//             weighted_shares_outstanding: 16334371000,
//         },
//         status: "OK",
//     },
//     {
//         request_id: "31d59dda-80e5-4721-8496-d0d32a654afe",
//         results: {
//             active: true,
//             address: {
//                 address1: "One Apple Park Way",
//                 city: "Cupertino",
//                 postal_code: "95014",
//                 state: "CA",
//             },
//             branding: {
//                 icon_url:
//                     "https://api.polygon.io/v1/reference/company-branding/d3d3LmFwcGxlLmNvbQ/images/2022-01-10_icon.png",
//                 logo_url:
//                     "https://api.polygon.io/v1/reference/company-branding/d3d3LmFwcGxlLmNvbQ/images/2022-01-10_logo.svg",
//             },
//             cik: "0000320193",
//             composite_figi: "BBG000B9XRY4",
//             currency_name: "usd",
//             description:
//                 "Apple designs a wide variety of consumer electronic devices, including smartphones (iPhone), tablets (iPad), PCs (Mac), smartwatches (Apple Watch), AirPods, and TV boxes (Apple TV), among others. The iPhone makes up the majority of Apple's total revenue. In addition, Apple offers its customers a variety of services such as Apple Music, iCloud, Apple Care, Apple TV+, Apple Arcade, Apple Card, and Apple Pay, among others. Apple's products run internally developed software and semiconductors, and the firm is well known for its integration of hardware, software and services. Apple's products are distributed online as well as through company-owned stores and third-party retailers. The company generates roughly 40% of its revenue from the Americas, with the remainder earned internationally.",
//             homepage_url: "https://www.apple.com",
//             list_date: "1980-12-12",
//             locale: "us",
//             market: "stocks",
//             market_cap: 2771126040150,
//             name: "Uber Inc.",
//             phone_number: "(408) 996-1010",
//             primary_exchange: "XNAS",
//             round_lot: 100,
//             share_class_figi: "BBG001S5N8V8",
//             share_class_shares_outstanding: 16406400000,
//             sic_code: "3571",
//             sic_description: "ELECTRONIC COMPUTERS",
//             ticker: "UBER",
//             ticker_root: "AAPL",
//             total_employees: 154000,
//             type: "CS",
//             weighted_shares_outstanding: 16334371000,
//         },
//         status: "OK",
//     },

//     // ... more items
// ];

const TopMovers = ({ navigation }) => {
    const [selectedButton, setSelectedButton] = useState("button1");
    const [displayData, setDisplayData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(async () => {
            await fetchData("trending");
        }, 6000);
    }, []);

    const fetchData = async (endpoint) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:3000/${endpoint}`
            );
            setDisplayData(Object.values(response.data));
            // setDisplayData(stockData);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    console.log("displayData:", displayData);

    const handleButtonPress = (buttonName, endpoint) => {
        setSelectedButton(buttonName);
        setLoading(true);
        setTimeout(async () => {
            await fetchData(endpoint);
        }, 60000); // wait for 1 minute (60,000 milliseconds) before fetching data since the api has a limit of 5 requests per minute
        // can change this to be tracking a global var to see how long it has to wait. ex 2 calls were done leaves with 3 before i have to wait the  minute
    };

    return (
        <View>
            <Text style={styles.headerText}>Top Movers</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === "button1" && styles.selectedButton,
                    ]}
                    onPress={() => handleButtonPress("button1", "trending")}
                >
                    <Text style={styles.buttonText}>Trending</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === "button2" && styles.selectedButton,
                    ]}
                    onPress={() => handleButtonPress("button2", "topgainers")}
                >
                    <Text style={styles.buttonText}>Top Gainers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === "button3" && styles.selectedButton,
                    ]}
                    onPress={() => handleButtonPress("button3", "toplosers")}
                >
                    <Text style={styles.buttonText}>Top Losers</Text>
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator
                    style={styles.activityIndicator}
                    size="large"
                />
            ) : (
                <View style={styles.displayContainer}>
                    <StockList data={displayData} navigation={navigation} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    buttonContainer: {
        flexDirection: "row",
        // justifyContent: "space-between",
        justifyContent: "center",
    },
    button: {
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: "grey",
    },
    buttonText: {
        fontSize: 20,
        color: "#333",
    },
    displayContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    displayText: {
        fontSize: 20,
        color: "#333",
    },
    headerText: {
        fontSize: 24,
        marginBottom: 10,
        marginTop: 30,
        marginLeft: 20,
        color: "white",
    },
    activityIndicator: {
        marginTop: 20,
    },
});

export default TopMovers;
