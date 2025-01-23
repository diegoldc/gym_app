import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Main from "./components/Main";
import Admin from "./screens/Admin";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* <Main /> */}
        <Admin />
        <LoginScreen />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
});
