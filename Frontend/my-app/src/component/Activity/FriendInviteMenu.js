import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FriendInviteList from "./FriendInviteList";
import GetFriends from "../../data/Friend/GetFriends";
import GetUserProfile from "../../data/GetUserProfile";
import InviteParticipant from "../../data/Participant/InviteParticipant";
import CheckIfInvited from "../../data/Participant/CheckIfInvited";
import RemoveParticipant from "../../data/Participant/RemoveParticipant";
import GetInvitationRequest from "../../data/Participant/GetInvitationRequest";
import { Typography } from "@mui/material";
import CheckCanInvite from "../../data/Participant/CheckCanInvite";
import NoFriendToInvite from "../../image/NoFriendToInvite.jpg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    minWidth: "50%",
    width: "50%",
    minHeight: "90%",
  },
}));

export default function FriendInviteMenu(prop) {
  const {
    open,
    setOpen,
    profile,
    activity,
    setOpenInviteSuccess,
    setOpenInviteFail,
    refresh,
    handleRefresh,
    triggerNotification
  } = prop;
  const { activityName } = activity;

  const [friends, setFriends] = React.useState([]);
  const [checked, setChecked] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
    handleRefresh();
  };

  const handleInvite = () => {
    const sendInvitations = async () => {
      const requestPromises = friends.map((friend) => {
        return GetInvitationRequest(friend._id, activity._id);
      });
      const requestDataArray = await Promise.all(requestPromises);

      const invitePromises = friends.map((friend, index) => {
        if (checked.indexOf(index) !== -1) {
          return InviteParticipant(friend._id, profile._id, activity._id);
        } else {
          const requestData = requestDataArray[index];
          if (!requestData) {
            return null;
          }
          const requestID = requestData._id;
          return RemoveParticipant(requestID);
        }
      });
      const result = await Promise.all(invitePromises);
      if (result) {
        setOpenInviteSuccess(true);
      } else {
        setOpenInviteFail(true);
      }
      handleRefresh();
    };
    sendInvitations();
  };

  // Check with database to get user's friend profiles which the system can
  // send invitation to
  // Otherwise, for friends who have already joined the activity/sent a join request,
  // the system would not allow user to send invitation request
  React.useEffect(() => {
    const checkFriends = async () => {
      const relationships = await GetFriends(profile._id);
      const profilePromises = relationships.map((relationship) => {
        return GetUserProfile(
          relationship.fromUserID === profile._id
            ? relationship.toUserID
            : relationship.fromUserID
        );
      });
      const profiles = await Promise.all(profilePromises);
      const resultPromises = profiles.map(async (profile) => {
        if (await CheckCanInvite(profile._id, activity._id)) {
          return {};
        } else {
          return profile;
        }
      });
      const results = await Promise.all(resultPromises);
      setFriends(results.filter((result) => result._id));
    };
    checkFriends();
  }, [profile._id, activity._id, refresh, triggerNotification]);

  // Check with database to see who have already been invited
  // but hasn't accepted/rejected the invitation
  React.useEffect(() => {
    const getCheckedStatus = async () => {
      const statusPromises = friends.map(async (friend) => {
        const isInvited = await CheckIfInvited(
          friend._id,
          profile._id,
          activity._id
        );
        return isInvited ? friend._id : null;
      });

      const results = await Promise.all(statusPromises);
      const invitedFriends = await results
        .map((result, index) => (result === null ? -1 : index))
        .filter((index) => index !== -1);
      setChecked(invitedFriends);
    };
    getCheckedStatus();
  }, [friends, refresh]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{
            background:
              "linear-gradient(90deg, rgba(83,207,255,1) 0%, rgba(100,85,240,1) 100%)",
            color: "white",
            textAlign: "center",
          }}
          id="customized-dialog-title"
        >
          Invite Friends to <br />
          {activityName}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ textAlign: "center" }} dividers>
          {friends.length !== 0 ? (
            <>
              <Typography sx={{ display: "inline", color: "gray" }}>
                Currently Inviting:{" "}
                <Typography sx={{ color: "black", display: "inline" }}>
                  ({checked.length}/{friends.length})
                </Typography>
              </Typography>
              <FriendInviteList
                profile={profile}
                friends={friends}
                checked={checked}
                setChecked={setChecked}
              />
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <img
                width="40%"
                style={{ borderRadius: "50%" }}
                src={NoFriendToInvite}
                alt="No Friend to Invite Page"
              />
              <Typography sx={{ fontFamily: "Handlee, sans-serif", fontWeight: 600 }}>
                Oops... Seems like there are no friends to invite at the moment.
                <br />
                You can try to make more friends through Discover Page or
                <br /> check if any friends has requested to join this activity.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            background:
              "linear-gradient(90deg, rgba(83,207,255,1) 0%, rgba(100,85,240,1) 100%)",
          }}
        >
          <Button
            sx={{
              color: "white",
              "&:hover": { background: "rgba(50,50,50, 0.1)" },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: "white",
              "&:hover": { background: "rgba(50,50,50, 0.1)" },
            }}
            disabled={friends.length === 0}
            onClick={() => {
              handleInvite();
              handleClose();
            }}
          >
            Invite
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
