import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import ColorNameAvatar from "./ColorNameAvatar";

export default function AccountMenu(prop) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size=""
            sx={{ ml: 2, padding: "4px" }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <ColorNameAvatar
              username={prop.profile.username}
              sx={{
                width: "32px",
                height: "32px",
                fontSize: "14px",
                margin: "0px",
              }}
            />
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
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
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
        <MenuItem component={Link} to="/profile">
          <Avatar sx={{ mr: 1 }} /> Profile
        </MenuItem>
        <MenuItem component={Link} to="/friend">
          <Diversity2Icon sx={{ color: "gray", mr: 1 }} /> Friend
        </MenuItem>
        <Divider />
        <MenuItem
          component={Link}
          to={"/"}
          onClick={() => {
            try {
              const loginForm = JSON.parse(
                window.localStorage.getItem("loginFormData")
              );
              window.localStorage.clear();
              if (loginForm && loginForm.remember) {
                window.localStorage.setItem(
                  "loginFormData",
                  JSON.stringify(loginForm)
                );
              }
            } catch (error) {
              console.log("loginFormData is empty");
            } finally {
              prop.setLoggedIn(false);
            }
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography variant="body1" sx={{ color: "primary.main" }}>
            Log out
          </Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
