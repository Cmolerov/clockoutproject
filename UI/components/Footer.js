import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Footer = () => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity>
                <FontAwesome name="home" size={24} color="white" />
                <Text style={styles.label}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesome name="line-chart" size={24} color="white" />
                <Text style={styles.label}>Markets</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesome name="exchange" size={24} color="white" />
                <Text style={styles.label}>Trade</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesome name="pie-chart" size={24} color="white" />
                <Text style={styles.label}>Portfolio</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesome name="ellipsis-h" size={24} color="white" />
                <Text style={styles.label}>More</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: "#111415",
        padding: 20,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
    },
    label: {
        color: "white",
        fontSize: 12,
        marginTop: 5,
    },
});

export default Footer;
