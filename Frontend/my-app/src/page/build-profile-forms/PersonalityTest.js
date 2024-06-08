import React from "react";
import StyledButton from "../../component/StyledButton";
import { Typography, Box } from "@mui/material";
import CreatePersonalityTest from "../../data/CreatePersonalityTest";

export default function PersonalityTest(prop) {
  const testURL = CreatePersonalityTest(prop.formData.username);

  const handleClick = () => {
    window.location.href = testURL
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
      <StyledButton
        text="Start the test"
        style={{ color: "white" }}
        onClick={handleClick}
      />
    </Box>
  );
}
