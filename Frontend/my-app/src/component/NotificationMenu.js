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

import GetUserFriendStatus from "../data/Friend/GetUserFriendStatus";

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
      setMessages(await GetUserFriendStatus(profile._id));
    };
    getData();
  }, [open, profile._id, setMessages]);

  React.useEffect(() => {
    const getRequestInfo = async () => {
      const requestPromises = messages.map((message) => {
        return axios.get(
          `${backendURL}/api/profiles/${
            message.fromUserID === profile._id
              ? message.toUserID
              : message.fromUserID
          }`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      });
      const profiles = await Promise.all(requestPromises);
      const profileData = profiles.map((profile) => profile.data);
      setNotifications(
        messages.map((message, index) => ({
          ...message,
          ...profileData[index],
          requestTime: message.updatedAt,
        }))
      );
    };
    getRequestInfo();
  }, [open, messages, setNotifications]);

  const getUserActionMessage = (status) => {
    return status === "Approved"
      ? "has approved your friend request"
      : status === "Declined"
      ? "has declined your friend request"
      : status === "Pending"
      ? "has sent you a friend request"
      : "";
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
                <>
                  <MenuItem key={notification.fromUserID}>
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
                            lineHeight: "14px",
                          }}
                        >
                          <Typography
                            sx={{
                              display: "inline",
                              color: "#5b93f8",
                              fontSize: "14px",
                            }}
                          >
                            {notification.username}
                          </Typography>{" "}
                          {getUserActionMessage(notification.status)}
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
                </>
              ))
            )}
          </MenuList>
        </Menu>
      </Badge>
    </React.Fragment>
  );
}
