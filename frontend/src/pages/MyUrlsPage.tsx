import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Container, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import api from "../services/api";
import { useNotification } from "../context/NotificationContext";

const MyUrlsPage = () => {
  const [urls, setUrls] = useState<{ id: string; slug: string; originalUrl: string; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editedSlugs, setEditedSlugs] = useState<{ [id: string]: string }>({});
  const { showNotification } = useNotification();
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

  const handleEditClick = (id: string, slug: string) => {
    setEditedSlugs((prev) => ({ ...prev, [id]: slug }));
  };

  const handleCancelEdit = (id: string) => {
    setEditedSlugs((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleSaveSlug = async (id: string) => {
    const newSlug = editedSlugs[id]?.trim();
    if (!newSlug || newSlug.length < 3) {
      showNotification("Slug must be at least 3 characters long.", "error");
      return;
    }

    const prevSlug = urls.find((url) => url.id === id)?.slug;
    setUrls((prev) => prev.map((url) => (url.id === id ? { ...url, slug: newSlug } : url)));

    try {
      await api.patch(`/url/${id}`, { newSlug });
      showNotification("Slug updated successfully!", "success");
    } catch (error) {
      showNotification("Failed to update slug. It might already be in use.", "error");
      setUrls((prev) => prev.map((url) => (url.id === id ? { ...url, slug: prevSlug! } : url)));
    }

    handleCancelEdit(id);
  };

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
                  <TableRow key={url.id}>
                    <TableCell>
                      {editedSlugs[url.id] !== undefined ? (
                        <TextField
                          value={editedSlugs[url.id]}
                          onChange={(e) => setEditedSlugs((prev) => ({ ...prev, [url.id]: e.target.value }))}
                          size="small"
                          error={!editedSlugs[url.id] || editedSlugs[url.id].length < 3}
                          helperText={!editedSlugs[url.id] || editedSlugs[url.id].length < 3 ? "Min 3 characters" : ""}
                        />
                      ) : (
                        <a href={`${API_BASE_URL}/url/${url.slug}`} target="_blank" rel="noopener noreferrer">
                          {url.slug}
                        </a>
                      )}
                    </TableCell>
                    <TableCell>
                      <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                        {url.originalUrl}
                      </a>
                    </TableCell>
                    <TableCell>{new Date(url.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {editedSlugs[url.id] !== undefined ? (
                        <>
                          <Tooltip title="Save">
                            <IconButton onClick={() => handleSaveSlug(url.id)} color="primary" disabled={!editedSlugs[url.id] || editedSlugs[url.id].length < 3}>
                              <SaveIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Cancel">
                            <IconButton onClick={() => handleCancelEdit(url.id)} color="secondary">
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Button component={Link} to={`/stats/${url.slug}`} variant="outlined">
                            View Stats
                          </Button>
                          <Tooltip title="Edit">
                            <IconButton onClick={() => handleEditClick(url.id, url.slug)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
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
