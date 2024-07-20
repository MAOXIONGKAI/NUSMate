import React from "react";
import { Typography, Box } from "@mui/material";
import NoMessage from "../image/NoMessage.jpg";

export default function ChatMessages(prop) {
  const { messages } = prop;
  return (
    <>
      {messages.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <img
            style={{ width: "30%", borderRadius: "50%", marginBlock: "20px" }}
            src={NoMessage}
            alt="No Message Background"
          />
          <Typography
            sx={{
              fontFamily: "Handlee, sans-serif",
              fontWeight: 500,
              fontSize: "24px",
            }}
          >
            No Messages found at the moment<br/>
            Try send a message or visit later
          </Typography>
        </Box>
      ) : (
        messages.map((message) => <Typography>{message.text}</Typography>)
      )}
    </>
  );
}
