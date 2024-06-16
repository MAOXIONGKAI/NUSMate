import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import ColorNameAvatar from "./ColorNameAvatar";
import {
  Tooltip,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  DialogActions,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ShareIcon from "@mui/icons-material/Share";
import dayjs from "dayjs";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: "600px",
    maxWidth: "600px",
  },
  "& .MuiDialog-container": {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function CardDetail(prop) {
  const { open, setOpen, profile } = prop;

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
    personality,
    description,
  } = profile;

  const year_th =
    year_of_study === 1
      ? "st"
      : year_of_study === 2
      ? "nd"
      : year_of_study === 3
      ? "rd"
      : "th";

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: "#EFF9FF" }}
          id="customized-dialog-title"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              width: "100%",
              gap: "10px",
              margin: "0px",
              padding: "0px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "absolute",
                left: "50%",
                transform: "translate(-50%)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  margin: "0px",
                  padding: "0px",
                }}
              >
                <ColorNameAvatar
                  username={username}
                  sx={{
                    fontSize: "14px",
                    height: "32px",
                    width: "32px",
                  }}
                />
                {username}
              </Box>
              <Typography
                variant="body2"
                color="gray"
                sx={{ margin: "0px", padding: "0px", fontSize: "14px" }}
              >
                {first_major + (second_major ? ` / ${second_major}` : "")}
              </Typography>
            </Box>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                marginLeft: "auto",
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography color="gray" sx={{ marginBlock: "15px" }}>
              {description}
            </Typography>
            <Box
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Education Status:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {education_status}
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Gender:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {gender}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Year of Study:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {year_of_study}
                        {year_th} year
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Birthday:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {dayjs(birthday).format("DD MMM YYYY")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Nationality:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {nationality}
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Location:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {location}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell
                        sx={{ textAlign: "center", fontWeight: "bold" }}
                      >
                        Personality:
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "lighter",
                          justifyContent: "center",
                        }}
                      >
                        {personality}
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: "center", fontWeight: "bold" }}
                      >
                        Interests:
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "lighter",
                          justifyContent: "center",
                        }}
                      >
                        <ul
                          style={{
                            listStyleType: "disc",
                            margin: 0,
                            textAlign: "left",
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
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          disableSpacing
          sx={{
            width: "100%",
            marginRight: "auto",
            backgroundColor: "#EFF9FF",
          }}
        >
          <Tooltip title="Add to favorites">
            <IconButton aria-label="add to favorites">
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={`Message ${username}`}>
            <IconButton>
              <MailOutlineIcon aria-label="Message user" />
            </IconButton>
          </Tooltip>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
