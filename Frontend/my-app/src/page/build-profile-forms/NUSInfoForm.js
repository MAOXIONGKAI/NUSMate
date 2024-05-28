import React from "react";
import Box from "@mui/material/Box";
import { FormControl, MenuItem, ListSubheader } from "@mui/material";
import { TextField, Typography } from "@mui/material";
import { educationStatus, nationalities } from "../../data/FormOptions";
import {
  FASSMajor,
  SOBMajor,
  SOCMajor,
  CDEMajor,
  YLLSOMMajor,
  YSTCMMajor,
  SSHSOPHMajors,
  FOSMajor,
} from "../../data/FormOptions";

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
        Share with us more about your schoollife in NUS!
      </Typography>
      <FormControl sx={{ width: "50%", gap: "30px" }}>
        <TextField
          autoFocus
          id="first_major"
          select
          required
          error={prop.error["First_Major"]}
          label="First Major"
          helperText="Please select your first major"
          name="first_major"
          value={prop.formData.first_major}
          onChange={prop.handleChange}
        >
          <ListSubheader
            sx={{
              fontWeight: "1000",
              color: "Black",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            Faculty of Arts & Social Science
          </ListSubheader>
          {FASSMajor.map((major) => (
            <MenuItem
              key={major}
              value={major}
              sx={{ color: "dimgray", fontWeight: "400" }}
            >
              {major}
            </MenuItem>
          ))}

          <ListSubheader
            sx={{
              fontWeight: "1000",
              color: "Black",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            School of Business
          </ListSubheader>
          {SOBMajor.map((major) => (
            <MenuItem
              key={major}
              value={major}
              sx={{ color: "dimgray", fontWeight: "400" }}
            >
              {major}
            </MenuItem>
          ))}

          <ListSubheader
            sx={{
              fontWeight: "1000",
              color: "Black",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            School of Computing
          </ListSubheader>
          {SOCMajor.map((major) => (
            <MenuItem
              key={major}
              value={major}
              sx={{ color: "dimgray", fontWeight: "400" }}
            >
              {major}
            </MenuItem>
          ))}

          <ListSubheader
            sx={{
              fontWeight: "1000",
              color: "Black",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            College of Design & Engineering
          </ListSubheader>
          {CDEMajor.map((major) => (
            <MenuItem
              key={major}
              value={major}
              sx={{ color: "dimgray", fontWeight: "400" }}
            >
              {major}
            </MenuItem>
          ))}

          <ListSubheader
            sx={{
              fontWeight: "1000",
              color: "Black",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            Yong Loo Lin School of Medicine
          </ListSubheader>
          {YLLSOMMajor.map((major) => (
            <MenuItem
              key={major}
              value={major}
              sx={{ color: "dimgray", fontWeight: "400" }}
            >
              {major}
            </MenuItem>
          ))}

          <ListSubheader
            sx={{
              fontWeight: "1000",
              color: "Black",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            Yong Siew Toh Conservatory of Music
          </ListSubheader>
          {YSTCMMajor.map((major) => (
            <MenuItem
              key={major}
              value={major}
              sx={{ color: "dimgray", fontWeight: "400" }}
            >
              {major}
            </MenuItem>
          ))}

          <ListSubheader
            sx={{
              fontWeight: "1000",
              color: "Black",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            Faculty of Science
          </ListSubheader>
          {FOSMajor.map((major) => (
            <MenuItem
              key={major}
              value={major}
              sx={{ color: "dimgray", fontWeight: "400" }}
            >
              {major}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="second_major"
          select
          label="Second Major"
          helperText="Please select your second major(if applicable)"
          name="second_major"
          value={prop.formData.second_major}
          onChange={prop.handleChange}
        >
          <ListSubheader
            sx={{
              fontWeight: "1000",
              color: "Black",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            Faculty of Arts & Social Science
          </ListSubheader>
          {FASSMajor.map((major) => (
            <MenuItem
              key={major}
              value={major}
              sx={{ color: "dimgray", fontWeight: "400" }}
            >
              {major}
            </MenuItem>
          ))}

          <ListSubheader
            sx={{
              fontWeight: "1000",
              color: "Black",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            School of Business
          </ListSubheader>
          {SOBMajor.map((major) => (
            <MenuItem
              key={major}
              value={major}
              sx={{ color: "dimgray", fontWeight: "400" }}
            >
              {major}
            </MenuItem>
          ))}

          <ListSubheader
            sx={{
              fontWeight: "1000",
              color: "Black",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            School of Computing
          </ListSubheader>
          {SOCMajor.map((major) => (
            <MenuItem
              key={major}
              value={major}
              sx={{ color: "dimgray", fontWeight: "400" }}
            >
              {major}
            </MenuItem>
          ))}

          <ListSubheader
            sx={{
              fontWeight: "1000",
              color: "Black",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            College of Design & Engineering
          </ListSubheader>
          {CDEMajor.map((major) => (
            <MenuItem
              key={major}
              value={major}
              sx={{ color: "dimgray", fontWeight: "400" }}
            >
              {major}
            </MenuItem>
          ))}

          <ListSubheader
            sx={{
              fontWeight: "1000",
              color: "Black",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            Yong Loo Lin School of Medicine
          </ListSubheader>
          {YLLSOMMajor.map((major) => (
            <MenuItem
              key={major}
              value={major}
              sx={{ color: "dimgray", fontWeight: "400" }}
            >
              {major}
            </MenuItem>
          ))}

          <ListSubheader
            sx={{
              fontWeight: "1000",
              color: "Black",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            Yong Siew Toh Conservatory of Music
          </ListSubheader>
          {YSTCMMajor.map((major) => (
            <MenuItem
              key={major}
              value={major}
              sx={{ color: "dimgray", fontWeight: "400" }}
            >
              {major}
            </MenuItem>
          ))}

          <ListSubheader
            sx={{
              fontWeight: "1000",
              color: "Black",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            Saw Swee Hock School of Public Health
          </ListSubheader>
          {SSHSOPHMajors.map((major) => (
            <MenuItem
              key={major}
              value={major}
              sx={{ color: "dimgray", fontWeight: "400" }}
            >
              {major}
            </MenuItem>
          ))}

          <ListSubheader
            sx={{
              fontWeight: "1000",
              color: "Black",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            Faculty of Science
          </ListSubheader>
          {FOSMajor.map((major) => (
            <MenuItem
              key={major}
              value={major}
              sx={{ color: "dimgray", fontWeight: "400" }}
            >
              {major}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="education_status"
          select
          required
          error={prop.error["Education_Status"]}
          label="Education Status"
          helperText="Please select your education status"
          name="education_status"
          value={prop.formData.education_status}
          onChange={prop.handleChange}
        >
          {educationStatus.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="year-of-study"
          select
          required
          error={prop.error["Year_of_Study"]}
          label="Year of Study"
          helperText="Please select your year of study"
          name="year_of_study"
          value={prop.formData.year_of_study}
          onChange={prop.handleChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </TextField>

        <TextField
          id="nationality"
          select
          required
          error={prop.error["Nationality"]}
          label="Nationality"
          helperText="Please select your nationality"
          name="nationality"
          value={prop.formData.nationality}
          onChange={prop.handleChange}
        >
          {nationalities.map((nationality) => (
            <MenuItem key={nationality} value={nationality}>
              {nationality}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Box>
  );
}
