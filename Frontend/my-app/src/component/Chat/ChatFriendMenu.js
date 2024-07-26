import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Box,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import ColorNameAvatar from "../ColorNameAvatar";
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';

export default function ChatFriendMenu(prop) {
  const { profile, friends, currentFriend, setCurrentFriend } = prop;

  const handleSwitchFriend = (ID) => {
    setCurrentFriend(ID);
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        margin: "0px",
        padding: "0px",
        borderRight: "lightgray 2px solid",
        boxShadow: "2px 0px 2px 0px lightgray",
        overflow: "hidden",
      }}
    >
      {friends.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "lightgray",
            height: "calc(100vh - 75px)",
          }}
        >
          <PersonOffOutlinedIcon sx={{width: "125px", height: "125px"}} />
          <Typography>No Friend Profiles Available</Typography>
        </Box>
      ) : (
        friends.map((friend) => {
          const labelId = `checkbox-list-secondary-label-${friend._id}`;
          return (
            <div key={profile._id + friend._id}>
              <ListItem
                
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
            </div>
          );
        })
      )}
    </List>
  );
}
