import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import ColorNameAvatar from "../component/ColorNameAvatar";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import { Divider, IconButton, MenuList, Typography } from "@mui/material";
import GetPendingFriendRequest from "../data/GetPendingFriendRequest";

export default function NotificationMenu(prop) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [messages, setMessages] = React.useState([]);
  const { profile } = prop;

  React.useEffect(() => {
    const getData = async () => {
      setMessages(await GetPendingFriendRequest(profile._id));
    };
    getData();
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
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
          {messages.map((message) => (
            <>
              <MenuItem key={message.toUserID}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ColorNameAvatar
                    username="Test"
                    sx={{ width: "32px", height: "32px", fontSize: "18px" }}
                  />
                  <Typography sx={{ color: "dimgray", fontSize: "14px" }}>
                    {message.fromUserID} has sent you a friend request.
                  </Typography>
                </Box>
              </MenuItem>
              <Divider />
            </>
          ))}
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}
