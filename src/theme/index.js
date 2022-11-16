import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },

  breakpoints: {
    base: "0em",
    sm: "20em",
    md: "48em",
    lg: "62em",
    xl: "80em",
  },

  colors: {
    gray: {
      50: "#f7fafc",
      100: "#edf2f7",
      200: "#e2e8f0",
      300: "#cbd5e0",
      400: "#a0aec0",
      500: "#718096",
      600: "#4a5568",
      700: "#2d3748",
      800: "#1a202c",
      900: "#171923",
    },
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
  },

  components: {
    Input: {
      variants: {
        sign: {
          field: {
            width: {
              base: "100vw",
              sm: "75vw",
              md: "50vw",
              lg: "40vw",
              xl: "30vw",
            },
          },
        },
        post: {
          field: {
            width: {
              base: "90vw",
              md: "75vw",
              lg: "50vw",
              xl: "40vw",
            },
          },
        },
      },
    },
  },
});

export default theme;
