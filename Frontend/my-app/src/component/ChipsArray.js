import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

export default function ChipsArray(prop) {
  const { chipData, setChipData } = prop;

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => {
      console.log("Deleting chip at " + chipToDelete + " position");
      return [...(chips.slice(0, chipToDelete)), ...(chips.slice(chipToDelete + 1))];
    });
  };

  console.log("New chips: " + chipData)

  return (
    <Box sx={{ display: "flex", width: "100%", gap: "5px" }}>
      {chipData.map((data, index) => {
        return (
          <Chip key={index} label={data} onDelete={handleDelete(index)} />
        );
      })}
    </Box>
  );
}
