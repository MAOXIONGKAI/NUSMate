import React from "react";
import axios from "axios";
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
import CustomizedSnackbar from "./CustomizedSnackbar";
import Alert from "@mui/material/Alert";
import ColorNameAvatar from "./ColorNameAvatar";
import AlertDialogSlide from "./AlertDialogSlide";
import CircularIndeterminate from "./CircularIndeterminate";
import CreatePersonalityTest from "../data/CreatePersonalityTest";
import GetTestResult from "../data/GetTestResult";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function ProfilePage(prop) {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [editedProfile, setEditedProfile] = React.useState(prop.profile);
  const {
    username,
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
    personality,
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
  const [invalidUsername, setInvalidUsername] = React.useState(false);
  const [invalidBirthday, setInvalidBirthday] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFail, setOpenFail] = React.useState(false);
  const [openChange, setOpenChange] = React.useState(false);
  const [openNoChange, setOpenNoChange] = React.useState(false);
  const [openChangeFail, setOpenChangeFail] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  function addInterest() {
    const newInterest = interest.trim();
    if (newInterest === "") return;
    setEditedProfile((prev) => {
      const newInterests = [...prev.interests, newInterest];
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

  const savedProfileTestID = window.localStorage.getItem("profile_testID");
  const previousTestResult = GetTestResult(savedProfileTestID);

  React.useEffect(() => {
    if (previousTestResult) {
      if (previousTestResult.prediction === personality) {
        setOpenNoChange(true);
      } else {
        prop.setProfile((prev) => ({
          ...prev,
          personality: previousTestResult.prediction,
        }));

        const updatePersonality = async () => {
          try {
            const response = await axios.put(
              `${backendURL}/api/profiles/email/${editedProfile.email}`,
              { personality: previousTestResult.prediction },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            setOpenChange(true);
            console.log(
              "Personality Updated Successfully with response status: " +
                response.status
            );
          } catch (error) {
            setOpenChangeFail(true);
            console.log(
              "Update personality failed due to unknown server error: " + error
            );
          }
        };
        updatePersonality();
      }
    }
  }, [previousTestResult]);

  const [testURL, testID] = CreatePersonalityTest(username, "profile");
  const handleRetake = () => {
    setOpenDialog(true);
  };

  const handleSave = (event) => {
    // Tidying up of info + input validation
    if (editedProfile.username.trim() === "") {
      setInvalidUsername(true);
      return;
    }

    if (dayjs().isBefore(dayjs(editedProfile.birthday))) {
      setInvalidBirthday(true);
      return;
    }

    // If everything is valid, clear any existing warning message
    setInvalidUsername(false);
    setInvalidBirthday(false);

    // Tidying up the edited profile data
    // Trimming the string to get rid of excessive spaces at the
    // and end of user inputs etc.
    editedProfile.username = editedProfile.username.trim();
    editedProfile.description = editedProfile.description.trim();

    prop.setProfile(editedProfile);
    const updateData = async () => {
      try {
        const response = await axios.put(
          `${backendURL}/api/profiles/email/${editedProfile.email}`,
          editedProfile,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(
          "Profile successfully updated with response status: " +
            response.status
        );
        setOpenSuccess(true);
      } catch (error) {
        setOpenFail(true);
        console.log("Profile update failed due to unknown server error");
      }
    };
    updateData();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {isLoading && <CircularIndeterminate />}
      {invalidUsername && (
        <Alert sx={{ marginBottom: "20px" }} severity="error">
          Invalid Username: Username cannot be empty string
        </Alert>
      )}
      {invalidBirthday && (
        <Alert sx={{ marginBottom: "20px" }} severity="error">
          Invalid Birthday: Birthday cannot be in the future
        </Alert>
      )}
      <CustomizedSnackbar
        text="Profile Updated Successfully"
        open={openSuccess}
        setOpen={setOpenSuccess}
      />
      <CustomizedSnackbar
        severity="error"
        text="Profiled Updated Failed due to Unknown Server Error"
        open={openFail}
        setOpen={setOpenFail}
      />
      <CustomizedSnackbar
        text= {`Test Result Generated: Your new personality is ${personality}`}
        open={openChange}
        setOpen={setOpenChange}
      />
      <CustomizedSnackbar
        severity="info"
        text="Test Result Generated: Your personality remains the same"
        open={openNoChange}
        setOpen={setOpenNoChange}
      />
      <CustomizedSnackbar
        severity="error"
        text="Error when fetching test results from the API Server"
        open={openChangeFail}
        setOpen={setOpenChangeFail}
      />
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
            <ColorNameAvatar username={username} />
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
              }}
            >
              {isEditMode ? (
                <TextField
                  sx={{ margin: "10px" }}
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
                  sx={{ margin: "10px" }}
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
            {isEditMode ? (
              <TextField
                multiline
                maxRows={5}
                id="description"
                label="description"
                name="description"
                value={editedProfile.description}
                sx={{ width: "75%", margin: "10px" }}
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
                      handleSave();
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
                    {(second_major || isEditMode) && (
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
                              <MenuItem value={""}>Not Applicable</MenuItem>
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
                            <Typography
                              variant="body1"
                              sx={{ fontSize: "18px", fontWeight: "600" }}
                            >
                              Interest:
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                              <TextField
                                id="interest"
                                fullWidth
                                placeholder="Please enter your interests"
                                name="interest"
                                value={interest}
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
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "50px",
                          }}
                        >
                          <AlertDialogSlide
                            open={openDialog}
                            setOpen={setOpenDialog}
                            dialogTitle="Confirm Proceed to Retake the Test?"
                            dialogContent="Please save all the changes before proceeding to prevent unnecessary data loss. Note that the personality field will be instantly updated once the test is finised, but if you are not satfisfied with the result, you can always retake the test again."
                            positive="Confirm"
                            negative="Cancel"
                            handlePositive={(event) => {
                              event.preventDefault();
                              setIsLoading(true);
                              // Save the current Test ID, and proceed to the test
                              window.localStorage.setItem(
                                "profile_testID",
                                testID
                              );
                              window.location.href = testURL;
                            }}
                          />
                          {personality}
                          {isEditMode && (
                            <StyledButton
                              text="Retake Test"
                              style={{ color: "white", margin: "0px" }}
                              onClick={handleRetake}
                            />
                          )}
                        </Box>
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
