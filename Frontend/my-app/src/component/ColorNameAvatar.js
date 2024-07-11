import React from "react";
import { Avatar } from "@mui/material";

export default function ColorNameAvatar(prop) {
  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    if (!name) return "";
    return {
      sx: prop.sx
        ? { ...prop.sx, bgcolor: stringToColor(name) }
        : {
            bgcolor: stringToColor(name),
            height: "120px",
            width: "120px",
            fontSize: "36px",
            marginBottom: "20px",
          },
      children: name
        .split(" ")
        .map((part) => part.toUpperCase()[0])
        .join(""),
    };
  }
  return (
    <Avatar
      sx={{
        width: 120,
        height: 120,
        mb: 2,
      }}
      {...stringAvatar(prop.username)}
      src=""
      alt="User Avatar"
    />
  );
}
