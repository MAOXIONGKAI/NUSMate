import React from "react";
import "../index.css";
import { styled } from "@mui/material/styles";
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

export default function Discover(prop) {
  const DiscoverOption = styled((prop) => (
    <TextField hiddenLabel select size="small" variant="filled" {...prop} />
  ))(({ theme }) => ({
    fontSize: "14px",
    width: "10%",
    size: "small",
    "& .MuiInputLabel-root": {
      fontSize: "0.55rem",
    },
    "& .MuiInputBase-input": {
      fontSize: "0.8rem",
    },
  }));

  return (
    <div>
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
          //border: "red solid 5px",
        }}
      >
        <DiscoverOption label="First Major">
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
        <DiscoverOption label="Second Major">
          <MenuItem value="">Not Applicable</MenuItem>
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
        <DiscoverOption label="Education Status">
          {educationStatus.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </DiscoverOption>
        <DiscoverOption label="Nationality">
          {nationalities.map((nationality) => (
            <MenuItem key={nationality} value={nationality}>
              {nationality}
            </MenuItem>
          ))}
        </DiscoverOption>
        <DiscoverOption label="Location">
          {singaporeLocations.map((location) => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </DiscoverOption>
        <DiscoverOption label="Interest"></DiscoverOption>
        <DiscoverOption label="Personality">
          {MBTI.map((personality) => (
            <MenuItem key={personality} value={personality}>
              {personality}
            </MenuItem>
          ))}
        </DiscoverOption>
        <Tooltip title="Customized Search">
          <IconButton>
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
          <IconButton>
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
          <IconButton>
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
      <Box
        sx={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        <Typography variant="h5" sx={{ fontFamily: "Handlee, sans-serif", fontWeight: 600}}>
          No results shown at the moment,<br />start searching or try to adjust your tags to improve search result
        </Typography>
        <img
          src={DiscoverNoResult}
          alt="Discover page background when no result is shown"
          width="60%"
        />
      </Box>
    </div>
  );
}
