import React from "react";
import "../index.css";
import {
  Autocomplete,
  Chip,
  Container,
  Grid,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import UserCard from "../component/UserCard";
import DiscoverNoResult from "../image/DiscoverNoResult.png";
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  ListSubheader,
  MenuItem,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import CustomizedSnackbar from "../component/CustomizedSnackbar";
import InterestsIcon from "@mui/icons-material/Interests";
import BadgeIcon from "@mui/icons-material/Badge";
import AddIcon from "@mui/icons-material/Add";

import {
  educationStatus,
  nationalities,
  singaporeLocations,
  MBTI,
} from "../data/FormOptions";
import {
  FASSMajor,
  SOBMajor,
  SOCMajor,
  CDEMajor,
  YLLSOMMajor,
  YSTCMMajor,
  SSHSOPHMajors,
  FOSMajor,
} from "../data/FormOptions";
import GetSearchResult from "../data/GetSearchResult";
import RandomArrayElement from "../data/RandomArrayElement";

export default function Discover(prop) {
  const DiscoverOption = styled((prop) => (
    <TextField
      hiddenLabel
      select
      size="small"
      variant="filled"
      onChange={handleChange}
      {...prop}
    />
  ))(({ theme }) => ({
    fontSize: "14px",
    width: "13%",
    size: "small",
    "& .MuiInputLabel-root": {
      fontSize: "0.55rem",
    },
    "& .MuiInputBase-input": {
      fontSize: "0.8rem",
    },
  }));

  const [searchTags, setSearchTags] = React.useState({
    _id: prop.profile._id,
    first_major: "",
    second_major: "",
    education_status: "",
    nationality: "",
    location: "",
    personality: "",
    username: "",
  });

  const [interestInput, setInterestInput] = React.useState("");
  const [interests, setInterests] = React.useState([]);

  const [searchResult, setSearchResult] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const refreshAutoComplete = () => {
    setRefresh((prev) => !prev);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchTags((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(searchTags);
  };

  const handleChangeInterest = (event) => {
    const input = event.target.value;
    setInterestInput(input);
  };

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openNoResult, setOpenNoResult] = React.useState(false);
  const [openFail, setOpenFail] = React.useState(false);
  const [openEmpty, setOpenEmpty] = React.useState(false);

  const handleAddInterest = (event) => {
    if (event.key === "Enter") {
      const newInterest = interestInput;
      refreshAutoComplete();
      setInterestInput("");
      if (newInterest.trim() === "") {
        return;
      }
      setInterests((prev) => [...prev, newInterest]);
    }
  };

  const handleDeleteInterest = (index) => () => {
    setInterests((prev) => {
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };

  const validateTags = (tags) => {
    for (const tag in tags) {
      if ((Array.isArray(tags[tag]) && tags[tag].length === 0) || tag === "_id")
        continue;
      if (tags[tag]) {
        return true;
      }
    }
    return false;
  };

  const handleCustomizedSearch = async () => {
    const finalTags = { ...searchTags, interests: interests };
    if (!validateTags(finalTags)) {
      setOpenEmpty(true);
      return;
    }

    const result = await GetSearchResult(finalTags);
    setSearchResult(result);
    if (!result) {
      setOpenFail(true);
    } else if (result.length === 0) {
      setOpenNoResult(true);
    } else {
      setOpenSuccess(true);
    }
  };

  const handleInstantMatch = async () => {
    const {
      _id,
      first_major,
      second_major,
      education_status,
      nationality,
      location,
      interests,
      personality,
    } = prop.profile;

    const tags = {
      _id: _id,
      first_major: first_major,
      second_major: second_major,
      education_status: education_status,
      nationality: nationality,
      location: location,
      interests: interests,
      personality: personality,
    };

    const result = await GetSearchResult(tags);
    setSearchResult(result);
    if (!result) {
      setOpenFail(true);
    } else if (result.length === 0) {
      setOpenNoResult(true);
    } else {
      setOpenSuccess(true);
    }
  };

  const handleRandomFriend = async () => {
    const majors = [
      ...FASSMajor,
      ...SOBMajor,
      ...SOCMajor,
      ...CDEMajor,
      ...YLLSOMMajor,
      ...YSTCMMajor,
      ...SSHSOPHMajors,
      ...FOSMajor,
    ];

    let result = [];
    while (result.length === 0) {
      const tags = {
        _id: prop.profile._id,
        first_major: RandomArrayElement(majors),
        second_major: RandomArrayElement(majors),
        education_status: RandomArrayElement(educationStatus),
        nationalities: RandomArrayElement(educationStatus),
        location: RandomArrayElement(educationStatus),
        personality: RandomArrayElement(educationStatus),
      };

      result = await GetSearchResult(tags);
    }
    setSearchResult(result);
    setOpenSuccess(true);
  };

  return (
    <div>
      <CustomizedSnackbar
        text="Profile Match Successfully: Found matching profile!"
        open={openSuccess}
        setOpen={setOpenSuccess}
      />
      <CustomizedSnackbar
        severity="warning"
        text="Oops, seems like there's no result matching your preference..."
        open={openNoResult}
        setOpen={setOpenNoResult}
      />
      <CustomizedSnackbar
        severity="warning"
        text="Invalid Input: Please provide some search tags"
        open={openEmpty}
        setOpen={setOpenEmpty}
      />
      <CustomizedSnackbar
        severity="error"
        text="Profile Match Failed: Unknown server error"
        open={openFail}
        setOpen={setOpenFail}
      />
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexGrow: 5,
              gap: "20px",
              marginBottom: "15px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <DiscoverOption
              label="First Major"
              name="first_major"
              value={searchTags.first_major}
            >
              <MenuItem value="">--- Remove Selection ---</MenuItem>
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
            </DiscoverOption>
            <DiscoverOption
              label="Second Major"
              name="second_major"
              value={searchTags.second_major}
            >
              <MenuItem value="">--- Remove Selection ---</MenuItem>
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
            </DiscoverOption>
            <DiscoverOption
              label="Education Status"
              name="education_status"
              value={searchTags.education_status}
            >
              <MenuItem value="">--- Remove Selection ---</MenuItem>
              {educationStatus.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </DiscoverOption>
            <DiscoverOption
              label="Nationality"
              name="nationality"
              value={searchTags.nationality}
            >
              <MenuItem value="">--- Remove Selection ---</MenuItem>
              {nationalities.map((nationality) => (
                <MenuItem key={nationality} value={nationality}>
                  {nationality}
                </MenuItem>
              ))}
            </DiscoverOption>
            <DiscoverOption
              label="Location"
              name="location"
              value={searchTags.location}
            >
              <MenuItem value="">--- Remove Selection ---</MenuItem>
              {singaporeLocations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </DiscoverOption>
            <DiscoverOption
              label="Personality"
              name="personality"
              value={searchTags.personality}
            >
              <MenuItem value="">--- Remove Selection ---</MenuItem>
              {MBTI.map((personality) => (
                <MenuItem key={personality} value={personality}>
                  {personality}
                </MenuItem>
              ))}
            </DiscoverOption>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "top",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Autocomplete
              clearIcon={false}
              forcePopupIcon={false}
              disableClearable
              sx={{ width: "43%" }}
              size="small"
              key={refresh}
              options={[]}
              freeSolo
              multiple
              renderTags={() => null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  multiline
                  placeholder={
                    interests.length === 0 ? "Search by Interests..." : ""
                  }
                  helperText="Type and press enter to create interest tags"
                  value={interestInput}
                  onChange={handleChangeInterest}
                  onKeyDown={handleAddInterest}
                  inputProps={{ ...params.inputProps, maxLength: 30 }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InterestsIcon />
                        {interests.map((interest, index) => (
                          <Chip
                            key={index}
                            label={interest}
                            onDelete={handleDeleteInterest(index)}
                            sx={{ margin: "4px 4px" }}
                          />
                        ))}
                      </>
                    ),
                  }}
                />
              )}
            />
            <TextField
              sx={{ width: "43%" }}
              placeholder="Search by Username..."
              size="small"
              name="username"
              value={searchTags.username}
              onChange={handleChange}
              inputProps={{ maxLength: 30 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Box>
        </Box>
        <Box sx={{ display: "flex", width: "20%" }}>
          <Tooltip title="Customized Search">
            <IconButton onClick={handleCustomizedSearch}>
              <SearchIcon
                sx={{
                  color: "white",
                  background:
                    "linear-gradient(90deg, rgba(83,207,255,1) 0%, rgba(100,85,240,1) 100%)",
                  borderRadius: "5px",
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Instant Match">
            <IconButton onClick={handleInstantMatch}>
              <PersonSearchIcon
                sx={{
                  color: "white",
                  background:
                    "linear-gradient(90deg, rgba(255,18,93,1) 0%, rgba(156,0,123,1) 100%)",
                  borderRadius: "5px",
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Random Friend">
            <IconButton onClick={handleRandomFriend}>
              <ShuffleIcon
                sx={{
                  color: "white",
                  background:
                    "linear-gradient(90deg, rgba(90,255,149,1) 0%, rgba(49,176,93,1) 100%)",
                  borderRadius: "5px",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {" "}
        {!searchResult || searchResult.length === 0 ? (
          <>
            <Typography
              variant="h5"
              sx={{ fontFamily: "Handlee, sans-serif", fontWeight: 600 }}
            >
              No results shown at the moment,
              <br />
              start searching or try to adjust your tags to improve search
              result
            </Typography>
            <img
              src={DiscoverNoResult}
              alt="Discover page background when no result is shown"
              width="60%"
            />
          </>
        ) : (
          <Box p={3} width="100%">
            <Container width="100%">
              <Grid container spacing={3} rowSpacing={5} sx={{ width: "100%" }}>
                {searchResult.map((profile, index) => (
                  <Grid
                    item
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    sx={{ width: "100%" }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <UserCard profile={profile} sx={{ flexGrow: 1 }} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        )}
      </Box>
    </div>
  );
}
