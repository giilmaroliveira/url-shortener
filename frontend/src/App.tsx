import { Routes, Route } from "react-router-dom";
import StatsPage from "./pages/StatsPage";
import UrlShortenerPage from "./pages/UrlShortenerPage";
import UrlHistoryPage from "./pages/UrlHistoryPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<Layout />}>
          <Route path="/" element={<UrlShortenerPage />} />
          <Route path="/stats/:slug" element={<StatsPage />} />
          <Route path="/my-urls" element={<UrlHistoryPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;