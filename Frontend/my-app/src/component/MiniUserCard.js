import React from "react";
import axios from "axios";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ColorNameAvatar from "./ColorNameAvatar";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CardDetail from "./CardDetail";
import CheckIfPendingRequest from "../data/Friend/CheckIfPendingRequest";
import CheckIfFriend from "../data/Friend/CheckIfFriend";
import SendFriendRequest from "../data/Friend/SendFriendRequest";
import GetFriendRequestData from "../data/Friend/GetFriendRequestData";
import WithdrawFriendRequest from "../data/Friend/WithdrawFriendRequest";
import ApproveFriendRequest from "../data/Friend/ApproveFriendRequest";
import DeclineFriendRequest from "../data/Friend/DeclineFriendRequest";
import GetFriendshipData from "../data/Friend/GetFriendshipData";
import RemoveFriend from "../data/Friend/RemoveFriend";
import GetJoinedParticipant from "../data/Participant/GetJoinedParticipant";
import RemoveParticipant from "../data/Participant/RemoveParticipant";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function MiniUserCard(prop) {
  const {
    isHost,
    isEditMode,
    profile,
    userID,
    participantID,
    activityID,
    openRemoveSuccess,
    setOpenRemoveSuccess
  } = prop;

  const { username } = profile;

  const [openCard, setOpenCard] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [hasSentRequest, setHasSentRequest] = React.useState(false);
  const [hasIncomingRequest, setHasIncomingRequest] = React.useState(false);
  const [isFriend, setIsFriend] = React.useState(false);

  // Check database to see if the user has been added to favorite
  React.useEffect(() => {
    const getFavStatus = async () => {
      try {
        const response = await axios.post(
          `${backendURL}/api/favorites/check_relationship`,
          {
            userID: userID,
            favoriteUserID: participantID,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsFavorite(response.data.length !== 0);
      } catch (error) {
        console.log(
          `Error when getting favorite status of ${username}: ` + error
        );
      }
    };
    getFavStatus();
  }, [userID, participantID, username]);

  // Check database to see if there is sent request to the target user
  React.useEffect(() => {
    const checkSendRequestStatus = async () => {
      setHasSentRequest(await CheckIfPendingRequest(userID, participantID));
    };
    checkSendRequestStatus();
  }, [userID, participantID]);

  // Check database to see if there is incoming request from target user
  React.useEffect(() => {
    const checkIncomingRequestStatus = async () => {
      setHasIncomingRequest(await CheckIfPendingRequest(participantID, userID));
    };
    checkIncomingRequestStatus();
  }, [userID, participantID]);

  // Check database to see if the user is a friend
  React.useEffect(() => {
    const checkFriendship = async () => {
      setIsFriend(await CheckIfFriend(userID, participantID));
    };
    checkFriendship();
  }, [userID, participantID]);

  const handleCheckProfile = () => {
    setOpenCard(true);
  };

  const createFavorite = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/api/favorites`,
        {
          userID: userID,
          favoriteUserID: participantID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        `${username} successfully added to favorite: ` +
          JSON.stringify(response.data)
      );
    } catch (error) {
      console.log("Error when setting user profile as favorite: " + error);
    }
  };

  const deleteFavorite = async () => {
    try {
      const response = await axios.delete(
        `${backendURL}/api/favorites`,
        {
          data: {
            userID: userID,
            favoriteUserID: participantID,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        `${username} successfully removed from your favorite: ` +
          JSON.stringify(response.data)
      );
    } catch (error) {
      console.log(
        "Error when deleting favorite from user collection: " + error
      );
    }
  };

  const handleAddFavorite = () => {
    setIsFavorite(true);
    createFavorite();
  };

  const handleDeleteFavorite = () => {
    setIsFavorite(false);
    deleteFavorite();
  };

  const handleSendFriendRequest = () => {
    const sendFriendRequest = async () => {
      if (await SendFriendRequest(userID, participantID)) {
        setHasSentRequest(true);
      }
    };
    sendFriendRequest();
  };

  const handleWithdrawFriendRequest = () => {
    const sendWithdrawRequest = async () => {
      const requestData = await GetFriendRequestData(userID, participantID);
      const requestID = await requestData._id;
      if (await WithdrawFriendRequest(requestID)) {
        setHasSentRequest(false);
      }
    };
    sendWithdrawRequest();
  };

  const handleApproveFriendRequest = () => {
    const sendApproveRequest = async () => {
      const requestData = await GetFriendRequestData(participantID, userID);
      const requestID = await requestData._id;
      if (await ApproveFriendRequest(requestID)) {
        setIsFriend(true);
        setHasIncomingRequest(false);
      }
    };
    sendApproveRequest();
  };

  const handleDeclineFriendRequest = () => {
    const sendDeclineRequest = async () => {
      const requestData = await GetFriendRequestData(participantID, userID);
      const requestID = await requestData._id;
      if (await DeclineFriendRequest(requestID)) {
        setHasIncomingRequest(false);
      }
    };
    sendDeclineRequest();
  };

  const handleRemoveFriend = () => {
    const sendRemoveRequest = async () => {
      const friendshipData = await GetFriendshipData(userID, participantID);
      const friendshipID = await friendshipData._id;
      if (await RemoveFriend(friendshipID)) {
        setIsFriend(false);
      }
    };
    sendRemoveRequest();
  };

  const handleRemoveParticipant = () => {
    const sendRemoveRequest = async () => {
      const requestData = await GetJoinedParticipant(participantID, activityID);
      const requestID = await requestData._id;
      if (await RemoveParticipant(requestID)) {
         setOpenRemoveSuccess(true);
      }
    };
    sendRemoveRequest();
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        position: "relative",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        boxShadow: 3,
      }}
    >
      <CardDetail
        profile={prop.profile}
        open={openCard}
        setOpen={setOpenCard}
        isFavorite={isFavorite}
        isFriend={isFriend}
        hasSentRequest={hasSentRequest}
        hasIncomingRequest={hasIncomingRequest}
        userID={userID}
        _id={participantID}
        setHasSentRequest={setHasSentRequest}
        handleAddFavorite={handleAddFavorite}
        handleDeleteFavorite={handleDeleteFavorite}
        handleSendFriendRequest={handleSendFriendRequest}
        handleWithdrawFriendRequest={handleWithdrawFriendRequest}
        handleApproveFriendRequest={handleApproveFriendRequest}
        handleDeclineFriendRequest={handleDeclineFriendRequest}
        handleRemoveFriend={handleRemoveFriend}
      />

      <ColorNameAvatar
        username={username}
        sx={{
          fontSize: "14px",
          height: "40px",
          width: "40px",
          margin: "8px",
        }}
      />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%)",
          }}
        >
          <Typography>{username}</Typography>
          {isHost && (
            <Box
              sx={{
                color: "white",
                backgroundColor: "green",
                borderRadius: "12px",
              }}
            >
              <Typography sx={{ fontSize: "14px", padding: "6px" }}>
                Host
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", margin: "0px 10px", marginLeft: "auto" }}>
        {participantID !== userID && (
          <Tooltip title={`View ${username}'s profile`}>
            <IconButton onClick={handleCheckProfile}>
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
        {isEditMode && !isHost && (
          <Tooltip title={`Remove ${username} from the activity`}>
            <IconButton onClick={handleRemoveParticipant}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}
