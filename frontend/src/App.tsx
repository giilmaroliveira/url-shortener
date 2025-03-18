import { Container, Typography, Box } from "@mui/material";

function App() {
  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" color="primary">
          URL Shortener
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Enter the URL to shorten
        </Typography>
      </Box>
    </Container>
  );
}

export default App;