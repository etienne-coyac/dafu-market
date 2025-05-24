import { accordionSummaryClasses, extendTheme } from "@mui/joy";

const customTheme = extendTheme({
  components: {
    JoyLink: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
    JoyAccordionGroup: {
      styleOverrides: {
        root: {
          [accordionSummaryClasses.indicator]: {
            transitionDuration: ".4s",
          },
          [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]: {
            transform: "rotate(180deg)",
          },
        },
      },
    },
    JoyCard: {
      styleOverrides: {
        root: {
          padding: "0.5rem",
        },
      },
    },
    JoyTab: {
      styleOverrides: {
        root: {
          flexGrow: 1,
        },
      },
    },
    JoyModal: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
        },
      },
    },
  },
});
customTheme.typography.h1 = {
  ...customTheme.typography.h1,
  [customTheme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
};
export default customTheme;
