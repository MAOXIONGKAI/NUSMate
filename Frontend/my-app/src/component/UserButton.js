import React from "react";
import axios from "axios";
import { Button, TableCell, Typography } from "@mui/material";
import ColorNameAvatar from "./ColorNameAvatar";
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

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function UserButton(prop) {
  const { request, userID } = prop;
  const { requestUserID } = request;
  const userProfile = {
    ...request,
    location: request.requestUserLocation,
    description: request.requestUserDescription,
  };
  const { username } = userProfile;

  // React States
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
            favoriteUserID: requestUserID,
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
  }, [userID, requestUserID, username]);

  // Check database to see if there is sent request to the target user
  React.useEffect(() => {
    const checkSendRequestStatus = async () => {
      setHasSentRequest(await CheckIfPendingRequest(userID, requestUserID));
    };
    checkSendRequestStatus();
  }, [userID, requestUserID]);

  // Check database to see if there is incoming request from target user
  React.useEffect(() => {
    const checkIncomingRequestStatus = async () => {
      setHasIncomingRequest(await CheckIfPendingRequest(requestUserID, userID));
    };
    checkIncomingRequestStatus();
  }, [userID, requestUserID]);

  // Check database to see if the user is a friend
  React.useEffect(() => {
    const checkFriendship = async () => {
      setIsFriend(await CheckIfFriend(userID, requestUserID));
    };
    checkFriendship();
  }, [userID, requestUserID]);

  const handleCheckProfile = () => {
    setOpenCard(true);
  };

  const createFavorite = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/api/favorites`,
        {
          userID: userID,
          favoriteUserID: requestUserID,
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
            favoriteUserID: requestUserID,
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
      if (await SendFriendRequest(userID, requestUserID)) {
        setHasSentRequest(true);
      }
    };
    sendFriendRequest();
  };

  const handleWithdrawFriendRequest = () => {
    const sendWithdrawRequest = async () => {
      const requestData = await GetFriendRequestData(userID, requestUserID);
      const requestID = await requestData._id;
      if (await WithdrawFriendRequest(requestID)) {
        setHasSentRequest(false);
      }
    };
    sendWithdrawRequest();
  };

  const handleApproveFriendRequest = () => {
    const sendApproveRequest = async () => {
      const requestData = await GetFriendRequestData(requestUserID, userID);
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
      const requestData = await GetFriendRequestData(requestUserID, userID);
      const requestID = await requestData._id;
      if (await DeclineFriendRequest(requestID)) {
        setHasIncomingRequest(false);
      }
    };
    sendDeclineRequest();
  };

  const handleRemoveFriend = () => {
    const sendRemoveRequest = async () => {
      const friendshipData = await GetFriendshipData(userID, requestUserID);
      const friendshipID = await friendshipData._id;
      if (await RemoveFriend(friendshipID)) {
        setIsFriend(false);
      }
    };
    sendRemoveRequest();
  };

  return (
    <>
      <CardDetail
        profile={userProfile}
        open={openCard}
        setOpen={setOpenCard}
        isFavorite={isFavorite}
        isFriend={isFriend}
        hasSentRequest={hasSentRequest}
        hasIncomingRequest={hasIncomingRequest}
        userID={userID}
        _id={requestUserID}
        setHasSentRequest={setHasSentRequest}
        handleAddFavorite={handleAddFavorite}
        handleDeleteFavorite={handleDeleteFavorite}
        handleSendFriendRequest={handleSendFriendRequest}
        handleWithdrawFriendRequest={handleWithdrawFriendRequest}
        handleApproveFriendRequest={handleApproveFriendRequest}
        handleDeclineFriendRequest={handleDeclineFriendRequest}
        handleRemoveFriend={handleRemoveFriend}
      />
      <Button
        sx={{
          margin: "0px",
          padding: "0px",
          width: "100%",
        }}
        onClick={handleCheckProfile}
      >
        <TableCell
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "8px",
          }}
        >
          <ColorNameAvatar
            username={username}
            sx={{ size: "14px", fontSize: "10px" }}
          />
          <Typography variant="body2" sx={{ color: "gray", fontSize: "10px" }}>
            {username}
          </Typography>
        </TableCell>
      </Button>
    </>
  );
}
