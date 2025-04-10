import "./App.css";
import Header from "./component/Header";
import MainRouter from "./routes/MainRouter";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        backgroundColor: "#14161a",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Header />
      <MainRouter />
    </Box>
  );
}

export default App;
