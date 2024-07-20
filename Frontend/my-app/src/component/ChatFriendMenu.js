import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Box,
  ListItemText,
  Divider,
} from "@mui/material";
import ColorNameAvatar from "./ColorNameAvatar";

export default function ChatFriendMenu(prop) {
  const { profile, friends, currentFriend, setCurrentFriend } = prop;

  const handleSwitchFriend = (ID) => {
    setCurrentFriend(ID);
    console.log("Switched to chat with user: " + ID);
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        margin: "0px",
        padding: "0px",
      }}
    >
      {friends.map((friend) => {
        const labelId = `checkbox-list-secondary-label-${friend._id}`;
        return (
          <React.Fragment>
            <ListItem
              key={profile._id + friend._id}
              disablePadding
              sx={{
                backgroundColor:
                  currentFriend === friend._id ? "#F0F0F0" : "white",
              }}
            >
              <ListItemButton onClick={() => handleSwitchFriend(friend._id)}>
                <ListItemAvatar>
                  <ColorNameAvatar
                    username={friend.username}
                    sx={{
                      fontSize: "14px",
                      height: "32px",
                      width: "32px",
                      margin: "0px",
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
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
}
