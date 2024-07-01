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
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteActivity from "../data/DeleteActivity";
import CustomizedSnackbar from "./CustomizedSnackbar";

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

  const [openDeleteSuccess, setOpenDeleteSuccess] = React.useState(false);
  const [openDeleteFail, setOpenDeleteFail] = React.useState(false);

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
        <CardHeader
          avatar={
            <ColorNameAvatar
              username={hostName}
              sx={{ width: "36px", height: "36px", fontSize: "14px" }}
            />
          }
          title={
            <Typography variant="caption" sx={{ fontSize: "12px" }}>
              {hostName}
            </Typography>
          }
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "#DFF1FF",
            marginRight: "auto",
            width: "120px",
            padding: "10% 0px",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "top",
            padding: "16px",
            margin: "0px",
            marginRight: "auto",
          }}
        >
          <Box sx={{ margin: "0px", marginBottom: "auto" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "auto",
                gap: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <Typography variant="h6">{activityName}</Typography>
                <Typography sx={{ color: "dimgray" }}>@{location}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  color: "green",
                  margin: "0px",
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
          <Typography sx={{marginBottom: "auto"}} variant="body2" color="textSecondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            width: "10%",
            padding: "10.6% 0px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EFF9FF",
          }}
        >
          {prop.profile._id === hostID ? (
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
