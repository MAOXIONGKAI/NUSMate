import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import CircleIcon from "@mui/icons-material/Circle";
import ChecklistRtlOutlinedIcon from "@mui/icons-material/ChecklistRtlOutlined";
import MarkAsUnreadOutlinedIcon from "@mui/icons-material/MarkAsUnreadOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import ColorNameAvatar from "../ColorNameAvatar";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import {
  Divider,
  IconButton,
  ListItem,
  ListSubheader,
  MenuList,
  Typography,
} from "@mui/material";
import NoNotification from "../../image/NoNotification.jpg";
import CalculateTimesAgo from "../../data/CalculateTimesAgo";

import MarkAsRead from "../../data/Notification/MarkAsRead";
import MarkAsUnread from "../../data/Notification/MarkAsUnread";
import MarkAllAsRead from "../../data/Notification/MarkAllAsRead";
import MarkAllAsUnread from "../../data/Notification/MarkAllAsUnread";
import GetNotifications from "../../data/Notification/GetNotifications";

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

  const { profile, notifications, messages, setMessages, setNotifications } =
    prop;

  React.useEffect(() => {
    const getData = async () => {
      setMessages(await GetNotifications(profile._id));
    };
    getData();
  }, [open]);

  React.useEffect(() => {
    const getRequestInfo = async () => {
      if (!messages) return;
      const requestPromises = messages.map(async (message) => {
        const profileResponse = await axios
          .get(
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
          )
          .catch((error) => {
            console.log(
              "Error when fetching profile data contained in the notification through axios: " +
                JSON.stringify(error.response?.data) || error.message
            );
          });
        const activityResponse = message.activityID
          ? await axios
              .get(`${backendURL}/api/activities/${message.activityID}`)
              .catch((error) => {
                console.log(
                  "Error when fetching activity info contained in the notification through axios: " +
                    JSON.stringify(error.response?.data) || error.message
                );
              })
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
  }, [messages]);

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
      } else if (notification.status === "Invited") {
        return `has invited you to join`;
      } else if (notification.status === "Invite-Accepted") {
        return `has accepted your invitation to`;
      } else if (notification.status === "Invite-Rejected") {
        return `has rejected your invitation to`;
      } else {
        return "";
      }
    }
  };

  const handleMarkAsRead = (notification) => {
    const sendMarkRequest = async () => {
      await MarkAsRead(notification);
    };
    sendMarkRequest();
  };

  const handleMarkAsUnread = (notification) => {
    const sendMarkRequest = async () => {
      await MarkAsUnread(notification);
    };
    sendMarkRequest();
  };

  const handleMarkAllAsRead = (notifications) => {
    const sendMarkRequests = async () => {
      await MarkAllAsRead(notifications);
    };
    sendMarkRequests();
  };

  const handleMarkAllAsUnread = (notifications) => {
    const sendMarkRequests = async () => {
      await MarkAllAsUnread(notifications);
    };
    sendMarkRequests();
  };

  return (
    <React.Fragment>
      <Badge
        badgeContent={
          notifications.filter((notification) => !notification.notified).length
        }
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
          slotProps={{
            root: { sx: { ".MuiList-root": { padding: 0 } } },
          }}
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
            {notifications && notifications.length !== 0 && (
              <>
                <ListSubheader
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "right",
                    background:
                      "linear-gradient(90deg, rgba(83,207,255,1) 0%, rgba(100,85,240,1) 100%)",
                    marginBottom: "8px",
                  }}
                >
                  <Tooltip title="Mark all as read">
                    <IconButton
                      size="small"
                      sx={{ color: "white" }}
                      onClick={() => handleMarkAllAsRead(notifications)}
                    >
                      <ChecklistRtlOutlinedIcon
                        sx={{ width: "20px", height: "20px" }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Mark all as unread">
                    <IconButton
                      size="small"
                      sx={{ color: "white" }}
                      onClick={() => handleMarkAllAsUnread(notifications)}
                    >
                      <MarkAsUnreadOutlinedIcon
                        sx={{ width: "20px", height: "20px" }}
                      />
                    </IconButton>
                  </Tooltip>
                </ListSubheader>
              </>
            )}
            {notifications.length === 0 ? (
              <ListItem>
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
              </ListItem>
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
                  <ListItem>
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
                            display: "inline",
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
                            {!notification.notified && (
                              <CircleIcon
                                sx={{
                                  display: "inline",
                                  height: "8px",
                                  width: "8px",
                                  color: "red",
                                }}
                                style={{ verticalAlign: "middle" }}
                              />
                            )}{" "}
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
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "gray",
                              fontSize: "12px",
                            }}
                          >
                            {CalculateTimesAgo(notification.requestTime)}
                          </Typography>
                          <Box sx={{ display: "flex" }}>
                            <Tooltip title="Mark as read">
                              <IconButton
                                size="small"
                                sx={{ color: "#5b93f8" }}
                                onClick={() => handleMarkAsRead(notification)}
                              >
                                <MarkEmailReadOutlinedIcon
                                  sx={{ width: "20px", height: "20px" }}
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Mark as unread">
                              <IconButton
                                size="small"
                                sx={{ color: "#5b93f8" }}
                                onClick={() => handleMarkAsUnread(notification)}
                              >
                                <MarkEmailUnreadOutlinedIcon
                                  sx={{ width: "20px", height: "20px" }}
                                />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                  <Divider sx={{ marginBottom: "5px" }} />
                </React.Fragment>
              ))
            )}
          </MenuList>
        </Menu>
      </Badge>
    </React.Fragment>
  );
}