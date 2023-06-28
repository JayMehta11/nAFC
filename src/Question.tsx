import { useEffect, useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useLocation, useNavigate } from "react-router-dom";

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

  const [timer, setTimer] = useState(600); // 10 minutes in secondsf
  const [responses, setResponses] = useState<
    Array<{
      responseTime: number;
      answer: string;
      fName1: string;
      fName2: string;
      fName3: string;
      fName4: string;
      fName5: string;
      fName6: string;
    }>
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [currentQuestionIndex2, setCurrentQuestionIndex2] = useState(0);
  const [currentQuestion, setCurrentQuestion]: any = useState({});
  const [currentQuestion2, setCurrentQuestion2]: any = useState({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ratingcondition, setRatingCondition]: any = useState("");

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    questionArrayCreation();
    setRatingCondition(state.condition);

    // console.log(state.condition,"question array created");
  }, [state.condition]);

  useEffect(() => {
    if (currentQuestionIndex === questions.length - 1) {
      navigate("/endForm", { state: { ...state, responses: responses } });
    } else {
      setCurrentQuestion(questions[currentQuestionIndex]);
      setCurrentQuestion2(questions[currentQuestionIndex2]);
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
      navigate("/endForm", { state: { ...state, ...responses } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const handleLikeDislike = (action: any) => {
    if (currentQuestionIndex <= questions.length - 1) {
      const currentTime = (600 - timer) * 1000;
      const response = {
        responseTime: currentTime,
        answer: action,
        fName1: questions[currentQuestionIndex].image,
        fName2: questions[currentQuestionIndex2].image,
        fName3: "",
        fName4: "",
        fName5: "",
        fName6: "",
      };
      //add image name, user's age, nationality,
      setResponses((prevResponses) => [...prevResponses, response]);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 2);
    setCurrentQuestionIndex2((prevIndex) => prevIndex + 2);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const calculateProgress = () => {
    const answeredQuestions = currentQuestionIndex + 2;
    const totalQuestions = questions.length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  // const handleRatingChange = (value: any) => {
  //   if (currentQuestionIndex <= questions.length - 1) {
  //     const currentTime = (600 - timer) * 1000;
  //     const response = {
  //       responseTime: currentTime,
  //       answer: value,
  //       imageName: questions[currentQuestionIndex].image,
  //     };
  //     //add image name, user's age, nationality,
  //     setResponses((prevResponses) => [...prevResponses, response]);
  //   }
  //   setCurrentQuestionIndex((prevIndex) => prevIndex + 2);
  //   setCurrentQuestionIndex2((prevIndex) => prevIndex + 2);
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // mt: 2,
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
        Question
      </Typography>
      {/* npx create-react-app my-app --template typescript */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          flexWrap:'wrap',
          // flexDirection: theme.breakpoints.only("sm") ? "column" : "row",
          // width: theme.breakpoints.only("sm") ? "50%" : "80%",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            width: { xs: "90vw", sm: "300px", lg: "400px" },
            height: { xs: "90vw", sm: "300px", lg: "400px" },
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
              // objectFit: "cover",
            }}
          />
        </Button>
        <Button
          sx={{
            width: { xs: "250px", sm: "300px", lg: "400px" },
            // height:
            height: { xs: "90vw", sm: "300px", lg: "400px" },
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
              // border: "1.5px solid black",
              objectFit: "cover",
            }}
          />
        </Button>
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
