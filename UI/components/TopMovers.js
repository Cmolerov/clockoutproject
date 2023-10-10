import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TopMovers = () => {
    const [selectedButton, setSelectedButton] = useState("button1");
    const [displayData, setDisplayData] = useState(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    );

    const handleButtonPress = (buttonName) => {
        setSelectedButton(buttonName);
        switch (buttonName) {
            case "button1":
                setDisplayData(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                );
                break;
            case "button2":
                setDisplayData(
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
                );
                break;
            case "button3":
                setDisplayData(
                    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident."
                );
                break;
            default:
                setDisplayData(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Top Movers</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === "button1" && styles.selectedButton,
                    ]}
                    onPress={() => handleButtonPress("button1")}
                >
                    <Text style={styles.buttonText}>Trending</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === "button2" && styles.selectedButton,
                    ]}
                    onPress={() => handleButtonPress("button2")}
                >
                    <Text style={styles.buttonText}>Top Gainers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === "button3" && styles.selectedButton,
                    ]}
                    onPress={() => handleButtonPress("button3")}
                >
                    <Text style={styles.buttonText}>Top Losers</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.displayContainer}>
                <Text style={styles.displayText}>{displayData}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#1C1E20",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        // width: "100%",
        // paddingHorizontal: 20,
    },
    button: {
        // backgroundColor: "#ddd",
        // paddingVertical: 10,
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
    },
    displayText: {
        fontSize: 20,
        color: "#333",
    },
    headerText: {
        fontSize: 24,
        marginBottom: 10,
        marginTop: 30,
        color: "white",
    },
});

export default TopMovers;
