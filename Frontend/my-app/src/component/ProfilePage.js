import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  FASSMajor,
  SOBMajor,
  SOCMajor,
  CDEMajor,
  YLLSOMMajor,
  YSTCMMajor,
  SSHSOPHMajors,
  FOSMajor,
  educationStatus,
  singaporeLocations,
  nationalities,
} from "../data/FormOptions";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  MenuItem,
  ListSubheader,
  Button,
  TableHead,
} from "@mui/material";
import dayjs from "dayjs";
import StyledButton from "./StyledButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProfilePage(prop) {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [editedProfile, setEditedProfile] = React.useState(prop.profile);
  const {
    username,
    email,
    first_major,
    second_major,
    education_status,
    year_of_study,
    nationality,
    gender,
    birthday,
    location,
    interests,
    description,
  } = prop.profile;

  const year_th =
    year_of_study === 1
      ? "st"
      : year_of_study === 2
      ? "nd"
      : year_of_study === 3
      ? "rd"
      : "th";

  const [interest, setInterest] = React.useState("");

  function addInterest() {
    if (interest === "") return;
    setEditedProfile((prev) => {
      const newInterests = [...prev.interests, interest];
      return {
        ...prev,
        interests: newInterests,
      };
    });
    setInterest("");
  }

  function deleteInterest(index) {
    const interestArr = editedProfile.interests;
    const newInterests = [
      ...interestArr.slice(0, index),
      ...interestArr.slice(index + 1),
    ];
    setEditedProfile((prev) => {
      return {
        ...prev,
        interests: newInterests,
      };
    });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card
        sx={{
          background: "#EFF9FF",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            fullHeight
          >
            <Avatar
              sx={{ width: 120, height: 120, mb: 2 }}
              //TODO: replace with user's own uploaded avatar
              src=""
              alt="User Avatar"
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
              }}
            >
              {isEditMode ? (
                <TextField
                  id="username"
                  label="Username"
                  name="username"
                  value={editedProfile.username}
                  onChange={handleChange}
                >
                  Username
                </TextField>
              ) : (
                <Typography variant="h4" sx={{ marginRight: "5px" }}>
                  {username}
                </Typography>
              )}
              {isEditMode ? (
                <TextField
                  select
                  id="gender"
                  label="Gender"
                  name="gender"
                  value={editedProfile.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Prefer not to say">
                    Prefer not to say
                  </MenuItem>
                </TextField>
              ) : (
                <Typography component="h5" variant="body2" color="gray">
                  {gender === "Male"
                    ? "(he/him)"
                    : gender === "Female"
                    ? "(she/her)"
                    : ""}
                </Typography>
              )}
            </Box>
            <Typography variant="subtitle1" color="textSecondary">
              {email}
            </Typography>
            {isEditMode ? (
              <TextField
                id="description"
                label="description"
                name="description"
                value={editedProfile.description}
                sx={{ width: "75%" }}
                onChange={handleChange}
              >
                Description
              </TextField>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  margin: "20px",
                  fontWeight: "lighter",
                  maxWidth: "75%",
                  textAlign: "center",
                }}
              >
                {description}
              </Typography>
            )}
            {isEditMode ? (
              <Grid sx={{ display: "flex", gap: "20px" }}>
                <Grid>
                  <StyledButton
                    variant="contained"
                    text="Save"
                    onClick={() => {
                      setIsEditMode(false);
                    }}
                  />
                </Grid>
                <Grid>
                  <StyledButton
                    variant="contained"
                    text="Cancel"
                    background="linear-gradient(90deg, rgba(240,11,81,1) 0%, rgba(128,8,45,1) 100%)"
                    onClick={() => {
                      setIsEditMode(false);
                      setEditedProfile(prop.profile);
                    }}
                  />
                </Grid>
              </Grid>
            ) : (
              <StyledButton
                variant="contained"
                text="Edit Profile"
                onClick={() => {
                  setIsEditMode(true);
                }}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      <Box mt={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, height: "100%", width: "100%" }}>
              <Typography variant="h6" gutterBottom>
                NUS Profile
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        First Major:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {isEditMode ? (
                          <TextField
                            select
                            sx={{ width: "100%" }}
                            id="first_major"
                            name="first_major"
                            value={editedProfile.first_major}
                            onChange={handleChange}
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
                        ) : (
                          <>{first_major}</>
                        )}
                      </TableCell>
                    </TableRow>
                    {second_major && (
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Second Major:
                        </TableCell>
                        <TableCell style={{ fontWeight: "lighter" }}>
                          {isEditMode ? (
                            <TextField
                              select
                              sx={{ width: "100%" }}
                              id="second_major"
                              name="second_major"
                              value={editedProfile.second_major}
                              onChange={handleChange}
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
                          ) : (
                            <>{second_major}</>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Education Status:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {isEditMode ? (
                          <TextField
                            select
                            sx={{ width: "100%" }}
                            id="education_status"
                            name="education_status"
                            value={editedProfile.education_status}
                            onChange={handleChange}
                          >
                            {educationStatus.map((status) => (
                              <MenuItem key={status} value={status}>
                                {status}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : (
                          <>{education_status}</>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Year of Study:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {isEditMode ? (
                          <TextField
                            select
                            sx={{ width: "100%" }}
                            id="year_of_study"
                            name="year_of_study"
                            value={editedProfile.year_of_study}
                            onChange={handleChange}
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                          </TextField>
                        ) : (
                          <>
                            {year_of_study}
                            {year_th} year
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Nationality:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {isEditMode ? (
                          <TextField
                            select
                            sx={{ width: "100%" }}
                            id="nationality"
                            name="nationality"
                            value={editedProfile.nationality}
                            onChange={handleChange}
                          >
                            {nationalities.map((nationality) => (
                              <MenuItem key={nationality} value={nationality}>
                                {nationality}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : (
                          <>{nationality}</>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, height: "100%", width: "100%" }}>
              <Typography variant="h6" gutterBottom>
                About Me
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Birthday:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {isEditMode ? (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              id="birthday"
                              slotProps={{
                                textField: {
                                  variant: "outlined",
                                },
                              }}
                              inputFormat="MM/dd/yyyy"
                              name="birthday"
                              value={dayjs(editedProfile.birthday)}
                              onChange={(date) =>
                                setEditedProfile((prev) => {
                                  return { ...prev, birthday: dayjs(date) };
                                })
                              }
                            />
                          </LocalizationProvider>
                        ) : (
                          <>{dayjs(birthday).format("MMM D YYYY")}</>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Location:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {isEditMode ? (
                          <TextField
                            select
                            sx={{ width: "100%" }}
                            id="location"
                            name="location"
                            value={editedProfile.location}
                            onChange={handleChange}
                          >
                            {singaporeLocations.map((location) => (
                              <MenuItem key={location} value={location}>
                                {location}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : (
                          <>{location}</>
                        )}
                      </TableCell>
                    </TableRow>
                    {isEditMode ? (
                      <TableRow>
                        <TableCell colSpan={2}>
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography variant="body1" sx={{fontSize:"18px", fontWeight: "600"}}>
                              Interest:
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                              <TextField
                                id="interest"
                                fullWidth
                                label="Interest"
                                placeholder="Please enter your interests"
                                name="interest"
                                onChange={(event) =>
                                  setInterest(event.target.value)
                                }
                              />
                              <Button
                                sx={{ marginLeft: "auto" }}
                                onClick={addInterest}
                              >
                                <AddIcon />
                              </Button>
                            </Box>
                            <TableContainer component={Paper} sx={{ mt: 2 }}>
                              <Table width="100%">
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="left">No.</TableCell>
                                    <TableCell align="center">
                                      Interest
                                    </TableCell>
                                    <TableCell align="right">Modify</TableCell>
                                  </TableRow>
                                </TableHead>
                                {editedProfile.interests.map(
                                  (interest, index) => (
                                    <TableRow>
                                      <TableCell align="left">
                                        {index + 1}
                                      </TableCell>
                                      <TableCell align="center">
                                        {interest}
                                      </TableCell>
                                      <TableCell align="right">
                                        <Button>
                                          <DeleteIcon
                                            onClick={() =>
                                              deleteInterest(index)
                                            }
                                          />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </Table>
                            </TableContainer>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Interest:
                        </TableCell>
                        <TableCell>
                          <ul
                            style={{
                              listStyleType: "disc",
                              margin: 0,
                              paddingInlineStart: "20px",
                            }}
                          >
                            {interests.map((interest, index) => (
                              <li key={index} style={{ fontWeight: "lighter" }}>
                                {interest}
                              </li>
                            ))}
                          </ul>
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Personality:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        Nil
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
