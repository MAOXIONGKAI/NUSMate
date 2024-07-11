import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ToggleMenu from "../component/ToggleMenu";
import NoActivityPage from "../image/NoActivityPage.jpg";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "../component/FormDialog";
import CustomizedSnackbar from "../component/CustomizedSnackbar";
import UpdateLocalUserProfile from "../data/UpdateLocalUserProfile";
import GetActivities from "../data/Activity/GetActivities";
import ActivityCard from "../component/ActivityCard";
import GetAllSentRequests from "../data/Participant/GetAllSentRequests";
import GetActivity from "../data/Activity/GetActivity";

export default function Activity(prop) {
  const groupOptions = [
    { value: "All Activities" },
    { value: "Requested Activities" },
    { value: "Joined Activities" },
    { value: "My Hosted Activities" },
  ];
  const [currentGroup, setCurrentGroup] = React.useState("All Activities");
  const [currentResult, setCurrentResult] = React.useState([]);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFail, setOpenFail] = React.useState(false);

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
        const activityPromises = await sentRequests.map(request => {
          return GetActivity(request.activityID);
        })
        const activities = await Promise.all(activityPromises);
        console.log(activities)
        setCurrentResult(activities);
      } else {
        setCurrentResult([]);
      }
    };
    getData();
    resetPaginationSetting();
  }, [currentGroup]);

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
              {activitySection.map((activity) => (
                <ActivityCard
                  key={activity._id}
                  activity={activity}
                  profile={prop.profile}
                />
              ))}
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
