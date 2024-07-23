import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { db } from "../data/Firebase/firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch
} from "firebase/firestore";
import Card from "@mui/material/Card";
import {
  Table,
  TableRow,
  TableCell,
  CardActionArea,
  Box,
} from "@mui/material/";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ColorNameAvatar from "./ColorNameAvatar";
import { Tooltip } from "@mui/material";
import CardDetail from "./CardDetail";
import SendFriendRequest from "../data/Friend/SendFriendRequest";
import CheckIfPendingRequest from "../data/Friend/CheckIfPendingRequest";
import WithdrawFriendRequest from "../data/Friend/WithdrawFriendRequest";
import ApproveFriendRequest from "../data/Friend/ApproveFriendRequest";
import GetFriendRequestData from "../data/Friend/GetFriendRequestData";
import CheckIfFriend from "../data/Friend/CheckIfFriend";
import DeclineFriendRequest from "../data/Friend/DeclineFriendRequest";
import GetFriendshipData from "../data/Friend/GetFriendshipData";
import RemoveFriend from "../data/Friend/RemoveFriend";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function UserCard(prop) {
  // Unpack Card Information
  const {
    _id,
    username,
    first_major,
    second_major,
    education_status,
    interests,
    description,
  } = prop.profile;

  const { refreshPage } = prop;

  // Get the view user's profile ID
  const userID = prop.userID;

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
            favoriteUserID: _id,
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
  }, [userID, _id, username]);

  // Check database to see if there is sent request to the target user
  React.useEffect(() => {
    const checkSendRequestStatus = async () => {
      setHasSentRequest(await CheckIfPendingRequest(userID, _id));
    };
    checkSendRequestStatus();
  }, [userID, _id]);

  // Check database to see if there is incoming request from target user
  React.useEffect(() => {
    const checkIncomingRequestStatus = async () => {
      setHasIncomingRequest(await CheckIfPendingRequest(_id, userID));
    };
    checkIncomingRequestStatus();
  }, [userID, _id]);

  // Check database to see if the user is a friend
  React.useEffect(() => {
    const checkFriendship = async () => {
      setIsFriend(await CheckIfFriend(userID, _id));
    };
    checkFriendship();
  }, [userID, _id]);

  const handleCheckProfile = () => {
    setOpenCard(true);
  };

  const createFavorite = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/api/favorites`,
        {
          userID: userID,
          favoriteUserID: _id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(
      //   `${username} successfully added to favorite: ` +
      //     JSON.stringify(response.data)
      // );
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
            favoriteUserID: _id,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(
      //   `${username} successfully removed from your favorite: ` +
      //     JSON.stringify(response.data)
      // );
    } catch (error) {
      console.log(
        "Error when deleting favorite from user collection: " + error
      );
    }
  };

  const handleAddFavorite = () => {
    setIsFavorite(true);
    createFavorite();
    refreshPage();
  };

  const handleDeleteFavorite = () => {
    setIsFavorite(false);
    deleteFavorite();
    refreshPage();
  };

  const handleSendFriendRequest = () => {
    const sendFriendRequest = async () => {
      if (await SendFriendRequest(userID, _id)) {
        setHasSentRequest(true);
      }
    };
    sendFriendRequest();
    refreshPage();
  };

  const handleWithdrawFriendRequest = () => {
    const sendWithdrawRequest = async () => {
      const requestData = await GetFriendRequestData(userID, _id);
      const requestID = await requestData._id;
      if (await WithdrawFriendRequest(requestID)) {
        setHasSentRequest(false);
        refreshPage();
      }
    };
    sendWithdrawRequest();
  };

  const handleApproveFriendRequest = () => {
    const sendApproveRequest = async () => {
      const requestData = await GetFriendRequestData(_id, userID);
      const requestID = await requestData._id;
      if (await ApproveFriendRequest(requestID)) {
        setIsFriend(true);
        setHasIncomingRequest(false);
        refreshPage();
      }
    };
    sendApproveRequest();
  };

  const handleDeclineFriendRequest = () => {
    const sendDeclineRequest = async () => {
      const requestData = await GetFriendRequestData(_id, userID);
      const requestID = await requestData._id;
      if (await DeclineFriendRequest(requestID)) {
        setHasIncomingRequest(false);
        refreshPage();
      }
    };
    sendDeclineRequest();
  };

  const handleRemoveFriend = () => {
    const deleteChatHistory = async (userID1, userID2) => {
      const messagesCollection = collection(db, "messages");
      const q = query(
        messagesCollection,
        where("user", "array-contains", userID1)
      );
      const querySnapshot = await getDocs(q);
      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        if (doc.data().user.includes(userID2)) {
          batch.delete(doc.ref);
        }
      });
      await batch.commit();
    };
    const sendRemoveRequest = async () => {
      const friendshipData = await GetFriendshipData(userID, _id);
      const friendshipID = await friendshipData._id;
      if (await RemoveFriend(friendshipID)) {
        deleteChatHistory(userID, _id);
        setIsFriend(false);
        refreshPage();
      }
    };
    sendRemoveRequest();
  };

  const navigate = useNavigate();
  const handleMessageFriend = () => {
    navigate("/chat", { state: { data: _id } });
  };

  return (
    <React.Fragment>
      <CardDetail
        profile={prop.profile}
        open={openCard}
        setOpen={setOpenCard}
        isFavorite={isFavorite}
        isFriend={isFriend}
        hasSentRequest={hasSentRequest}
        hasIncomingRequest={hasIncomingRequest}
        userID={userID}
        _id={_id}
        setHasSentRequest={setHasSentRequest}
        handleAddFavorite={handleAddFavorite}
        handleDeleteFavorite={handleDeleteFavorite}
        handleSendFriendRequest={handleSendFriendRequest}
        handleWithdrawFriendRequest={handleWithdrawFriendRequest}
        handleApproveFriendRequest={handleApproveFriendRequest}
        handleDeclineFriendRequest={handleDeclineFriendRequest}
        handleRemoveFriend={handleRemoveFriend}
      />
      <Card
        sx={{
          ...prop.sx,
          borderRadius: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minWidth: "340px",
          boxShadow: 6,
        }}
      >
        <CardActionArea sx={{ height: "100%" }} onClick={handleCheckProfile}>
          <CardHeader
            avatar={
              <ColorNameAvatar
                username={username}
                sx={{ width: "48px", height: "48px", fontSize: "18px" }}
              />
            }
            sx={{
              textAlign: "center",
              backgroundColor: "#DFF1FF",
              "& .MuiCardHeader-subheader": {
                fontSize: "14px",
              },
            }}
            title={`${username} (${
              education_status === "Undergraduate"
                ? "BA"
                : education_status === "Master"
                ? "MA"
                : education_status === "Doctorate"
                ? "PhD"
                : "Alum"
            })`}
            subheader={`${first_major} ${
              second_major ? `/ ${second_major}` : ""
            }`}
          />
          <CardContent sx={{ height: "100%" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "16px",
                textWrap: "wrap",
                wordBreak: "break-word",
              }}
            >
              {description
                ? description
                : "This user is lazy, doesn't really leave anything over here..."}
            </Typography>
            {interests.length > 0 && (
              <Table>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Interest:
                  </TableCell>
                  <TableCell>
                    <ul
                      style={{
                        listStyleType: "disc",
                        margin: 0,
                        paddingInlineStart: "20px",
                      }}
                    >
                      {interests.map((interest, index) => (
                        <li key={index} style={{ fontWeight: "lighter" }}>
                          {interest}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              </Table>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions
          disableSpacing
          sx={{ marginTop: "auto", backgroundColor: "#EFF9FF" }}
        >
          <Box sx={{ display: "flex", marginLeft: "auto" }}>
            {isFavorite ? (
              <Tooltip title={`Remove ${username} from favorites`}>
                <IconButton
                  aria-label="remove from favorites"
                  onClick={handleDeleteFavorite}
                >
                  <FavoriteIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title={`Add ${username} to favorites`}>
                <IconButton
                  aria-label="add to favorites"
                  onClick={handleAddFavorite}
                >
                  <FavoriteBorderIcon />
                </IconButton>
              </Tooltip>
            )}
            {isFriend ? (
              <>
                <Tooltip title={`Message ${username}`}>
                  <IconButton
                    aria-label="Message user"
                    onClick={handleMessageFriend}
                  >
                    <MailOutlineIcon aria-label="Message User" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Remove friend: ${username}`}>
                  <IconButton
                    aria-label="Remove friend"
                    onClick={handleRemoveFriend}
                  >
                    <PersonRemoveIcon aria-label="Remove Friend" />
                  </IconButton>
                </Tooltip>
              </>
            ) : hasIncomingRequest ? (
              <>
                <Tooltip title={`Approve Friend Request from ${username}`}>
                  <IconButton
                    sx={{ color: "#32CD32" }}
                    aria-label="Approve friend request"
                    onClick={handleApproveFriendRequest}
                  >
                    <CheckCircleOutlineIcon aria-label="Approve Friend Request" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Decline Friend Request from ${username}`}>
                  <IconButton
                    sx={{ color: "red" }}
                    aria-label="Decline friend request"
                    onClick={handleDeclineFriendRequest}
                  >
                    <CancelOutlinedIcon aria-label="Decline Friend Request" />
                  </IconButton>
                </Tooltip>
              </>
            ) : hasSentRequest ? (
              <Tooltip title={`Withdraw Friend Request to ${username}`}>
                <IconButton
                  aria-label="withdraw friend request"
                  onClick={handleWithdrawFriendRequest}
                >
                  <HowToRegIcon aria-label="Withdraw Friend Request" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title={`Send Friend Request to ${username}`}>
                <IconButton
                  aria-label="send friend request"
                  onClick={handleSendFriendRequest}
                >
                  <PersonAddAlt1Icon aria-label="Send Friend Request" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
