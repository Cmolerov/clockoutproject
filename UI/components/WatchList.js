import React from "react";
import styled from "styled-components/native";
import StockList from "./StockList";

const WatchList = ({ data, navigation }) => {
    const dataArray = Object.values(data);
    return (
        <Container>
            <Title>Watchlist</Title>
            <StockList data={dataArray} navigation={navigation} />
        </Container>
    );
};

const Container = styled.View`
    margin-top: 20px;
    background-color: #1c1e20;
    width: 100%;
`;

const Title = styled.Text`
    color: white;
    font-size: 18px;
    margin-left: 20px;
    padding: 10px;
`;

export default WatchList;
