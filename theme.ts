import {
  extendTheme,
  useColorModeValue,
  type ThemeConfig,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
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
      },
    }),
  },
});

export default theme;
