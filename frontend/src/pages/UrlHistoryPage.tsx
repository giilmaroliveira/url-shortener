import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const UrlHistoryPage = () => {
  const [urls, setUrls] = useState<{ slug: string; originalUrl: string; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_URL = `${import.meta.env.VITE_API_URL}/url`;

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get(API_URL);
        setUrls(response.data);
      } catch (err) {
        setError("Failed to load shortened URLs.");
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  return (
    <Box mt={5} textAlign="center">
      <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
        Previously Shortened URLs
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : urls.length === 0 ? (
        <Typography>No shortened URLs yet.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Short URL</strong></TableCell>
                <TableCell><strong>Original URL</strong></TableCell>
                <TableCell><strong>Created At</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urls.map((url) => (
                <TableRow key={url.slug}>
                  <TableCell>
                    <a href={`${API_URL}/${url.slug}`} target="_blank" rel="noopener noreferrer">
                      {url.slug}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                      {url.originalUrl}
                    </a>
                  </TableCell>
                  <TableCell>{new Date(url.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/stats/${url.slug}`} variant="outlined">
                      View Stats
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UrlHistoryPage;
