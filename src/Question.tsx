import { useEffect, useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

const questions: any = [];

const questionArrayCreation = () => {
  let N = 60;
  let numbers = [];
  for (let i = 1; i <= N; i++) {
    numbers.push(i);
  }
  for (let i = N - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp: any = numbers[i];
    numbers[i] = numbers[j];
    numbers[j] = temp;
  }
  for (let i = 0; i < N; i++) {
    const question = {
      id: i + 1,
      image: `/assets/${numbers[i]}.jpg`,
    };
    questions.push(question);
  }
};

const Question = () => {
  const { state } = useLocation();

  const [timer, setTimer] = useState(600); // 10 minutes in secondsf
  const [responses, setResponses] = useState<
    Array<{
      responseTime: number;
      answer: string;
      fName1?: string;
      fName2?: string;
      fName3?: string;
      fName4?: string;
      fName5?: string;
      fName6?: string;
    }>
  >([]);

  const conditionalAFC = state.condition;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ratingcondition, setRatingCondition]: any = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    questionArrayCreation();
    setRatingCondition(state.condition);
  }, [state.condition]);

  useEffect(() => {
    if (currentQuestionIndex === questions.length - conditionalAFC) {
      navigate("/endForm", {
        state: {
          ...state,
          condition: `${state.condition}AFC`,
          responses: responses,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      navigate("/endForm", {
        state: {
          ...state,
          condition: `${state.condition}AFC`,
          responses: responses,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const handleLikeDislike = (action: any) => {
    if (currentQuestionIndex <= questions.length - 1) {
      const currentTime = (600 - timer) * 1000;
      const response = {
        responseTime: currentTime,
        answer:
          currentQuestionIndex + 1 === action
            ? "fName1"
            : currentQuestionIndex + 2 === action
            ? "fName2"
            : currentQuestionIndex + 3 === action
            ? "fName3"
            : currentQuestionIndex + 4 === action
            ? "fName4"
            : currentQuestionIndex + 5 === action
            ? "fName5"
            : "fName6",
        fName1: questions[currentQuestionIndex].image,
        fName2: questions[currentQuestionIndex + 1].image,
        fName3:
          conditionalAFC > 2 ? questions[currentQuestionIndex + 2].image : "",
        fName4:
          conditionalAFC > 2 ? questions[currentQuestionIndex + 3].image : "",
        fName5:
          conditionalAFC > 4 ? questions[currentQuestionIndex + 4].image : "",
        fName6:
          conditionalAFC > 4 ? questions[currentQuestionIndex + 5].image : "",
      };
      setResponses((prevResponses) => [...prevResponses, response]);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + conditionalAFC);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const calculateProgress = () => {
    const answeredQuestions = currentQuestionIndex;
    const totalQuestions = questions.length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        p: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "left", sm: "center" },
          alignItems: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <Typography variant="h4" component="h2">
          Question
        </Typography>
        <Box
          sx={{
            borderRadius: 4,
            padding: "0.25rem .5rem",
            position: "absolute",
            right: 0,
            backgroundColor: "lightgray",
          }}
        >
          <Typography variant="body1" sx={{ fontSize: 26 }}>
            {formatTime(timer)}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          width:
            conditionalAFC === 4 ? { xs: "100%", sm: "80%", md: "60%" } : "80%",

          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={1}
          sx={{
            flexWrap: { sm: "wrap", md: "wrap" },
            m: 2,
          }}
        >
          {questions
            .slice(currentQuestionIndex, currentQuestionIndex + conditionalAFC)
            .map((question: any, i: any) => (
              <Grid
                item
                xs={conditionalAFC === 2 ? 12 : 6}
                sm={6}
                md={6}
                lg={conditionalAFC === 6 ? 4 : 6}
                key={question.id}
              >
                <Button
                  sx={{
                    width: {
                      xs:
                        conditionalAFC === 6
                          ? "120px"
                          : conditionalAFC === 4
                          ? "140px"
                          : "200px",
                      sm:
                        conditionalAFC === 6
                          ? "200px"
                          : conditionalAFC === 4
                          ? "200px"
                          : "200px",
                      md:
                        conditionalAFC === 6
                          ? "200px"
                          : conditionalAFC === 4
                          ? "240px"
                          : "320px",
                      lg:
                        conditionalAFC === 6
                          ? "300px"
                          : conditionalAFC === 4
                          ? "300px"
                          : "450px",
                    },
                    height: {
                      xs:
                        conditionalAFC === 6
                          ? "120px"
                          : conditionalAFC === 4
                          ? "140px"
                          : "200px",
                      sm:
                        conditionalAFC === 6
                          ? "200px"
                          : conditionalAFC === 4
                          ? "200px"
                          : "200px",
                      md:
                        conditionalAFC === 6
                          ? "200px"
                          : conditionalAFC === 4
                          ? "240px"
                          : "320px",
                      lg:
                        conditionalAFC === 6
                          ? "300px"
                          : conditionalAFC === 4
                          ? "300px"
                          : "450px",
                    },
                    background: "white",
                    border: "1px solid black",
                    transition: "box-shadow 0.1s ease-in-out",
                    "&:hover": {
                      boxShadow: `0px 0px 2px 2px green`,
                    },
                  }}
                  onClick={() => handleLikeDislike(question.id)}
                >
                  <img
                    src={question.image}
                    alt={`Question ${question.id}`}
                    style={{
                      minWidth: "100%",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      minHeight: "100%",
                    }}
                  />
                </Button>
              </Grid>
            ))}
        </Grid>
      </Box>
      {/* {ratingcondition === "likeDislike" ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ fontWeight: 700 }}
            onClick={() => handleLikeDislike("Like")}
          >
            Like 👍
          </Button>
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={() => handleLikeDislike("Dislike")}
            sx={{ ml: 2, fontWeight: 700 }}
          >
            Dislike 👎
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            flexWrap: theme.breakpoints.only("sm") ? "wrap" : "none",
            alignItems: "center",
            justifyContent: "center",
            // mt: 2,
            p: 2,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <Button
              key={value}
              variant="contained"
              size="medium"
              // color={ratingMethod === "star" ? "secondary" : "primary"}
              onClick={() => handleRatingChange(value)}
              sx={{
                marginTop: ".3rem",
                marginLeft: ".4rem",
                backgroundColor: "white",
                color: "black",
                fontSize: "20px",
                fontWeight: "700",
                border: "1px solid black",
                "&:hover": {
                  backgroundColor: "lightblue",
                  boxShadow: "none",
                },
              }}
            >
              {value}
            </Button>
          ))}
        </Box>
      )} */}

      {/* <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, width: '80%' }}>
        <CircularProgress variant="determinate" value={timer / 60} size={96} thickness={4} />
        <Typography variant="body1" component="span" sx={{ ml: 2, fontSize: 20 }}>
          {formatTime(timer)}
        </Typography>
      </Box> */}
      <LinearProgress
        variant="determinate"
        value={calculateProgress()}
        sx={{ mt: 2, width: "50%", height: ".5rem" }}
      />
    </Box>
  );
};

export default Question;
