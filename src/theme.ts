import { extendTheme } from "@mui/joy";

const customTheme = extendTheme({
  components:{
    JoyLink: {
      styleOverrides: {
        root: {
          color: "black"
        }
      }
    },
  }
})
customTheme.typography.h1 = {
  ...customTheme.typography.h1,
    [customTheme.breakpoints.down("sm")]:{
        fontSize: "1.8rem"
    }
}
export default customTheme