import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import ColorNameAvatar from "../ColorNameAvatar";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import GroupsIcon from "@mui/icons-material/Groups";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import DeleteActivity from "../../data/Activity/DeleteActivity";
import CustomizedSnackbar from "../CustomizedSnackbar";
import ActivityDetail from "./ActivityDetail";
import CreateParticipant from "../../data/Participant/CreateParticipant";
import RemoveParticipant from "../../data/Participant/RemoveParticipant";
import GetParticipantRequest from "../../data/Participant/GetParticipantRequest";
import CheckIfJoined from "../../data/Participant/CheckIfJoined";
import GetUserProfile from "../../data/GetUserProfile";
import GetJoinedParticipant from "../../data/Participant/GetJoinedParticipant";
import GetAllJoinedParticipants from "../../data/Participant/GetAllJoinedParticipants";
import EditActivityForm from "./EditActivityForm";
import ManageParticipantMenu from "./MangeParticipantMenu";
import FriendInviteMenu from "./FriendInviteMenu";
import CheckIfInvited from "../../data/Participant/CheckIfInvited";
import GetActivity from "../../data/Activity/GetActivity";
import AcceptInvitation from "../../data/Participant/AcceptInvitation";
import RejectInvitation from "../../data/Participant/RejectInvitation";
import GetInvitationRequest from "../../data/Participant/GetInvitationRequest";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function ActivityCard(prop) {
  const { profile, activity, setHasModified, triggerNotification } = prop;
  let {
    _id,
    hostID,
    hostName,
    activityName,
    pax,
    startDate,
    endDate,
    location,
    description,
  } = activity;

  startDate = dayjs(startDate).format("ddd, MMM D, YYYY h:mm A");
  endDate = dayjs(endDate).format("ddd, MMM D, YYYY h:mm A");

  const [openDetail, setOpenDetail] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openParticipantMenu, setOpenParticipantMenu] = React.useState(false);
  const [openInviteMenu, setOpenInviteMenu] = React.useState(false);
  const [hasRequestedToJoin, setHasRequestedToJoin] = React.useState(false);
  const [hasJoined, setHasJoined] = React.useState(false);
  const [hasBeenInvited, setHasBeenInvited] = React.useState(false);
  const [openDeleteSuccess, setOpenDeleteSuccess] = React.useState(false);
  const [openEditSuccess, setOpenEditSuccess] = React.useState(false);
  const [openEditFail, setOpenEditFail] = React.useState(false);
  const [openDeleteFail, setOpenDeleteFail] = React.useState(false);
  const [openRemoveSuccess, setOpenRemoveSuccess] = React.useState(false);
  const [openRemoveFail, setOpenRemoveFail] = React.useState(false);
  const [openInviteSuccess, setOpenInviteSuccess] = React.useState(false);
  const [openInviteFail, setOpenInviteFail] = React.useState(false);

  const [participants, setParticipants] = React.useState([]);

  // Refresh activity card info after certain actions
  const [refresh, setRefresh] = React.useState(false);
  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  // Check database to see if the activity has been added to favorite
  React.useEffect(() => {
    const getFavStatus = async () => {
      try {
        const response = await axios.post(
          `${backendURL}/api/favorite_activities/check_relationship`,
          {
            userID: profile._id,
            favoriteActivityID: _id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsFavorite(response.data.length !== 0);
      } catch (error) {
        console.log(
          `Error when getting favorite status of ${activityName}: ` + error
        );
      }
    };
    getFavStatus();
  }, []);

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
  }, [_id, hostID, refresh, triggerNotification]);

  //Check with database about whether the user has requested to join this activity
  React.useEffect(() => {
    const checkRequested = async () => {
      if (await GetParticipantRequest(profile._id, _id)) {
        setHasRequestedToJoin(true);
      } else {
        setHasRequestedToJoin(false);
      }
    };
    checkRequested();
  }, [_id, profile._id, refresh, triggerNotification]);

  //Check with database about whether the user has joined this activity
  React.useEffect(() => {
    const checkJoinedStatus = async () => {
      setHasJoined(await CheckIfJoined(profile._id, _id));
    };
    checkJoinedStatus();
  }, [triggerNotification]);

  const handleOpenDetail = () => {
    setOpenDetail(true);
  };

  //Check with database about whether the user has been invited to this activity
  React.useEffect(() => {
    const checkInviteStatus = async () => {
      setHasBeenInvited(await CheckIfInvited(profile._id, hostID, _id));
    };
    checkInviteStatus();
  }, [triggerNotification]);

  React.useEffect(() => {
    if (!openDeleteSuccess) {
      setHasModified((prev) => !prev);
    }
  }, [openDeleteSuccess, setHasModified]);

  const handleDeleteActivity = (ID) => {
    const sendDeleteRequest = async () => {
      if (await DeleteActivity(ID)) {
        setOpenDeleteSuccess(true);
      }
    };
    sendDeleteRequest();
  };

  const handleJoinActivity = (participantID, hostID, activityID) => {
    const sendJoinRequest = async () => {
      if (!(await GetActivity(activityID))) return;
      if (await CreateParticipant(participantID, hostID, activityID)) {
        setHasRequestedToJoin(true);
        setHasModified((prev) => !prev);
        handleRefresh();
      }
    };
    sendJoinRequest();
  };

  const handleWithdrawActivityRequest = (participantID, activityID) => {
    const sendWithdrawRequest = async () => {
      const requestData = await GetParticipantRequest(
        participantID,
        activityID
      );
      if (!requestData) return;
      const requestID = await requestData._id;
      if (await RemoveParticipant(requestID)) {
        setHasRequestedToJoin(false);
        setHasModified((prev) => !prev);
        handleRefresh();
      }
    };
    sendWithdrawRequest();
  };

  const handleWithdrawFromActivity = (participantID, activityID) => {
    const sendWithdrawRequest = async () => {
      const approvedRequest = await GetJoinedParticipant(
        participantID,
        activityID
      );
      if (!approvedRequest) return;
      const requestID = await approvedRequest._id;
      if (await RemoveParticipant(requestID)) {
        setHasJoined(false);
        setHasRequestedToJoin(false);
        setHasModified((prev) => !prev);
        handleRefresh();
      }
    };
    sendWithdrawRequest();
  };

  const handleAcceptActivityInvitation = (participantID, activityID) => {
    const sendAcceptRequest = async () => {
      const requestData = await GetInvitationRequest(participantID, activityID);
      if (!requestData) {
        return;
      }
      const requestID = await requestData._id;
      if (await AcceptInvitation(requestID)) {
        setHasBeenInvited(false);
        setHasJoined(true);
        setHasModified((prev) => !prev);
        handleRefresh();
      }
    };
    sendAcceptRequest();
  };

  const handleRejectActivityInvitation = (participantID, activityID) => {
    const sendRejectRequest = async () => {
      const requestData = await GetInvitationRequest(participantID, activityID);
      if (!requestData) {
        return;
      }
      const requestID = await requestData._id;
      if (await RejectInvitation(requestID)) {
        setHasBeenInvited(false);
        setHasBeenInvited(false);
        setHasModified((prev) => !prev);
        handleRefresh();
      }
    };
    sendRejectRequest();
  };

  const handleEditActivity = () => {
    setOpenEdit(true);
    handleRefresh();
  };

  const handleManageParticipant = () => {
    setOpenParticipantMenu(true);
    handleRefresh();
  };

  const handleFrinedInvite = () => {
    setOpenInviteMenu(true);
    handleRefresh();
  };

  const createFavorite = async () => {
    try {
      if (!(await GetActivity(_id))) return;
      const response = await axios.post(
        `${backendURL}/api/favorite_activities`,
        {
          userID: profile._id,
          favoriteActivityID: _id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log("Error when setting user profile as favorite: " + error);
    }
  };

  const deleteFavorite = async () => {
    try {
      const response = await axios.delete(
        `${backendURL}/api/favorite_activities`,
        {
          data: {
            userID: profile._id,
            favoriteActivityID: _id,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(
        "Error when deleting favorite activity from user collection: " + error
      );
    }
  };

  const handleAddFavorite = () => {
    setIsFavorite(true);
    createFavorite();
    setHasModified((prev) => !prev);
  };

  const handleDeleteFavorite = () => {
    setIsFavorite(false);
    deleteFavorite();
    setHasModified((prev) => !prev);
  };

  return (
    <React.Fragment>
      <CustomizedSnackbar
        text="Delete Activity Successfully"
        open={openDeleteSuccess}
        setOpen={setOpenDeleteSuccess}
      />
      <CustomizedSnackbar
        text="Delete Activity Failed: Unknown Server Error"
        severity="error"
        open={openDeleteFail}
        setOpen={setOpenDeleteFail}
      />
      <CustomizedSnackbar
        text="Edit Activity Successfully"
        open={openEditSuccess}
        setOpen={setOpenEditSuccess}
      />
      <CustomizedSnackbar
        text="Edit Activity Failed: Unknown Server Error"
        open={openEditFail}
        severity="error"
        setOpen={setOpenEditFail}
      />
      <CustomizedSnackbar
        text="Successfully removed participant from the activity"
        open={openRemoveSuccess}
        setOpen={setOpenRemoveSuccess}
      />
      <CustomizedSnackbar
        text="Removed Participant Failed: Unknown Server Error"
        severity="error"
        open={openRemoveFail}
        setOpen={setOpenRemoveFail}
      />
      <CustomizedSnackbar
        text="Successfully update invitations to friends"
        open={openInviteSuccess}
        setOpen={setOpenInviteSuccess}
      />
      <CustomizedSnackbar
        text="Send Invitation Failed: Unknown Server Error"
        severity="error"
        open={openInviteFail}
        setOpen={setOpenInviteFail}
      />
      <ActivityDetail
        open={openDetail}
        setOpen={setOpenDetail}
        refresh={refresh}
        profile={profile}
        _id={_id}
        hostID={hostID}
        hostName={hostName}
        activityName={activityName}
        pax={pax}
        startDate={startDate}
        endDate={endDate}
        location={location}
        description={description}
        triggerNotification={triggerNotification}
      />
      <EditActivityForm
        open={openEdit}
        setOpen={setOpenEdit}
        setOpenEditSuccess={setOpenEditSuccess}
        setOpenEditFail={setOpenEditFail}
        setHasModified={setHasModified}
        handleRefresh={handleRefresh}
        activity={activity}
        currentPax={participants?.length}
      />
      <ManageParticipantMenu
        open={openParticipantMenu}
        setOpen={setOpenParticipantMenu}
        refresh={refresh}
        handleRefresh={handleRefresh}
        openRemoveSuccess={openRemoveSuccess}
        setOpenRemoveSuccess={setOpenRemoveSuccess}
        openRemoveFail={openRemoveFail}
        setOpenRemoveFail={setOpenRemoveFail}
        profile={profile}
        _id={_id}
        hostID={hostID}
        hostName={hostName}
        activityName={activityName}
        pax={pax}
        triggerNotification={triggerNotification}
      />
      <FriendInviteMenu
        open={openInviteMenu}
        setOpen={setOpenInviteMenu}
        profile={profile}
        activity={activity}
        refresh={refresh}
        handleRefresh={handleRefresh}
        setOpenInviteSuccess={setOpenInviteSuccess}
        setOpenInviteFail={setOpenInviteFail}
        triggerNotification={triggerNotification}
      />
      <Card
        sx={{
          display: "flex",
          width: "90vw",
          minHeight: "150px",
          borderRadius: "30px",
          justifyContent: "center",
          minWidth: "340px",
          boxShadow: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "#DFF1FF",
            marginRight: "auto",
            width: "12%",
            minWidth: "120px",
            padding: "10px 0px",
          }}
        >
          <ColorNameAvatar
            username={hostName}
            sx={{ width: "36px", height: "36px", fontSize: "14px" }}
          />
          <Typography variant="caption" sx={{ fontSize: "12px" }}>
            {hostName}
          </Typography>
        </Box>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            width: "80%",
            justifyContent: "top",
            margin: "0px",
            padding: "0px",
            marginRight: "auto",
          }}
        >
          <CardActionArea
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              width: "100%",
              alignItems: "center",
              justifyContent: "top",
              padding: "0px",
              margin: "0px",
              marginRight: "auto",
              height: "100%",
            }}
            onClick={handleOpenDetail}
          >
            <Box
              sx={{
                margin: "0px",
                padding: "16px",
                marginBottom: "auto",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "auto",
                  gap: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    gap: "0px 10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
                <Box
                  sx={{
                    display: "flex",
                    color: participants.length === pax ? "red" : "green",
                    margin: "0px",
                    marginLeft: "auto",
                    padding: "0px",
                  }}
                >
                  <PersonIcon />
                  <Typography variant="body2">
                    ({participants.length}/{pax})
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "gray", fontSize: "16px" }}
              >
                {startDate} - {endDate}
              </Typography>
            </Box>
            <Typography
              sx={{ marginBottom: "auto", wordWrap: "break-word" }}
              variant="body2"
              color="textSecondary"
              width="90%"
            >
              {description}
            </Typography>
          </CardActionArea>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            width: "12%",
            minWidth: "12%",
            padding: "10.6% 0px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EFF9FF",
          }}
        >
          <Grid
            container
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            {profile._id === hostID ? (
              <>
                <Tooltip title="Edit this activity">
                  <IconButton onClick={handleEditActivity}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Manage Participants">
                  <IconButton onClick={handleManageParticipant}>
                    <GroupsIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Invite friends to the activity">
                  <IconButton
                    disabled={participants.length === pax}
                    onClick={handleFrinedInvite}
                  >
                    <AddReactionIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete this activity">
                  <IconButton onClick={() => handleDeleteActivity(_id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : hasJoined ? (
              <Tooltip title="Withdraw from this activity">
                <IconButton
                  onClick={() => handleWithdrawFromActivity(profile._id, _id)}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            ) : hasRequestedToJoin ? (
              <Tooltip title="Withdraw join request for this activity">
                <IconButton
                  onClick={() =>
                    handleWithdrawActivityRequest(profile._id, _id)
                  }
                >
                  <GroupRemoveIcon />
                </IconButton>
              </Tooltip>
            ) : hasBeenInvited ? (
              <>
                <Tooltip title={`Accept Invitation from ${activity.hostName}`}>
                  <IconButton
                    sx={{ color: "#32CD32" }}
                    disabled={activity.pax <= participants.length}
                    onClick={() =>
                      handleAcceptActivityInvitation(profile._id, _id)
                    }
                  >
                    <CheckCircleOutline />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={`Reject invitation from ${activity.hostName}`}
                  onClick={() =>
                    handleRejectActivityInvitation(profile._id, _id)
                  }
                >
                  <IconButton sx={{ color: "red" }}>
                    <CancelOutlined />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="Request to join this activity">
                <IconButton
                  disabled={participants.length === pax}
                  onClick={() => handleJoinActivity(profile._id, hostID, _id)}
                >
                  <GroupAddIcon />
                </IconButton>
              </Tooltip>
            )}
            {isFavorite ? (
              <Tooltip title={`Remove ${activityName} from Favorite`}>
                <IconButton onClick={handleDeleteFavorite}>
                  <FavoriteIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title={`Add ${activityName} to Favorite`}>
                <IconButton onClick={handleAddFavorite}>
                  <FavoriteBorderIcon />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
