import React from "react";
import { Button } from "@mui/material";

export default function StyledButton(prop) {
  return (
    <Button
      fullWidth={prop.fullWidth}
      sx={{
        mt: 3,
        mb: 2,
        background: prop.background
          ? prop.background
          : "linear-gradient(90deg, rgba(83,207,255,1) 0%, rgba(100,85,240,1) 100%)",
      }}
      style={prop.style}
      to={prop.to}
      component={prop.component}
      type={prop.type}
      variant={prop.variant}
      onClick={prop.onClick}
    >
      {prop.text}
    </Button>
  );
}
