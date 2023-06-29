import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface Country {
  text: string;
  value: string;
}

const Forms = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [nationality, setNationality] = useState("");
  // const [myData, setMyData] = React.useState([{}]);
  const [countries, setCountries] = useState<Country[]>([]);
  // const [selectedCountry, setSelectedCountry] = useState("");
  // const [ratingcondition, setRatingCondition]: any = useState("");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    // setRatingCondition(Math.random() < 0.5 ? "likeDislike" : "ratings");
    // setTimestamp(new Date().toLocaleString())
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    } as Intl.DateTimeFormatOptions;

    const formattedTime = new Date().toLocaleString([], options);
    setTimestamp(formattedTime);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://trial.mobiscroll.com/content/countries.json"
      );
      const data = await response.json();
      setCountries(data as Country[]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSelectChange = (event: any) => {
    setNationality(event.target.value);
  };
  const numbers = [2, 4, 6];
  // Randomly select an integer from the array
  const randomIndex = Math.floor(Math.random() * numbers.length);
  const nAFC = numbers[randomIndex];
  // Output the randomly selected integer
  // console.log(randomInteger,'INT');

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 15,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        Tell us a bit about yourself
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "300px", marginTop: 4 }}>
        <TextField
          label="Age"
          variant="outlined"
          type="number"
          value={age}
          onChange={(event) => setAge(event.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <FormControl component="fieldset" margin="normal" required>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            row
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <FormControl variant="outlined" margin="normal" fullWidth required>
          <FormLabel component="legend">
            Highest Education Qualification
          </FormLabel>
          <Select
            value={education}
            onChange={(event) => setEducation(event.target.value as string)}
            label="Highest Education Qualification"
            required
          >
            <MenuItem value="school">School</MenuItem>
            <MenuItem value="college">College</MenuItem>
            <MenuItem value="master">Master or Higher</MenuItem>
          </Select>
        </FormControl>
        {/* <TextField
          label="Nationality"
          variant="outlined"
          value={nationality}
          onChange={(event) => setNationality(event.target.value)}
          required
          fullWidth
          margin="normal"
        /> */}
        <FormControl variant="outlined" margin="normal" fullWidth required>
          <FormLabel component="legend">Nationality</FormLabel>

          <Select value={nationality} onChange={handleSelectChange}>
            {countries.map((country, index) => (
              <MenuItem key={index} value={country.text}>
                {country.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {age && gender && nationality && education ? (
          <Button
            sx={{ mt: 2, fontWeight: 700 }}
            variant="contained"
            component={Link}
            to="/question"
            state={{
              age: age,
              gender: gender,
              education: education,
              nationality: nationality,
              // condition: ratingcondition,
              timestamp: timestamp,
              sessionId: uuidv4(),
              condition: nAFC,
            }}
            color="primary"
            type="submit"
            fullWidth
          >
            Start
          </Button>
        ) : (
          <Button variant="contained" fullWidth disabled>
            Start
          </Button>
        )}
      </form>
    </Box>
  );
};

export default Forms;
