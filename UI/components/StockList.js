import React from "react";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { stockPriceInfo } from "../utils/utils";
import styled from "styled-components/native";

const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #1c1e20;
    padding: 10px;
    margin-vertical: 8px;
    margin-horizontal: 16px;
`;

const TextContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const TextPriceContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
`;

const PriceContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Title = styled.Text`
    color: white;
    font-size: 12px;
`;

const StockName = styled.Text`
    color: #5b5f60;
    font-size: 12px;
`;

const ImageContainer = styled.Image`
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: 10px;
`;

const Item = ({ symbol, name, onPress, currentPrice, openPrice, imageUrl }) => {
    const { priceDiff, priceDiffColor, priceDiffIcon, priceDiffPercentage } =
        stockPriceInfo(openPrice, currentPrice);

    return (
        <ItemContainer onPress={onPress}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ImageContainer
                    source={{ uri: imageUrl }}
                    resizeMode="contain"
                />
                <TextContainer>
                    <Title>{symbol}</Title>
                    <StockName>{name}</StockName>
                </TextContainer>
            </View>
            <TextPriceContainer>
                <Title>{`$${currentPrice}`}</Title>
                <PriceContainer>
                    <FontAwesome
                        name={priceDiffIcon}
                        size={12}
                        color={priceDiffColor}
                    />
                    <Text
                        style={{ color: priceDiffColor }}
                    >{`$${priceDiff.toFixed(
                        2
                    )} (${priceDiffPercentage}%)`}</Text>
                </PriceContainer>
            </TextPriceContainer>
        </ItemContainer>
    );
};

const StockList = ({ data, navigation }) => {
    const renderItems = () => {
        return data.map((item) => {
            return (
                <Item
                    key={item.tickerDetails.results.ticker}
                    symbol={item.tickerDetails.results.ticker}
                    name={item.tickerDetails.results.name}
                    currentPrice={item.tickerPrev.results[0].c}
                    openPrice={item.tickerPrev.results[0].o}
                    imageUrl={item.tickerDetails.results.branding.icon_url}
                    onPress={() =>
                        navigation.navigate("Stock", {
                            stock: item,
                        })
                    }
                />
            );
        });
    };

    return <View>{renderItems()}</View>;

    // learning note
    // this created conflict causing a nested virtual list since flallist has a scroll view
    // return (
    //     <FlatList
    //         data={data}
    //         renderItem={renderItem}
    //         keyExtractor={(item) => item.tickerDetails.results.ticker}
    //     />
    // );
};

export default StockList;
