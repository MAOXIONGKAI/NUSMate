import React from "react";
import axios from "axios";
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
import ShareIcon from "@mui/icons-material/Share";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ColorNameAvatar from "./ColorNameAvatar";
import { Tooltip } from "@mui/material";
import CardDetail from "./CardDetail";
import SendFriendRequest from "../data/SendFriendRequest";

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

  // Get the view user's profile ID
  const userID = prop.userID;

  // React States
  const [openCard, setOpenCard] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

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
  }, []);

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
            favoriteUserID: _id,
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

  return (
    <React.Fragment>
      <CardDetail
        profile={prop.profile}
        open={openCard}
        setOpen={setOpenCard}
        isFavorite={isFavorite}
        handleAddFavorite={handleAddFavorite}
        handleDeleteFavorite={handleDeleteFavorite}
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
              sx={{ fontSize: "16px" }}
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
            <Tooltip title={`Send Friend Request to ${username}`}>
              <IconButton onClick={() => SendFriendRequest(userID, _id)}>
                <PersonAddAlt1Icon aria-label="Send Friend Request" />
              </IconButton>
            </Tooltip>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
