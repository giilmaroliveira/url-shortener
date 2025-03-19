import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import api from "../services/api";

const StatsPage = () => {
  const { slug } = useParams();
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get(`/visit/${slug}/stats`);
        setVisitCount(response.data.visitCount);
      } catch (err) {
        setError("Failed to fetch visit statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [slug]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" color="primary">
        Visit Statistics
      </Typography>
      {loading ? (
        <CircularProgress sx={{ mt: 3 }} />
      ) : error ? (
        <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>
      ) : (
        <Typography variant="h6" sx={{ mt: 3 }}>
          This link has been visited <strong>{visitCount}</strong> times.
        </Typography>
      )}
    </Container>
  );
};

export default StatsPage;
