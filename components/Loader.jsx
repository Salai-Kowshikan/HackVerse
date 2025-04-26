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
            overlayColor="rgba(255, 230, 128, 0.62)"
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
    fontWeight: "bold",
  },
});

export default Loader;

// import { ActivityIndicator } from "react-native-paper";
// import { useFontSettings } from "@/components/FontContext";
// import { View, StyleSheet } from "react-native";

// function Loader() {
//   const { loading } = useFontSettings();

//   if (!loading) return null;

//   return (
//     <>
//       <View style={styles.overlay}>
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator animating={loading} size="large" />
//         </View>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loaderContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default Loader;
