import React from "react";
import dayjs from "dayjs";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardActionArea,
  IconButton,
  Tooltip,
} from "@mui/material";
import ColorNameAvatar from "../component/ColorNameAvatar";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteActivity from "../data/DeleteActivity";
import CustomizedSnackbar from "./CustomizedSnackbar";
import ActivityDetail from "./ActivityDetail";

export default function ActivityCard(prop) {
  const { activity } = prop;
  let {
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
  const [openDeleteSuccess, setOpenDeleteSuccess] = React.useState(false);
  const [openDeleteFail, setOpenDeleteFail] = React.useState(false);

  const handleOpenDetail = () => {
    setOpenDetail(true);
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
      <ActivityDetail open={openDetail} setOpenDetail={setOpenDetail} />
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
            width: "8%",
            minWidth: "120px",
            padding: "10% 0px",
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
                  <Typography variant="body2">(1/{pax})</Typography>
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
              sx={{ marginBottom: "auto" }}
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
            minWidth: "120px",
            padding: "10.6% 0px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EFF9FF",
          }}
        >
          {prop.profile._id === hostID ? (
            <>
              <Tooltip title="Edit this activity">
                <IconButton
                  onClick={() => {
                    console.log("Editing: " + activityName);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete this activity">
                <IconButton
                  onClick={() => {
                    if (DeleteActivity(activity._id)) {
                      setOpenDeleteSuccess(true);
                    } else {
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Request to join this activity">
              <IconButton>
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
