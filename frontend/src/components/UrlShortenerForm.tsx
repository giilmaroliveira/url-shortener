import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const UrlShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    if (!originalUrl.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/url", {
        originalUrl
      });
      setShortUrl(response.data.shortUrl.slug);
    } catch (err) {
      setError("Failed to shorten the URL. Please try again.");
    }
  };

  const handleCopy = () => {

  }
  return (
    <Box mt={4} textAlign="left">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter URL"
          variant="outlined"
          fullWidth
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          error={!!error}
          helperText={error}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Shorten
        </Button>
      </form>

      {shortUrl && (
        <Box mt={3}>
          <Typography variant="h6" color="success">
            Success! Here's your short URL
          </Typography>
          <Typography variant="body1">{`http://localhost:3000/api/url/${shortUrl}`}</Typography>
        </Box>
      )}
    </Box>
  )
}

export default UrlShortenerForm;