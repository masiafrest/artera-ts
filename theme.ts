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
      200: "#ada9a2",
      300: "#9a9790",
      400: "#787570",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("arterra.100", "arterra.300")(props),
      },
    }),
  },
});

export default theme;
