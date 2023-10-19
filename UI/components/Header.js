import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

const { stockPriceInfo, formatToDollarAmount } = require("../utils/utils");

const HeaderContainer = styled.View`
    padding: 20px;
`;

const HeaderText = styled.Text`
    color: #a9a9a9;
    font-size: 14px;
`;

const AmountText = styled.Text`
    color: #ffffff;
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
`;

const ChangeText = styled.Text`
    font-size: 16px;
    margin-top: 10px;
    color: ${(props) => props.color};
`;

const BuyingPowerText = styled.Text`
    color: #a9a9a9;
    font-size: 14px;
    margin-top: 20px;
`;

const BuyingPowerContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

const DepositButton = styled.TouchableOpacity`
    background-color: #4d4d4d;
    border-radius: 10px;
    padding-vertical: 10px;
    padding-horizontal: 20px;
    align-items: center;
`;

const DepositButtonText = styled.Text`
    color: #ffffff;
    font-size: 16px;
`;

// setting this up to use as purchasing price of the stocks i have in my watch list
const ORDER_HISTORY = {
    AAPL: {
        quantity: 30,
        price: 170.34,
    },
    NKE: {
        quantity: 20,
        price: 95.34,
    },
};

// this is the total amount spent on all the stocks from the order history (being the inital investment)
// to simulate how much money the user has made or lost, i will be using the current price of the stock
// those prices from order history are the prices the user bought the stocks at which I made up
let totalSpent = Object.values(ORDER_HISTORY).reduce((acc, el) => {
    return el.price * el.quantity;
}, 0);

const Header = ({ data }) => {
    // let totalSpent = Object.values(ORDER_HISTORY).reduce((acc, el) => {
    //     return el.price * el.quantity;
    // }, 0);

    let [totalInvested, setTotalInvested] = useState(0);
    const stockPrice = {};

    useEffect(() => {
        if (data) {
            Object.values(data).forEach(({ tickerPrev }) => {
                stockPrice[tickerPrev.results[0].T] = tickerPrev.results[0].c;
            });

            let totalInvested = 0;
            for (const key in ORDER_HISTORY) {
                totalInvested += stockPrice[key] * ORDER_HISTORY[key].quantity;
            }
            setTotalInvested(totalInvested);
        }
    }, [data]);

    let change = totalInvested - totalSpent;
    const percentChange = ((change / totalSpent) * 100).toFixed(2);

    const { priceDiffColor, priceDiffIcon } = stockPriceInfo(
        totalSpent,
        totalInvested
    );

    //change int to dollar amount
    totalInvested = formatToDollarAmount(totalInvested);
    change = formatToDollarAmount(change);
    const buyingPower = formatToDollarAmount(totalSpent);

    // future feature: add deposit button
    // have the button open a modal that allows user to add money to their account -> this will add the amount to the buying power
    // have the amout added to buying power to be added to the totalInvested since thats what buying power is being simulated as

    return (
        <HeaderContainer>
            <HeaderText>TOTAL INVESTING</HeaderText>
            <AmountText>{formatToDollarAmount(totalInvested)}</AmountText>
            <ChangeText color={priceDiffColor}>
                <FontAwesome
                    name={priceDiffIcon}
                    size={12}
                    color={priceDiffColor}
                />
                {change} ({percentChange}%)
            </ChangeText>

            <BuyingPowerContainer>
                <View>
                    <BuyingPowerText>BUYING POWER</BuyingPowerText>
                    <AmountText>{buyingPower}</AmountText>
                </View>

                <DepositButton>
                    <DepositButtonText>+ Deposit</DepositButtonText>
                </DepositButton>
            </BuyingPowerContainer>
        </HeaderContainer>
    );
};

export default Header;
