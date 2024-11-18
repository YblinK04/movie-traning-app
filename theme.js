import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("rgba(0, 0, 0, 9)")(props),
      color: mode("#fff")(props),
    },
  }),
};

const colors = {
  primary: "#e29578",
};

const theme = extendTheme({ styles, colors });
export default theme;