import React from "react";
import { Box, Typography } from "@mui/material";

export default function Message(prop) {
  const { text, isSender } = prop;
  return (
    <Box
      sx={{
        display: "inline-block",
        marginLeft: isSender ? "auto" : 0,
        marginBlock: "10px",
        marginInline: "20px",
        padding: "10px",
        textAlign: "left",
        background: isSender
          ? "linear-gradient(90deg, rgba(83,207,255,1) 0%, rgba(100,85,240,1) 100%)"
          : "white",
        color: isSender ? "white" : "black",
        borderRadius: "15px",
        maxWidth: "80%",
        wordWrap: "break-word",
        alignSelf: isSender ? "flex-end" : "flex-start",
        boxShadow: 3
      }}
    >
      <Typography>{text}</Typography>
    </Box>
  );
}
