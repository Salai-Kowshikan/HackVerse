import AnimatedLoader from "react-native-animated-loader";
import { useFontSettings } from "./FontContext";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

function Loader() {
  const { loading } = useFontSettings();
  return (
    <>
      {loading && (
        <View style={styles.loaderContainer}>
          <AnimatedLoader
            visible={loading}
            overlayColor="rgba(255,255,255,0.75)"
            speed={1}
            source={require("./loader.json")}
            animationStyle={styles.lottie}
          >
            <Text style={styles.text}>Please wait, Mithran is working hard for you!</Text>
          </AnimatedLoader>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.75)",
  },
  lottie: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#000",
  },
});

export default Loader;