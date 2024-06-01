import React from 'react'
import { Typography } from '@mui/material';

export default function PersonalityTest(prop) {
    return (
        <>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={{
            fontFamily: "Handlee, sans-serif",
            fontWeight: "600",
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >
            You are almost there!<br />Now just help us fill up a personality test form<br />to help us understand you better!
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={{
            fontFamily: "Handlee, sans-serif",
            fontWeight: "600",
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >
            Feature to be completed in feature Milestones<br/>However, you can still finish set up your profile<br/> by clicking the submit button below!<br/>Thank you!
        </Typography>
        </>
    );
}