import React from "react";
import dayjs from "dayjs";

import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  MenuItem,
  FormHelperText,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Paper,
  TableHead,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Typography } from "@mui/material";

import { singaporeLocations } from "../../data/FormOptions";

export default function PersonalForm(prop) {
  const [interest, setInterest] = React.useState("");

  function addInterest() {
    if (interest === "") return;
    prop.setFormData((prev) => {
      const newInterests = [...prev.interests, interest];
      return {
        ...prev,
        interests: newInterests,
      };
    });
    setInterest("");
  }

  function deleteInterest(index) {
    const interestArr = prop.formData.interests;
    console.log(index);
    const newInterests = [
      ...interestArr.slice(0, index),
      ...interestArr.slice(index + 1),
    ];
    prop.setFormData((prev) => {
      return {
        ...prev,
        interests: newInterests,
      };
    });
  }

  return (
    <Box
      component="form"
      noValidate
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        align="center"
        style={{
          fontFamily: "Handlee, sans-serif",
          fontWeight: "600",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        Great!
        <br />
        Now please share with us more about yourself!
        <br />
        so that we can finish creating your profile!
      </Typography>

      <FormControl sx={{ width: "50%", gap: "40px" }}>
        <TextField
          autoFocus
          id="gender"
          select
          required
          error={prop.error["Gender"]}
          label="Gender"
          helperText="Please select your gender"
          name="gender"
          value={prop.formData.gender}
          onChange={prop.handleChange}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
        </TextField>

        <FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="birthday"
              label="Birthday"
              slotProps={{ textField: { variant: 'outlined' } }}
              error={prop.error["Birthday"]}
              inputFormat="MM/dd/yyyy"
              name="birthday"
              value={dayjs(prop.formData.birthday)}
              onChange={(date) =>
                prop.setFormData((prev) => {
                  return { ...prev, birthday: dayjs(date) };
                })
              }
            />
          </LocalizationProvider>
          <FormHelperText>Select your birth date</FormHelperText>
        </FormControl>

        <TextField
          id="location"
          select
          required
          error={prop.error["Location"]}
          label="Location"
          helperText="Please select your location"
          name="location"
          value={prop.formData.location}
          onChange={prop.handleChange}
        >
          {singaporeLocations.map((location) => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              id="interest"
              fullWidth
              label="Interest"
              placeholder="Please enter your interests"
              name="interest"
              value={interest}
              onChange={(event) => {
                setInterest(event.target.value);
              }}
            />
            <Button sx={{ marginLeft: "auto" }} onClick={addInterest}>
              <AddIcon />
            </Button>
          </Box>
          <FormHelperText>
            Please input your interests/hobby/passion
          </FormHelperText>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table width="100%">
              <TableHead>
                <TableRow>
                  <TableCell align="left">No.</TableCell>
                  <TableCell align="center">Interest</TableCell>
                  <TableCell align="right">Modify</TableCell>
                </TableRow>
              </TableHead>
              {prop.formData.interests.map((interest, index) => (
                <TableRow>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="center">{interest}</TableCell>
                  <TableCell align="right">
                    <Button>
                      <DeleteIcon onClick={() => deleteInterest(index)} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </TableContainer>
        </Box>

        <TextField
        helperText="Add a short description to help others know you better!"
          margin="normal"
          fullWidth
          multiline
          rows={5}
          id="description"
          label="Description"
          autoFocus
          name="description"
          value={prop.formData.description}
          onChange={prop.handleChange}
        />
      </FormControl>
    </Box>
  );
}
