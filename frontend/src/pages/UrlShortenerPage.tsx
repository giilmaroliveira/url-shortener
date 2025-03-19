import { useState } from "react";
import { Box, Button, TextField, Typography, Tooltip, Container } from "@mui/material";
import axios from "axios";
import { ContentCopy } from "@mui/icons-material";

const UrlShortenerPage = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const API_URL = `${import.meta.env.VITE_API_URL}/url`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopySuccess(false);

    if (!originalUrl.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}`, {
        originalUrl
      });
      setShortUrl(response.data.shortUrl.slug);
    } catch (err) {
      setError("Failed to shorten the URL. Please try again.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${API_URL}/${shortUrl}`).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    })
  }
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" color="primary">
        URL Shortener
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Enter the URL to shorten
      </Typography><Box mt={4} textAlign="left">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter URL"
            variant="outlined"
            fullWidth
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" color="primary">
            Shorten
          </Button>
        </form>

        {shortUrl && (
          <Box mt={3} textAlign="center">
            <Typography variant="h6" color="success" sx={{ mb: 2 }}>
              Success! Here's your short URL:
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
              <Typography variant="body1">
                {`${API_URL}/${shortUrl}`}
              </Typography>
              <Tooltip title={copySuccess ? "Copied!" : "Copy"}>
                <Button onClick={handleCopy} variant="outlined">
                  <ContentCopy /> Copy
                </Button>
              </Tooltip>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  )
};

export default UrlShortenerPage;
