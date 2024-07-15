import React from "react";
import { Box, Typography } from "@mui/material";
import ColorNameAvatar from "./ColorNameAvatar";

export default function MiniUserCard(prop) {
  const { isHost, username } = prop;
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        position: "relative",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        boxShadow: 3,
      }}
    >
      <ColorNameAvatar
        username={username}
        sx={{
          fontSize: "14px",
          height: "40px",
          width: "40px",
          margin: "8px",
        }}
      />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%)",
          }}
        >
          <Typography>{username}</Typography>
          {isHost && (
            <Box
              sx={{
                color: "white",
                backgroundColor: "green",
                borderRadius: "12px",
              }}
            >
              <Typography sx={{ fontSize: "14px", padding: "6px" }}>
                Host
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
