import { CssVarsProvider } from "@mui/joy";
import Header from "./components/layout/Header";

function App() {
  return (
    <CssVarsProvider>
      <Header />
    </CssVarsProvider>
  );
}

export default App;
