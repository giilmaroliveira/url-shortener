import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h3" color="error">
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" mt={2}>
        The URL you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/" sx={{ mt: 3 }}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;