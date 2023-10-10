import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import WatchList from "./components/WatchList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TopMovers from "./components/TopMovers";

export default function App() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Header />
                <WatchList />
                <TopMovers />
            </ScrollView>
            <View>
                <Footer />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "#111415",
        // alignItems: "center",
        // justifyContent: "center",
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});
