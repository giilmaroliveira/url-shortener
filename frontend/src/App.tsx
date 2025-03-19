import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import StatsPage from "./pages/StatsPage";
import UrlShortenerPage from "./pages/UrlShortenerPage";
import UrlHistoryPage from "./pages/UrlHistoryPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/history">
            History
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<UrlShortenerPage />} />
        <Route path="/stats/:slug" element={<StatsPage />} />
        <Route path="/history" element={<UrlHistoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;