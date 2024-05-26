import React from "react";
import Box from "@mui/material/Box";
import { FormControl, MenuItem } from "@mui/material";
import { TextField, Typography } from "@mui/material";
import { nationalities } from "../../data/FormOptions";

export default function NUSInfoForm(prop) {
  return (
    <Box
      component="form"
      noValidate
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "30px",
        margin: "30px",
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        align="center"
        style={{
          fontFamily: "Handlee, sans-serif",
          fontWeight: "600",
        }}
      >
        Share us more about your schoollife in NUS!
      </Typography>
      <FormControl sx={{ width: "50%", gap: "30px" }}>
        <TextField
          id="major"
          select
          label="Major"
          helperText="Please select your major"
          name="major"
          value={prop.formData.major}
          onChange={prop.handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </TextField>

        <TextField
          id="year-of-study"
          select
          label="Year of Study"
          helperText="Please select your year of study"
          name="year_of_study"
          value={prop.formData.year_of_study}
          onChange={prop.handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </TextField>

        <TextField
          id="nationality"
          select
          label="Nationality"
          helperText="Please select your nationality"
          name="nationality"
          value={prop.formData.nationality}
          onChange={prop.handleChange}
        >
          {nationalities.map((nationality) => (
            <MenuItem key={nationality} value={nationality}>{nationality}</MenuItem>
          ))}
        </TextField>

        <TextField
          id="cca"
          select
          label="CCA"
          helperText="Please select your CAA"
          name="cca"
          value={prop.formData.cca}
          onChange={prop.handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </TextField>
      </FormControl>
    </Box>
  );
}
