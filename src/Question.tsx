import { useEffect, useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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

//random no. without permutation

//array - []
//shuffle = random permutation

//1 2 3 4 5 6 7 8
//8*7*6*5*4*3*2*1
//1-60
//3-60

const Question = () => {
  const theme = useTheme();
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
//   const [responses, setResponses] = useState<
//   Array<{
//     responseTime: number;
//     answer: string;
//     imagePaths: Record<string, string>;
//   }>
// >([]);
  const conditionalAFC = state.condition;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [currentQuestionIndex1, setCurrentQuestionIndex1] = useState(0);
  // const [currentQuestionIndex2, setCurrentQuestionIndex2] = useState(1);
  // const [currentQuestionIndex3, setCurrentQuestionIndex3] = useState(
  //   conditionalAFC === 4 || conditionalAFC === 6 ? 2 : 6
  // );
  // const [currentQuestionIndex4, setCurrentQuestionIndex4] = useState(
  //   conditionalAFC === 4 || conditionalAFC === 6 ? 3 : 6
  // );
  // const [currentQuestionIndex5, setCurrentQuestionIndex5] = useState(
  //   conditionalAFC === 6 ? 4 : 6
  // );
  // const [currentQuestionIndex6, setCurrentQuestionIndex6] = useState(
  //   conditionalAFC === 6 ? 5 : 6
  // );
  // const [currentQuestion1, setCurrentQuestion1]: any = useState({});
  // const [currentQuestion2, setCurrentQuestion2]: any = useState({});
  // const [currentQuestion3, setCurrentQuestion3]: any = useState({});
  // const [currentQuestion4, setCurrentQuestion4]: any = useState({});
  // const [currentQuestion5, setCurrentQuestion5]: any = useState({});
  // const [currentQuestion6, setCurrentQuestion6]: any = useState({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ratingcondition, setRatingCondition]: any = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log(state.condition);
    questionArrayCreation();
    // console.log(questions);
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
      // AFC*queNO --> AFC*queNo + AFC
    } 
    // else {
    //   setCurrentQuestion1(questions[currentQuestionIndex1]);
    //   console.log(questions[currentQuestionIndex1]);
    //   setCurrentQuestion2(questions[currentQuestionIndex2]);
    //   setCurrentQuestion3(questions[currentQuestionIndex3]);
    //   setCurrentQuestion4(questions[currentQuestionIndex4]);
    //   setCurrentQuestion5(questions[currentQuestionIndex5]);
    //   setCurrentQuestion6(questions[currentQuestionIndex6]);
    // }

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
    // console.log(action,currentQuestionIndex)
    if (currentQuestionIndex <= questions.length - 1) {
      const currentTime = (600 - timer) * 1000;
      const response = {
        responseTime: currentTime,
        answer: currentQuestionIndex+1===action ? "fName1" : currentQuestionIndex+2===action ? "fName2" : currentQuestionIndex+3===action ? "fName3" : currentQuestionIndex+4===action ? "fName4" : currentQuestionIndex+5===action ? "fName5" : "fName6",
        fName1: questions[currentQuestionIndex].image,
        fName2: questions[currentQuestionIndex + 1].image,
        fName3: conditionalAFC>2 ? questions[currentQuestionIndex+2].image : "",
        fName4: conditionalAFC>2 ? questions[currentQuestionIndex+3].image : "",
        fName5: conditionalAFC>4 ? questions[currentQuestionIndex+4].image : "",
        fName6: conditionalAFC>4 ? questions[currentQuestionIndex+5].image : "",
      };
      setResponses((prevResponses) => [...prevResponses, response]);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + conditionalAFC);
    // setCurrentQuestionIndex2((prevIndex) => prevIndex + conditionalAFC);
    // setCurrentQuestionIndex3((prevIndex) => prevIndex + conditionalAFC);
    // setCurrentQuestionIndex4((prevIndex) => prevIndex + conditionalAFC);
    // setCurrentQuestionIndex5((prevIndex) => prevIndex + conditionalAFC);
    // setCurrentQuestionIndex6((prevIndex) => prevIndex + conditionalAFC);
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

  // function range(start: number, stop: number, step = 1) {
  //   return Array.from(
  //     { length: Math.ceil((stop - start) / step) },
  //     (_, i) => start + i * step
  //   );
  // }
  // const imageGrid = range(0, conditionalAFC);
  // const questionsArray = [{ questions }];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        // mt: 2,
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
        Question
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          // flexWrap: { xs: "wrap", sm: "wrap", md: "wrap" },
          // flexWrap: "wrap",
          // flexDirection: theme.breakpoints.only("sm") ? "column" : "row",
          // width: theme.breakpoints.only("sm") ? "50%" : "80%",
          alignItems: "center",
        }}
      >
          <Box>
            <Grid container spacing={1} sx={{
              flexGrow: 1,
              display: "flex",
              flexWrap: { sm: "wrap", md: "wrap" },
              m:2,
            }}>
            {questions
              .slice(
                currentQuestionIndex,
                currentQuestionIndex + conditionalAFC
              )
              .map((question: any, i: any) => (
                <Grid item xs={6} sm={6} md={6} lg={6} key={question.id}>
                  <Button
                    sx={{
                      // display: "flex",
                      // marginLeft: {xs:"5rem"},
                      // justifyContent:'center',
                      width: {
                        xs: "150px",
                        sm: "200px",
                        md: "200px",
                        lg: "200px",
                      },
                      height: {
                        xs: "150px",
                        sm: "200px",
                        md: "200px",
                        lg: "200px",
                      },
                      background: "white",
                      border: "1px solid black",
                      "&:hover": { border: "3.5px solid green" },
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
                        // objectFit: "cover",
                      }}
                    />
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            {/* <>
              {(() => {
                const elements = [];
                for (
                  let i = currentQuestionIndex1 * conditionalAFC;
                  i < currentQuestionIndex1 * conditionalAFC + conditionalAFC;
                  i++
                )
                {
                  elements.push(
                    <Grid
                      item
                      xs={
                        conditionalAFC === 2 ? 6 : conditionalAFC === 4 ? 6 : 4
                      }
                    >
                      <Button
                        sx={{
                          width: {
                            xs: "200px",
                            sm: "300px",
                            md: "300px",
                            lg: "400px",
                          },
                          height: {
                            xs: "200px",
                            sm: "300px",
                            md: "300px",
                            lg: "400px",
                          },
                          background: "white",
                          border: "1px solid black",
                          "&:hover": { border: "3.5px solid green" },
                          margin: ".5rem",
                        }}
                        onClick={() =>
                          handleLikeDislike(`${questions[i].image}`)
                        }
                      >
                        <img
                          // src={`${questions[i].image}`}
                          src={`/assets/${i+1}.jpg`}
                          alt={`Question ${i}`}
                          style={{
                            // height: 'auto',
                            width: "100%",
                            // border: "1.5px solid black",
                            maxWidth: "100%",
                            maxHeight: "100%",
                            minHeight: "100%",
                            // objectFit: "cover",
                          }}
                        />
                      </Button>
                    </Grid>
                   
                  );
                }
                return elements;
              })()}
            </> */}
            {/* 
            <Grid
              item
              xs={conditionalAFC === 2 ? 6 : conditionalAFC === 4 ? 6 : 4}
            >
              <Button
                sx={{
                  width: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
                  height: {
                    xs: "200px",
                    sm: "300px",
                    md: "300px",
                    lg: "400px",
                  },
                  background: "white",
                  border: "1px solid black",
                  "&:hover": { border: "3.5px solid green" },
                  margin: ".5rem",
                }}
                onClick={() => handleLikeDislike(currentQuestion1.image)}
              >
                <img
                  src={currentQuestion1.image}
                  alt={`Question ${currentQuestion1.id}`}
                  style={{
                    // height: 'auto',
                    width: "100%",
                    // border: "1.5px solid black",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    minHeight: "100%",
                    // objectFit: "cover",
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                sx={{
                  width: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
                  height: {
                    xs: "200px",
                    sm: "300px",
                    md: "300px",
                    lg: "400px",
                  },
                  background: "white",
                  border: "1px solid black",
                  "&:hover": { border: "3.5px solid green" },
                  margin: ".5rem",
                }}
                onClick={() => handleLikeDislike(currentQuestion2.image)}
              >
                <img
                  src={currentQuestion2.image}
                  alt={`Question ${currentQuestion2.id}`}
                  style={{
                    // height: 'auto',
                    width: "100%",
                    // border: "1.5px solid black",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    minHeight: "100%",
                    // objectFit: "cover",
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                sx={{
                  width: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
                  height: {
                    xs: "200px",
                    sm: "300px",
                    md: "300px",
                    lg: "400px",
                  },
                  background: "white",
                  border: "1px solid black",
                  "&:hover": { border: "3.5px solid green" },
                  margin: ".5rem",
                }}
                onClick={() => handleLikeDislike(currentQuestion3.image)}
              >
                <img
                  src={currentQuestion3.image}
                  alt={`Question ${currentQuestion3.id}`}
                  style={{
                    // height: 'auto',
                    width: "100%",
                    // border: "1.5px solid black",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    minHeight: "100%",
                    // objectFit: "cover",
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                sx={{
                  width: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
                  height: {
                    xs: "200px",
                    sm: "300px",
                    md: "300px",
                    lg: "400px",
                  },
                  background: "white",
                  border: "1px solid black",
                  "&:hover": { border: "3.5px solid green" },
                  margin: ".5rem",
                }}
                onClick={() => handleLikeDislike(currentQuestion4.image)}
              >
                <img
                  src={currentQuestion4.image}
                  alt={`Question ${currentQuestion4.id}`}
                  style={{
                    // height: 'auto',
                    width: "100%",
                    // border: "1.5px solid black",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    minHeight: "100%",
                    // objectFit: "cover",
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                sx={{
                  width: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
                  height: {
                    xs: "200px",
                    sm: "300px",
                    md: "300px",
                    lg: "400px",
                  },
                  background: "white",
                  border: "1px solid black",
                  "&:hover": { border: "3.5px solid green" },
                  margin: ".5rem",
                }}
                onClick={() => handleLikeDislike(currentQuestion5.image)}
              >
                <img
                  src={currentQuestion5.image}
                  alt={`Question ${currentQuestion5.id}`}
                  style={{
                    // height: 'auto',
                    width: "100%",
                    // border: "1.5px solid black",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    minHeight: "100%",
                    // objectFit: "cover",
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                sx={{
                  width: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
                  height: {
                    xs: "200px",
                    sm: "300px",
                    md: "300px",
                    lg: "400px",
                  },
                  background: "white",
                  border: "1px solid black",
                  "&:hover": { border: "3.5px solid green" },
                  margin: ".5rem",
                }}
                onClick={() => handleLikeDislike(currentQuestion6.image)}
              >
                <img
                  src={currentQuestion6.image}
                  alt={`Question ${currentQuestion6.id}`}
                  style={{
                    // height: 'auto',
                    width: "100%",
                    // border: "1.5px solid black",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    minHeight: "100%",
                    // objectFit: "cover",
                  }}
                />
              </Button>
            </Grid> */}
          </Grid>
        </Box>

        {/* <Button
          sx={{
            width: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
            height: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
            background: "white",
            border: "1px solid black",
            "&:hover": { border: "3.5px solid green" },
            margin: ".5rem",
          }}
          onClick={() => handleLikeDislike(currentQuestion.image)}
        >
          <img
            src={currentQuestion.image}
            alt={`Question ${currentQuestion.id}`}
            style={{
              // height: 400,
              width: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              minHeight: "100%",
              // border: "1.5px solid black",
              // objectFit: "cover",
            }}
          />
        </Button>
        <Button
          sx={{
            width: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
            height: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
            background: "white",
            border: "1px solid black",
            "&:hover": { border: "3.5px solid green" },
            margin: ".5rem",
          }}
          onClick={() => handleLikeDislike(currentQuestion3.image)}
        >
          <img
            src={currentQuestion3.image}
            alt={`Question ${currentQuestion3.id}`}
            style={{
              // height: 'auto',
              width: "100%",
              // border: "1.5px solid black",
              maxWidth: "100%",
              maxHeight: "100%",
              minHeight: "100%",
              // objectFit: "cover",
            }}
          />
        </Button>
        <Button
          sx={{
            width: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
            height: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
            background: "white",
            border: "1px solid black",
            "&:hover": { border: "3.5px solid green" },
            margin: ".5rem",
          }}
          onClick={() => handleLikeDislike(currentQuestion4.image)}
        >
          <img
            src={currentQuestion4.image}
            alt={`Question ${currentQuestion4.id}`}
            style={{
              // height: 'auto',
              width: "100%",
              // border: "1.5px solid black",
              maxWidth: "100%",
              maxHeight: "100%",
              minHeight: "100%",
              // objectFit: "cover",
            }}
          />
        </Button>
        <Button
          sx={{
            width: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
            height: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
            background: "white",
            border: "1px solid black",
            "&:hover": { border: "3.5px solid green" },
            margin: ".5rem",
          }}
          onClick={() => handleLikeDislike(currentQuestion5.image)}
        >
          <img
            src={currentQuestion5.image}
            alt={`Question ${currentQuestion5.id}`}
            style={{
              // height: 'auto',
              width: "100%",
              // border: "1.5px solid black",
              maxWidth: "100%",
              maxHeight: "100%",
              minHeight: "100%",
              // objectFit: "cover",
            }}
          />
        </Button>
        <Button
          sx={{
            width: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
            height: { xs: "200px", sm: "300px", md: "300px", lg: "400px" },
            background: "white",
            border: "1px solid black",
            "&:hover": { border: "3.5px solid green" },
            margin: ".5rem",
          }}
          onClick={() => handleLikeDislike(currentQuestion6.image)}
        >
          <img
            src={currentQuestion6.image}
            alt={`Question ${currentQuestion6.id}`}
            style={{
              // height: 'auto',
              width: "100%",
              // border: "1.5px solid black",
              maxWidth: "100%",
              maxHeight: "100%",
              minHeight: "100%",
              // objectFit: "cover",
            }}
          />
        </Button> */}
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "fixed",
          top: 20,
          right: theme.breakpoints.down("md") ? 25 : 100,
          p: 1,
          backgroundColor: "lightgray",
          borderRadius: 4,
        }}
      >
        <Typography variant="body1" sx={{ fontSize: 26 }}>
          {formatTime(timer)}
        </Typography>
      </Box>
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
