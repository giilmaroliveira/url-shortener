import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Box, Typography, Container, Alert } from "@mui/material";
import api from "../services/api";
import axios from "axios";
import { useNotification } from "../context/NotificationContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { showNotification } = useNotification();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await api.post("/auth/register", { email, password });
      showNotification("User registered successfully!", "success");
      navigate("/login");
    } catch (err: unknown) {
      let errMessage = "Failed to shorten the URL. Please try again.";

      if (axios.isAxiosError(err)) {
        errMessage = err.response?.data?.error || errMessage;
      }

      setError(errMessage);
      showNotification(errMessage, "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
            helperText={confirmPassword && password !== confirmPassword ? "Passwords must match" : ""}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Already have an account? <Link to="/login">Login here</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
