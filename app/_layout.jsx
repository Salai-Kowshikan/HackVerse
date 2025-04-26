import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { FontProvider } from "@/components/FontContext";
import Navbarheader from "@/components/Navbarheader";
import Loader from "@/components/Loader";

const theme = {
  colors: {
    primary: "rgb(255, 204, 92)",
    onPrimary: "rgb(0, 0, 0)",
    primaryContainer: "rgb(255, 239, 170)",
    onPrimaryContainer: "rgb(38, 26, 0)",
    secondary: "rgb(116, 91, 0)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(255, 224, 139)",
    onSecondaryContainer: "rgb(36, 26, 0)",
    tertiary: "rgb(0, 104, 116)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(151, 240, 255)",
    onTertiaryContainer: "rgb(0, 31, 36)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(242, 242, 242)",
    onBackground: "rgb(30, 27, 22)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(30, 27, 22)",
    surfaceVariant: "rgb(237, 225, 207)",
    onSurfaceVariant: "rgb(77, 70, 57)",
    outline: "rgb(127, 118, 103)",
    outlineVariant: "rgb(208, 197, 180)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(52, 48, 42)",
    inverseOnSurface: "rgb(248, 239, 231)",
    inversePrimary: "rgb(248, 189, 42)",
    elevation: {
      level0: "transparent",
      level1: "rgb(248, 243, 242)",
      level2: "rgb(244, 238, 235)",
      level3: "rgb(240, 233, 227)",
      level4: "rgb(239, 232, 224)",
      level5: "rgb(236, 228, 219)",
    },
    surfaceDisabled: "rgba(30, 27, 22, 0.12)",
    onSurfaceDisabled: "rgba(30, 27, 22, 0.38)",
    backdrop: "rgba(54, 48, 36, 0.4)",
  },
};

function RootLayout() {
  return (
    <>
      <FontProvider>
        <PaperProvider theme={theme}>
          <Navbarheader />
          <Loader />
          <Stack screenOptions={{ headerShown: false }} />
        </PaperProvider>
      </FontProvider>
    </>
  );
}

export default RootLayout;
