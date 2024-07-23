import React from "react";
import "../index.css";
import { Typography, Box } from "@mui/material";
import NoMessage from "../image/NoMessage.jpg";
import NoChatSelected from "../image/NoChatSelected.jpg";
import Message from "./Message";

export default function ChatMessages(prop) {
  const { messages, userID, latestMsg, currentFriend } = prop;

  return (
    <>
      {!currentFriend ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "20px"
          }}
        >
          <img
            src={NoChatSelected}
            alt="No Chat Selected Background"
            style={{ width: "40%" }}
          />
          <Typography
            sx={{
              fontFamily: "Handlee, sans-serif",
              fontWeight: 500,
              fontSize: "24px",
            }}
          >
            Select a Friend and start chatting!
          </Typography>
        </Box>
      ) : messages.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            style={{ width: "35%", borderRadius: "50%", marginBlock: "25px" }}
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
            No messages found at the moment
            <br />
            Try send a message or visit later
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            height: "100%",
          }}
        >
          {messages.map((message) => (
            <Message
              key={message.id}
              text={message.text}
              isSender={message.sender === userID}
            />
          ))}
          <div ref={latestMsg}></div>
        </Box>
      )}
    </>
  );
}
