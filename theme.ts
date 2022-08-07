import {
  extendTheme,
  useColorModeValue,
  type ThemeConfig,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import "@fontsource/noto-serif";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "Noto Serif",
    body: "Noto Serif",
  },
  colors: {
    arterra: {
      100: "#e8e4d9",
      200: "#d1c9b3",
      300: "#ada9a2",
      400: "#9a9790",
      500: "#787570",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("arterra.100", "arterra.400")(props),
        // color: mode("arterra.400", "arterra.100")(props),
        borderColor: mode("arterra.400", "arterra.100")(props),
        // accentColor: mode("arterra.400", "arterra.100")(props),
      },
      "*::placeholder": {
        color: mode("arterra.400", "arterra.100")(props),
      },
      "*, *::before, &::after,": {
        borderColor: mode("arterra.200", "arterra.100")(props),
        // wordWrap: "break-word",
      },
    }),
  },
});

export default theme;
