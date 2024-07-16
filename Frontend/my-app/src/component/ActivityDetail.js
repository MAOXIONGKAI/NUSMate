import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import PersonIcon from "@mui/icons-material/Person";
import { List, ListItem, ListSubheader, Paper } from "@mui/material";
import GetAllJoinedParticipants from "../data/Participant/GetAllJoinedParticipants";
import MiniUserCard from "./MiniUserCard";
import GetUserProfile from "../data/GetUserProfile";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    borderRadius: "30px",
    minWidth: "90%",
    width: "90%",
    minHeight: "90%",
  },
}));

export default function ActivityDetail(prop) {
  const {
    open,
    setOpen,
    profile,
    _id,
    hostID,
    hostName,
    activityName,
    pax,
    startDate,
    endDate,
    location,
    description,
  } = prop;

  const handleClose = () => {
    setOpen(false);
  };

  const [participants, setParticipants] = React.useState([]);

  React.useEffect(() => {
    const getParticipants = async () => {
      const participations = await GetAllJoinedParticipants(_id);
      const profilePromises = participations?.map((participation) => {
        return GetUserProfile(participation.participantID);
      });
      const hostProfile = await GetUserProfile(hostID);
      const result =
        hostProfile && profilePromises
          ? await Promise.all([hostProfile, ...profilePromises])
          : [];
      setParticipants(result);
    };
    getParticipants();
  }, [_id]);

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
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "0px 10px" }}>
              <Typography variant="h6" sx={{ lineHeight: "32px" }}>
                {activityName}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "dimgray", lineHeight: "32px" }}
              >
                @{location}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: "gray", fontSize: "16px" }}
            >
              {startDate} - {endDate}
            </Typography>
          </Box>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: "30px",
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ width: "90%", wordWrap: "break-word" }}
            >
              {description}
            </Typography>
            <Box
              sx={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Typography sx={{ color: "dimgray" }}>
                  Participant List
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    color: "green",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  <PersonIcon />
                  <Typography variant="body2">
                    ({participants.length}/{pax})
                  </Typography>
                </Box>
              </Box>
              <Paper
                sx={{
                  width: "100%",
                  maxHeight: "400px",
                  backgroundColor: "#F5F5F5",
                  overflow: "auto",
                  borderRadius: "20px"
                }}
              >
                <List
                  sx={{
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {participants &&
                    participants.map((participant, index) => (
                      <ListItem>
                        <MiniUserCard
                          isHost={index === 0}
                          profile={participant}
                          userID={profile._id}
                          participantID={participant._id}
                        />
                      </ListItem>
                    ))}
                </List>
              </Paper>
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
