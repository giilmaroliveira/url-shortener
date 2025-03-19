import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container } from "@mui/material";
import api from "../services/api";

const MyUrlsPage = () => {
  const [urls, setUrls] = useState<{ slug: string; originalUrl: string; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await api.get("/url/my-urls");
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
    <Container maxWidth="md">
      <Box mt={5} textAlign="center">
        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
          My URLs
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
                      <a href={`${API_BASE_URL}/url/${url.slug}`} target="_blank" rel="noopener noreferrer">
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
    </Container>
  );
};

export default MyUrlsPage;
