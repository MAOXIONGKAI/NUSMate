import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

export default function ToggleMenu(prop) {
  const { value, setValue, options } = prop;
  const handleMenuChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <ToggleButtonGroup
      {...prop}
      color="primary"
      exclusive
      value={value}
      onChange={handleMenuChange}
      aria-label="platform"
    >
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {option.value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
