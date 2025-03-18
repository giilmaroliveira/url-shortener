import { Container, Typography, Box } from "@mui/material";
import UrlShortenerForm from "./components/UrlShortenerForm";

const App = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" color="primary">
          URL Shortener
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Enter the URL to shorten
        </Typography>
        <UrlShortenerForm />
      </Box>
    </Container>
  );
}

export default App;