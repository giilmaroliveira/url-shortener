import { Box, Button, TextField } from "@mui/material";

const UrlShortenerForm = () => {
  return (
    <Box mt={4} textAlign="left">
      <form>
        <TextField
          label="Enter URL"
          variant="outlined"
          fullWidth
          value=""
          sx={{ mb: 2 }}
        />
      </form>
      <Button type="submit" variant="contained" color="primary">
        Shorten
      </Button>
    </Box>
  )
}

export default UrlShortenerForm;