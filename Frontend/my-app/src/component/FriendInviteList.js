import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import ColorNameAvatar from "./ColorNameAvatar";
import { ListSubheader } from "@mui/material";

export default function FriendInviteList(prop) {
  const { profile, friends, checked, setChecked } = prop;

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListSubheader disableSticky>Friends who hasn't joined or requested to join this activity</ListSubheader>
      {friends.map((friend, value) => {
        const labelId = `checkbox-list-secondary-label-${friend._id}`;
        return (
          <ListItem
            key={profile._id + friend._id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton onClick={handleToggle(value)}>
              <ListItemAvatar>
                <ColorNameAvatar
                  username={friend.username}
                  sx={{
                    fontSize: "14px",
                    height: "40px",
                    width: "40px",
                    margin: "8px",
                  }}
                />
              </ListItemAvatar>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ListItemText
                  sx={{
                    "& .MuiListItemText-primary": {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  }}
                  id={labelId}
                  primary={friend.username}
                />
              </Box>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
