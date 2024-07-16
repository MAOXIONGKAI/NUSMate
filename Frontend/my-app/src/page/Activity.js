import React from "react";
import dayjs from "dayjs";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Tooltip,
  Typography,
  Paper,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ToggleMenu from "../component/ToggleMenu";
import NoActivityPage from "../image/NoActivityPage.jpg";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "../component/FormDialog";
import CustomizedSnackbar from "../component/CustomizedSnackbar";
import UpdateLocalUserProfile from "../data/UpdateLocalUserProfile";
import GetActivities from "../data/Activity/GetActivities";
import ActivityCard from "../component/ActivityCard";
import ActivityDetail from "../component/ActivityDetail";
import GetAllSentRequests from "../data/Participant/GetAllSentRequests";
import GetActivity from "../data/Activity/GetActivity";
import GetPendingActivityRequests from "../data/Activity/GetPendingActivityRequests";
import GetUserProfile from "../data/GetUserProfile";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import CancelOutlined from "@mui/icons-material/CancelOutlined";

import CalculateTimesAgo from "../data/CalculateTimesAgo";
import ApproveParticipant from "../data/Participant/ApproveParticipant";
import DeclineParticipant from "../data/Participant/DeclineParticipant";
import GetAllJoinedActivities from "../data/Participant/GetAllJoinedActivities";
import UserButton from "../component/UserButton";

export default function Activity(prop) {
  const groupOptions = [
    { value: "All Activities" },
    { value: "Requested Activities" },
    { value: "Joined Activities" },
    { value: "My Hosted Activities" },
    { value: "Pending Request" },
  ];
  const [currentGroup, setCurrentGroup] = React.useState("All Activities");
  const [currentResult, setCurrentResult] = React.useState([]);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFail, setOpenFail] = React.useState(false);

  const [hasModified, setHasModified] = React.useState(false);
  const handleApproveActivityRequest = (requestID) => {
    const sendApproveRequest = async () => {
      if (await ApproveParticipant(requestID)) {
        setHasModified((prev) => !prev);
      }
    };
    sendApproveRequest();
  };

  const handleDeclineActivityRequest = (requestID) => {
    const sendDeclineRequest = async () => {
      if (await DeclineParticipant(requestID)) {
        setHasModified((prev) => !prev);
      }
    };
    sendDeclineRequest();
  };

  React.useEffect(() => {
    UpdateLocalUserProfile(prop.profile, prop.setProfile);
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      if (currentGroup === "All Activities") {
        setCurrentResult(await GetActivities());
      } else if (currentGroup === "My Hosted Activities") {
        setCurrentResult(
          (await GetActivities()).filter(
            (activity) => activity.hostID === prop.profile._id
          )
        );
      } else if (currentGroup === "Requested Activities") {
        const sentRequests = await GetAllSentRequests(prop.profile._id);
        const activityPromises = await sentRequests.map((request) => {
          return GetActivity(request.activityID);
        });
        const activities = await Promise.all(activityPromises);
        setCurrentResult(activities);
      } else if (currentGroup === "Joined Activities") {
        const joinedActivityRequests = await GetAllJoinedActivities(
          prop.profile._id
        );
        const activityPromises = await joinedActivityRequests.map((request) => {
          return GetActivity(request.activityID);
        });
        const activities = await Promise.all(activityPromises);
        setCurrentResult(activities);
      } else if (currentGroup === "Pending Request") {
        setCurrentResult([]);
        const pendingRequests = await GetPendingActivityRequests(
          prop.profile._id
        );
        const requests = await Promise.all(
          pendingRequests.map(async (request) => {
            const [userProfile, activity] = await Promise.all([
              GetUserProfile(request.participantID),
              GetActivity(request.activityID),
            ]);

            return {
              ...userProfile,
              ...activity,
              ...request,
              requestUserID: userProfile._id,
              requestUserLocation: userProfile.location,
              requestUserDescription: userProfile.description,
              activityDescription: activity.description,
              activityLocation: activity.location,
              activityID: activity._id,
            };
          })
        );
        setCurrentResult(requests);
      } else {
        setCurrentResult([]);
      }
    };
    getData();
    resetPaginationSetting();
  }, [currentGroup, hasModified, prop.profile._id]);

  const [openDetail, setOpenDetail] = React.useState(false);
  const [activityDetail, setActivityDetail] = React.useState({});

  const handleOpenActivityDetail = (
    profile,
    _id,
    hostID,
    hostName,
    activityName,
    pax,
    startDate,
    endDate,
    location,
    description
  ) => {
    setActivityDetail({
      profile: profile,
      _id: _id,
      hostID: hostID,
      hostName: hostName,
      activityName: activityName,
      pax: pax,
      startDate: startDate,
      endDate: endDate,
      location: location,
      description: description,
    });
    setOpenDetail(true);
  };

  // Settings for pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const activitiesPerPage = 10;
  const totalPages = Math.ceil(currentResult.length / activitiesPerPage);
  const startIndex = (currentPage - 1) * activitiesPerPage;
  const endIndex = startIndex + activitiesPerPage;
  const activitySection = currentResult.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const resetPaginationSetting = () => {
    setCurrentPage(1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        margin: "30px 0px",
        position: "relative",
      }}
    >
      <CustomizedSnackbar
        text="Successfully added new activity"
        open={openSuccess}
        setOpen={setOpenSuccess}
      />
      <CustomizedSnackbar
        text="Added new activity failed: Unknown Server Error"
        open={openFail}
        setOpen={setOpenFail}
      />
      <ActivityDetail
        open={openDetail}
        setOpen={setOpenDetail}
        {...activityDetail}
      />
      <FormDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        setOpenSuccess={setOpenSuccess}
        setOpenFail={setOpenFail}
        profile={prop.profile}
        title="Create New Activity"
        content="Fill up information about your proposed event for others to join!"
      />
      <Tooltip title="Add new activity">
        <IconButton
          onClick={() => {
            setOpenCreateDialog(true);
          }}
          sx={{
            position: "fixed",
            left: "90%",
            top: "80%",
            background:
              "linear-gradient(90deg, rgba(83,207,255,1) 0%, rgba(100,85,240,1) 100%)",
            "&:hover": {
              background:
                "linear-gradient(90deg, rgba(83,207,255,0.8) 0%, rgba(100,85,240,0.8) 100%)",
            },
          }}
        >
          <AddIcon sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <ToggleMenu
        size="small"
        value={currentGroup}
        setValue={setCurrentGroup}
        options={groupOptions}
      />
      <Box>
        {currentResult.length === 0 ? (
          <Box sx={{ marginTop: "30px" }}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 600,
                fontFamily: "Handlee, sans-serif",
                marginBottom: "20px",
              }}
            >
              No activity found at the moment...
              <br /> Perhaps you can try add your first one?
            </Typography>
            <img
              src={NoActivityPage}
              width="35%"
              style={{ borderRadius: "50%" }}
              alt="Background for blank Activity Page"
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "50px",
              }}
            >
              {currentGroup === "Pending Request" ? (
                <TableContainer component={Paper}>
                  <Table sx={{ width: "90vw" }}>
                    <TableHead
                      sx={{
                        background:
                          "linear-gradient(90deg, rgba(83,207,255,1) 0%, rgba(100,85,240,1) 100%)",
                      }}
                    >
                      <TableRow>
                        <TableCell sx={{ color: "white", textAlign: "center" }}>
                          Profile Info
                        </TableCell>
                        <TableCell sx={{ color: "white", textAlign: "center" }}>
                          Action Detail
                        </TableCell>
                        <TableCell sx={{ color: "white", textAlign: "center" }}>
                          Requested At
                        </TableCell>
                        <TableCell sx={{ color: "white", textAlign: "center" }}>
                          Host Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {activitySection.map((request) => (
                        <TableRow key={request._id + prop.profile._id}>
                          <UserButton
                            request={request}
                            userID={prop.profile._id}
                          />
                          <TableCell sx={{ textAlign: "center" }}>
                            <Typography>
                              <Typography
                                sx={{
                                  display: "inline",
                                  color: "gray",
                                  fontSize: "16px",
                                }}
                              >
                                {request.status === "Pending"
                                  ? "requested to join"
                                  : "has been invited to join"}
                              </Typography>{" "}
                              <Button
                                onClick={() =>
                                  handleOpenActivityDetail(
                                    prop.profile,
                                    request.activityID,
                                    request.hostID,
                                    request.hostName,
                                    request.activityName,
                                    request.pax,
                                    dayjs(request.startDate).format(
                                      "ddd, MMM D, YYYY h:mm A"
                                    ),
                                    dayjs(request.endDate).format(
                                      "ddd, MMM D, YYYY h:mm A"
                                    ),
                                    request.activityLocation,
                                    request.activityDescription
                                  )
                                }
                              >
                                {request.activityName}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{
                                color: "gray",
                                fontSize: "16px",
                                fontWeight: 400,
                              }}
                            >
                              {CalculateTimesAgo(request.updatedAt)}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Tooltip
                              title={`Approve join request from ${request.username}`}
                            >
                              <IconButton
                                sx={{ color: "#32CD32" }}
                                onClick={() =>
                                  handleApproveActivityRequest(request._id)
                                }
                              >
                                <CheckCircleOutline />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title={`Decline join request from ${request.username}`}
                            >
                              <IconButton
                                sx={{ color: "red" }}
                                onClick={() =>
                                  handleDeclineActivityRequest(request._id)
                                }
                              >
                                <CancelOutlined />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                activitySection.map((activity) => (
                  <ActivityCard
                    key={activity._id}
                    activity={activity}
                    profile={prop.profile}
                    setHasModified={setHasModified}
                  />
                ))
              )}
            </Box>
            <Pagination
              showFirstButton
              showLastButton
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{ marginTop: "50px", marginBottom: "20px" }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
