import React from "react";
import StyledButton from "../../component/StyledButton";
import { Typography, Box } from "@mui/material";
import CircularIndeterminate from "../../component/CircularIndeterminate";
import CreatePersonalityTest from "../../data/CreatePersonalityTest";
import GetTestResult from "../../data/GetTestResult";

import ENFJ from "../../image/Personality/ENFJ.jpg";
import ENFP from "../../image/Personality/ENFP.jpg";
import ENTJ from "../../image/Personality/ENTJ.jpg";
import ENTP from "../../image/Personality/ENTP.jpg";
import ESFJ from "../../image/Personality/ESFJ.jpg";
import ESFP from "../../image/Personality/ESFP.jpg";
import ESTJ from "../../image/Personality/ESTJ.jpg";
import ESTP from "../../image/Personality/ESTP.jpg";
import INFJ from "../../image/Personality/INFJ.jpg";
import INFP from "../../image/Personality/INFP.jpg";
import INTJ from "../../image/Personality/INTJ.jpg";
import INTP from "../../image/Personality/INTP.jpg";
import ISFJ from "../../image/Personality/ISFJ.jpg";
import ISFP from "../../image/Personality/ISFP.jpg";
import ISTJ from "../../image/Personality/ISTJ.jpg";
import ISTP from "../../image/Personality/ISTP.jpg";

export default function PersonalityTest(prop) {
  // Retrieve the saved generated testID before user enter the test
  const savedID = window.localStorage.getItem("testID");

  // Generate the next set of test for new users
  // Or if the current user wants to retake again
  const response = CreatePersonalityTest(prop.formData.username);
  const testURL = response[0];

  // Get test result after user finish the test and redirect back to this page
  // If the user is taking test for the first time, do not generate any result
  const [testID, setTestID] = React.useState(savedID ? savedID : "");

  // Keep track of whether the page is loading the personality test
  const [isLoading, setIsLoading] = React.useState(false);

  // Evaluate whether the user has completed based on the content of the result
  const result = GetTestResult(testID);
  const complete = result !== undefined;

  React.useEffect(() => {
    if (complete) {
      prop.setFormData((prev) => ({
        ...prev,
        personality: result.prediction,
      }));
    }
  }, [complete]);

  React.useEffect(() => {
    window.localStorage.setItem("testID", testID);
  }, [testID]);

  const handleClick = (event) => {
    event.preventDefault();
    // Remember the current test ID before directing to the external test URL
    setIsLoading(true);
    setTestID(response[1]);
    window.location.href = testURL;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading && <CircularIndeterminate />}
      {complete ? (
        <>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            style={{
              fontFamily: "Handlee, sans-serif",
              fontWeight: "600",
              marginTop: "20px",
              marginBottom: "30px",
            }}
          >
            Thank you for filling up the form!
            <br />
            Your personality is
          </Typography>
          <img
            src={
              result.prediction === "ENFJ"
                ? ENFJ
                : result.prediction === "ENFP"
                ? ENFP
                : result.prediction === "ENTJ"
                ? ENTJ
                : result.prediction === "ENTP"
                ? ENTP
                : result.prediction === "ESFJ"
                ? ESFJ
                : result.prediction === "ESFP"
                ? ESFP
                : result.prediction === "ESTJ"
                ? ESTJ
                : result.prediction === "ESTP"
                ? ESTP
                : result.prediction === "INFJ"
                ? INFJ
                : result.prediction === "INFP"
                ? INFP
                : result.prediction === "INTJ"
                ? INTJ
                : result.prediction === "INTP"
                ? INTP
                : result.prediction === "ISFJ"
                ? ISFJ
                : result.prediction === "ISFP"
                ? ISFP
                : result.prediction === "ISTJ"
                ? ISTJ
                : ISTP
            }
            width="25%"
            alt="Personality Test Outcome"
          />
          <Typography
            component="h1"
            variant="h5"
            align="center"
            style={{
              fontFamily: "Handlee, sans-serif",
              fontWeight: "600",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            If you are unsatisfied with the result,
            <br />
            feel free to retake the test once again!
          </Typography>
        </>
      ) : (
        <>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            style={{
              fontFamily: "Handlee, sans-serif",
              fontWeight: "600",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            You are almost there!
            <br />
            Now just help us fill up a personality test form
            <br />
            to help us understand you better!
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            style={{
              fontFamily: "Handlee, sans-serif",
              fontSize: "20px",
              fontWeight: "500",
              color: "rgb(240, 0, 0)",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            Please take note this quiz takes around 20 mins to finish.
            <br />
            For accuracy of test result, please fill up majority of the
            questions.
            <br />
            However, it is not compulsory to finish all the questions.
            <br />
            As long as the form is not empty, a test result can be generated.
            <br />
            If you are unsatisfied with the test result, you can always retake
            test in edit profile section.
          </Typography>
        </>
      )}
      <StyledButton
        text={complete ? "Retake the test" : "Start the test"}
        style={{ color: "white" }}
        onClick={handleClick}
      />
    </Box>
  );
}
