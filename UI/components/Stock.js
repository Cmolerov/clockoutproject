import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import styled from "styled-components/native";

const Card = styled.View`
    background-color: #1c1e20;
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
`;

const Title = styled.Text`
    color: white;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const TextField = styled.Text`
    color: white;
    font-size: 18px;
    margin-bottom: 5px;
`;

const StockImage = styled(Image)`
    width: 50px;
    height: 50px;
`;

const Stock = ({ route }) => {
    const { stock } = route.params;
    const { tickerDetails, tickerPrev } = stock;
    const imageUrl = tickerDetails.results.branding.icon_url;

    return (
        <Card>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StockImage source={{ uri: imageUrl }} resizeMode="contain" />
                <Title>{tickerDetails.results.name}</Title>
                <TextField>{`Ticker Symbol: ${tickerDetails.results.ticker}`}</TextField>
                <TextField>{`Close Price: $${tickerPrev.results[0].c}`}</TextField>
                <TextField>{`Open Price: $${tickerPrev.results[0].o}`}</TextField>
                <TextField>{`Market: ${tickerDetails.results.market}`}</TextField>
                <TextField>{`Description:`}</TextField>
                <TextField>{`${tickerDetails.results.description}`}</TextField>
            </ScrollView>
        </Card>
    );
};

export default Stock;
