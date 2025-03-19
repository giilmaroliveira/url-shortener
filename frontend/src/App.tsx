import { Container, Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import StatsPage from "./pages/StatsPage";
import UrlShortenerPage from "./pages/UrlShortenerPage";
import UrlHistoryPage from "./pages/UrlHistoryPage";

const App = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Routes>
          <Route path="/" element={<UrlShortenerPage />} />
          <Route path="/stats/:slug" element={<StatsPage />} />
          <Route path="/history" element={<UrlHistoryPage />} />
        </Routes>
      </Box>
    </Container>
  );
}

export default App;