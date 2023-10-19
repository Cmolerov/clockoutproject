import React from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const FooterContainer = styled.View`
    background-color: #111415;
    padding: 20px;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
`;

const FooterButton = styled.TouchableOpacity`
    align-items: center;
`;

const Label = styled.Text`
    color: white;
    font-size: 12px;
    margin-top: 5px;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterButton>
                <FontAwesome name="home" size={24} color="white" />
                <Label>Home</Label>
            </FooterButton>
            <FooterButton>
                <FontAwesome name="line-chart" size={24} color="white" />
                <Label>Markets</Label>
            </FooterButton>
            <FooterButton>
                <FontAwesome name="exchange" size={24} color="white" />
                <Label>Trade</Label>
            </FooterButton>
            <FooterButton>
                <FontAwesome name="pie-chart" size={24} color="white" />
                <Label>Portfolio</Label>
            </FooterButton>
            <FooterButton>
                <FontAwesome name="ellipsis-h" size={24} color="white" />
                <Label>More</Label>
            </FooterButton>
        </FooterContainer>
    );
};

export default Footer;
