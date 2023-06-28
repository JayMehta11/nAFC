import React, { useState } from "react";
import { Box, Button, Typography, Rating, TextField } from "@mui/material";

import { useLocation, Link } from "react-router-dom";
// import { useTheme } from "@mui/material/styles";

const EndForm = () => {
  // const theme = useTheme();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const { state } = useLocation();

  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    value: number | null
  ) => {
    if (value !== null) {
      setRating(value);
    }
  };

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 10,
        textAlign: "center",
      }}
    >
      <Typography variant="h3" component="h2" gutterBottom>
        Share your Feedback
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 4,
          width: "80%",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">Rate Your Experience:</Typography>
        <Rating
          name="survey-rating"
          value={rating}
          onChange={handleRatingChange}
          sx={{ ml: 2 }}
          size="large"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          p: 2,
          // width: '35%' ,
          width: { xs: "80%", sm: "80%", md: "60%", lg: "35%" },  
        }}
      >
        <TextField
          label="Feedback"
          multiline
          rows={4}
          value={feedback}
          onChange={handleFeedbackChange}
          variant="outlined"
          fullWidth
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          sx={{ mt: 2, fontWeight: "bold" }}
          variant="contained"
          component={Link}
          to="/end"
          state={{
            ...state,
            starFeedback: rating,
            qualitativeFeedback: feedback,
          }}
          color="secondary"
          type="submit"
          size="medium"
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default EndForm;
