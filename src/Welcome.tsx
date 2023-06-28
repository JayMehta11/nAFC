import { Box, Button, Typography } from "@mui/material";

const Welcome = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 40 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to the Survey App
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is the introduction and consent text.
      </Typography>
      <Typography variant="body1" gutterBottom>
        You are invited to participate in a study titled "Generative AI and
        Tangible Products: Human-AI Design of 3D-printed lamps".
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        color="success"
        size="large"
        onClick={() => (window.location.href = "/form")}
      >
        Agree and Begin
      </Button>
    </Box>
  );
};

export default Welcome;
