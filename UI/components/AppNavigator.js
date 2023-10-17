import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WatchList from "./WatchList";
import Stock from "./Stock";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="WatchList">
            <Stack.Screen name="WatchList" component={WatchList} />
            <Stack.Screen name="Stock" component={Stock} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
