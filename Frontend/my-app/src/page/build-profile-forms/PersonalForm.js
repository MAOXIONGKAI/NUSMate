import React from "react";
import dayjs from "dayjs";

import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  MenuItem,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
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
    prop.setFormData((prev) => {
      const newInterests = [...prev.interests, interest];
      return {
        ...prev,
        interests: newInterests,
      };
    });
    setInterest("")
  }

  function deleteInterest(index) {
    const interestArr = prop.formData.interests
    console.log(index)
    const newInterests = [...interestArr.slice(0, index), 
      ...interestArr.slice(index + 1)]
    prop.setFormData((prev) => {
      return {
        ...prev,
        interests: newInterests
      }
    })
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

      <FormControl sx={{ width: "50%", gap: "30px" }}>
        <TextField
          autoFocus
          id="gender"
          select
          required
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
              label="Birthday"
              renderInput={(params) => <TextField {...params} />}
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

        <Box fullWidth sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              fullWidth
              label="Interest"
              placeholder="Please enter your interests"
              value={interest}
              onChange={(event) => {setInterest(event.target.value)}}
            />
            <Button sx={{ marginLeft: "auto" }} onClick={addInterest}>
              <AddIcon />
            </Button>
          </Box>
          <List>
            {prop.formData.interests.map((interest, index) => (
              <ListItem key={index}>
                <Box
                  sx={{ display: "flex", flexDirection: "row", width: "100%"}}
                >
                  <ListItemText>{interest}</ListItemText>
                  <Button sx={{ marginLeft: "auto" }} onClick={() => deleteInterest(index)}>
                    <DeleteIcon />
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        <TextField
          margin="normal"
          required
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
