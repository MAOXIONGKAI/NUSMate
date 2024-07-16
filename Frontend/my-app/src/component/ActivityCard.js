import React from "react";
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
} from "@mui/material";
import ColorNameAvatar from "../component/ColorNameAvatar";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteActivity from "../data/Activity/DeleteActivity";
import CustomizedSnackbar from "./CustomizedSnackbar";
import ActivityDetail from "./ActivityDetail";
import CreateParticipant from "../data/Participant/CreateParticipant";
import RemoveParticipant from "../data/Participant/RemoveParticipant";
import GetParticipantRequest from "../data/Participant/GetParticipantRequest";
import CheckIfJoined from "../data/Participant/CheckIfJoined";
import GetUserProfile from "../data/GetUserProfile";
import GetJoinedParticipant from "../data/Participant/GetJoinedParticipant";
import GetAllJoinedParticipants from "../data/Participant/GetAllJoinedParticipants";
import EditActivityForm from "./EditActivityForm";

export default function ActivityCard(prop) {
  const { profile, activity, setHasModified } = prop;
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
  const [openEdit, setOpenEdit] = React.useState(false);
  const [hasRequestedToJoin, setHasRequestedToJoin] = React.useState(false);
  const [hasJoined, setHasJoined] = React.useState(false);
  const [openDeleteSuccess, setOpenDeleteSuccess] = React.useState(false);
  const [openEditSuccess, setOpenEditSuccess] = React.useState(false);
  const [openEditFail, setOpenEditFail] = React.useState(false);
  const [openDeleteFail, setOpenDeleteFail] = React.useState(false);

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
  }, []);

  //Check with database about whether the user has joined this activity
  React.useEffect(() => {
    const checkJoinedStatus = async () => {
      setHasJoined(await CheckIfJoined(profile._id, _id));
    };
    checkJoinedStatus();
  }, []);

  const handleOpenDetail = () => {
    setOpenDetail(true);
  };

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
      if (await CreateParticipant(participantID, hostID, activityID)) {
        setHasRequestedToJoin(true);
        setHasModified((prev) => !prev);
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
      const requestID = await requestData._id;
      if (await RemoveParticipant(requestID)) {
        setHasRequestedToJoin(false);
        setHasModified((prev) => !prev);
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
      const requestID = await approvedRequest._id;
      if (await RemoveParticipant(requestID)) {
        setHasJoined(false);
        setHasRequestedToJoin(false);
        setHasModified((prev) => !prev);
      }
    };
    sendWithdrawRequest();
  };

  const handleEditActivity = () => {
    setOpenEdit(true);
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
        setOpen={setOpenEditFail}
      />
      <ActivityDetail
        open={openDetail}
        setOpen={setOpenDetail}
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
      />
      <EditActivityForm
        open={openEdit}
        setOpen={setOpenEdit}
        setOpenEditSuccess={setOpenEditSuccess}
        setOpenEditFail={setOpenEditFail}
        activity={activity}
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
                    color: "green",
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
          {profile._id === hostID ? (
            <>
              <Tooltip title="Edit this activity">
                <IconButton onClick={handleEditActivity}>
                  <EditIcon />
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
                onClick={() => handleWithdrawActivityRequest(profile._id, _id)}
              >
                <GroupRemoveIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Request to join this activity">
              <IconButton
                onClick={() => handleJoinActivity(profile._id, hostID, _id)}
              >
                <GroupAddIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Share this activity">
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
