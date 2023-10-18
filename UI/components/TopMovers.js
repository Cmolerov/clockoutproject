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
import styled from "styled-components/native";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const Container = styled.View`
    width: 100%;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: center;
`;

const Button = styled.TouchableOpacity`
    padding-horizontal: 10px;
    border-radius: 5px;
    background-color: ${(props) => (props.selected ? "grey" : "transparent")};
`;

const ButtonText = styled.Text`
    font-size: 20px;
    color: #333;
`;

const DisplayContainer = styled.View`
    margin-top: 20px;
    padding-horizontal: 20px;
    border-radius: 5px;
`;

const HeaderText = styled.Text`
    font-size: 24px;
    margin-bottom: 10px;
    margin-top: 30px;
    margin-left: 20px;
    color: white;
`;

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
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleButtonPress = (buttonName, endpoint) => {
        setSelectedButton(buttonName);
        setLoading(true);
        setTimeout(async () => {
            await fetchData(endpoint);
        }, 60000);
    };

    return (
        <Container>
            <HeaderText>Top Movers</HeaderText>
            <ButtonContainer>
                <Button
                    selected={selectedButton === "button1"}
                    onPress={() => handleButtonPress("button1", "trending")}
                >
                    <ButtonText>Trending</ButtonText>
                </Button>
                <Button
                    selected={selectedButton === "button2"}
                    onPress={() => handleButtonPress("button2", "topgainers")}
                >
                    <ButtonText>Top Gainers</ButtonText>
                </Button>
                <Button
                    selected={selectedButton === "button3"}
                    onPress={() => handleButtonPress("button3", "toplosers")}
                >
                    <ButtonText>Top Losers</ButtonText>
                </Button>
            </ButtonContainer>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <DisplayContainer>
                    <StockList data={displayData} navigation={navigation} />
                </DisplayContainer>
            )}
        </Container>
    );
};

export default TopMovers;
