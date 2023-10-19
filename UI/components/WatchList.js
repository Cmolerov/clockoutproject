import React from "react";
import styled from "styled-components/native";
import StockList from "./StockList";
import { FontAwesome } from "@expo/vector-icons";

const Container = styled.View`
    margin-top: 20px;
    background-color: #1c1e20;
    width: 100%;
`;

const Title = styled.Text`
    color: white;
    font-size: 18px;
    margin-left: 10px;
    padding: 10px;
`;
const TitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
`;

const Button = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

const AllText = styled.Text`
    color: white;
    font-size: 16px;
    margin-right: 5px;
`;

const WatchList = ({ data, navigation }) => {
    const dataArray = Object.values(data);
    return (
        <Container>
            <TitleContainer>
                <Title>Watchlist</Title>
                <Button>
                    <AllText>All</AllText>
                    <FontAwesome name="arrow-right" size={16} color="white" />
                </Button>
            </TitleContainer>
            <StockList data={dataArray} navigation={navigation} />
        </Container>
    );
};

export default WatchList;
