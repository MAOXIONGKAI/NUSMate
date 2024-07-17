import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import ColorNameAvatar from "../component/ColorNameAvatar";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import { Divider, IconButton, MenuList, Typography } from "@mui/material";
import NoNotification from "../image/NoNotification.jpg";
import CalculateTimesAgo from "../data/CalculateTimesAgo";

import GetNotifications from "../data/Notification/GetNotifications";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function NotificationMenu(prop) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { profile, notifications, setNotifications, messages, setMessages } =
    prop;

  React.useEffect(() => {
    const getData = async () => {
      setMessages(await GetNotifications(profile._id));
    };
    getData();
  }, [open, profile._id, setMessages]);

  React.useEffect(() => {
    const getRequestInfo = async () => {
      const requestPromises = messages.map(async (message) => {
        const profileResponse = await axios.get(
          `${backendURL}/api/profiles/${
            message.activityID
              ? message.participantID === profile._id
                ? message.hostID
                : message.participantID
              : message.fromUserID === profile._id
              ? message.toUserID
              : message.fromUserID
          }`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const activityResponse = message.activityID
          ? await axios.get(
              `${backendURL}/api/activities/${message.activityID}`
            )
          : null;

        const profileData = await profileResponse.data;
        const activityData = await activityResponse?.data;
        return {
          ...profileData,
          ...(activityData ? activityData : {}),
          ...message,
          requestTime: message.updatedAt,
        };
      });

      const result = await Promise.all(requestPromises);
      setNotifications(result);
    };
    getRequestInfo();
  }, [open, messages, setNotifications, profile._id]);

  const getUserActionMessage = (notification) => {
    if (notification.fromUserID) {
      if (notification.status === "Approved") {
        return "has approved your friend request";
      } else if (notification.status === "Declined") {
        return "has declined your friend request";
      } else if (notification.status === "Pending") {
        return "has sent you a friend request";
      } else {
        return "";
      }
    } else {
      if (notification.status === "Approved") {
        return `has approved your request to join`;
      } else if (notification.status === "Declined") {
        return `has declined your request to join`;
      } else if (notification.status === "Pending") {
        return `has requested to join`;
      }else if (notification.status === "Invited") {
        return `has invited you to join`;
      }else if (notification.status === "Invite-Accepted") {
        return `has accepted your invitation to`;
      }else if (notification.status === "Invite-Rejected") {
        return `has rejected your invitation to`;
      } else {
        return "";
      }
    }
  };

  return (
    <React.Fragment>
      <Badge
        badgeContent={notifications.length}
        overlap="circular"
        color="primary"
      >
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Notification">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <NotificationsNone />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "hiden",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              maxWidth: "300px",
              maxHeight: "350px",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuList
            sx={{
              "& .MuiMenuItem-root": {
                whiteSpace: "normal",
              },
            }}
          >
            {notifications.length === 0 ? (
              <MenuItem disabled>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    width="80%"
                    src={NoNotification}
                    alt="No Notification Background"
                  />
                </Box>
              </MenuItem>
            ) : (
              notifications.map((notification) => (
                <React.Fragment
                  key={
                    profile.id +
                    (notification?.fromUserID
                      ? notification?.fromUserID === profile._id
                        ? notification?.toUserID
                        : notification?.fromUserID
                      : notification?.participantID === profile._id
                      ? notification?.hostID
                      : notification?.participantID) +
                    notification.activityID +
                    notification._id
                  }
                >
                  <MenuItem>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <ColorNameAvatar
                        username={notification.username}
                        sx={{ width: "32px", height: "32px", fontSize: "12px" }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "black",
                            fontSize: "14px",
                            lineHeight: "18px",
                          }}
                        >
                          <Typography
                            sx={{
                              display: "inline",
                              color: "#5b93f8",
                              fontSize: "14px",
                              lineHeight: "18px",
                            }}
                          >
                            {notification.username}
                          </Typography>{" "}
                          {getUserActionMessage(notification)}{" "}
                          {notification.activityID ? (
                            <Typography
                              sx={{
                                display: "inline",
                                color: "#5b93f8",
                                fontSize: "14px",
                                lineHeight: "18px",
                              }}
                            >
                              {notification.activityName}
                            </Typography>
                          ) : (
                            <></>
                          )}
                        </Typography>
                        <Typography
                          sx={{
                            color: "gray",
                            fontSize: "12px",
                          }}
                        >
                          {CalculateTimesAgo(notification.requestTime)}
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  <Divider />
                </React.Fragment>
              ))
            )}
          </MenuList>
        </Menu>
      </Badge>
    </React.Fragment>
  );
}
