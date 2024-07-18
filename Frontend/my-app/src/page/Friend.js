import { Typography, Box } from "@mui/material";
import React from "react";
import axios from "axios";
import ToggleMenu from "../component/ToggleMenu";
import { Container, Grid, Pagination } from "@mui/material";
import UserCard from "../component/UserCard";
import NoFriendPage from "../image/NoFriendPage.png";

export default function Friend(prop) {
  const groupOptions = [
    { value: "My Friend" },
    { value: "My Friend Request" },
    { value: "Pending Request" },
    { value: "Favorite" },
  ];
  const [currentGroup, setCurrentGroup] = React.useState("Favorite");
  const [currentResult, setCurrentResult] = React.useState([]);

  const userID = prop.profile._id;
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const getMyFriends = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/friends/all_friends/${userID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCurrentResult(response.data);
    } catch (error) {
      console.log(
        "Error when fetching user friends collection from database: " +
          JSON.stringify(error.response?.data) || error.message
      );
    }
  };

  const getFavorite = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/favorites/${userID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCurrentResult(response.data);
    } catch (error) {
      console.log(
        "Error when fetching favorite user collection from database: " +
          JSON.stringify(error.response?.data) || error.message
      );
    }
  };

  const getMyFriendRequest = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/friends/sent_request/${userID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCurrentResult(response.data);
    } catch (error) {
      console.log(
        "Error when fetching user's own friend request collection from database: " +
          JSON.stringify(error.response?.data) || error.message
      );
    }
  };

  const getPendingRequest = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/friends/pending_request/${userID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCurrentResult(response.data);
    } catch (error) {
      console.log(
        "Error when fetching pending request collection from database: " +
          JSON.stringify(error.response?.data) || error.message
      );
    }
  };

  const getMyFriendProfiles = async () => {
    try {
      const profilePromises = currentResult.map((request) => {
        const ID =
          request.fromUserID !== userID ? request.fromUserID : request.toUserID;

        return axios.get(`${backendURL}/api/profiles/${ID}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      });
      const responses = await Promise.all(profilePromises);
      const responsesData = responses
        .filter((response) => response)
        .map((response) => response.data);
      setProfiles(responsesData);
    } catch (error) {
      console.log(
        "Error when fetching pending request user profiles: " +
          JSON.stringify(error.response?.data) || error.message
      );
    }
  };

  const getFavoriteProfiles = async () => {
    try {
      const profilePromises = currentResult.map((relationship) => {
        return axios.get(
          `${backendURL}/api/profiles/${relationship.favoriteUserID}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      });
      const responses = await Promise.all(profilePromises);
      const responsesData = responses
        .filter((response) => response)
        .map((response) => response.data);
      setProfiles(responsesData);
    } catch (error) {
      console.log(
        "Error when fetching favorite user profiles: " +
          JSON.stringify(error.response?.data) || error.message
      );
    }
  };

  const getPendingRequestProfiles = async () => {
    try {
      const profilePromises = currentResult.map((request) => {
        return axios.get(
          `${backendURL}/api/profiles/${
            request.fromUserID === userID
              ? request.toUserID
              : request.fromUserID
          }`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      });
      const responses = await Promise.all(profilePromises);
      const responsesData = responses
        .filter((response) => response)
        .map((response) => response.data);
      setProfiles(responsesData);
    } catch (error) {
      console.log(
        "Error when fetching pending request user profiles: " +
          JSON.stringify(error.response?.data) || error.message
      );
    }
  };

  const getMyFriendRequestProfiles = async () => {
    try {
      const profilePromises = currentResult.map((request) => {
        return axios.get(
          `${backendURL}/api/profiles/${
            request.toUserID === userID ? request.fromUserID : request.toUserID
          }`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      });
      const responses = await Promise.all(profilePromises);
      const responsesData = responses
        .filter((response) => response)
        .map((response) => response.data);
      setProfiles(responsesData);
    } catch (error) {
      console.log(
        "Error when fetching pending request user profiles: " +
          JSON.stringify(error.response?.data) || error.message
      );
    }
  };

  const [profiles, setProfiles] = React.useState([]);
  React.useEffect(() => {
    if (currentResult.length === 0) {
      setProfiles([]);
      return;
    }

    if (currentGroup === "Favorite") {
      getFavoriteProfiles();
    } else if (currentGroup === "Pending Request") {
      getPendingRequestProfiles();
    } else if (currentGroup === "My Friend Request") {
      getMyFriendRequestProfiles();
    } else if (currentGroup === "My Friend") {
      getMyFriendProfiles();
    }
  }, [currentResult, currentGroup]);

  React.useEffect(() => {
    resetPaginationSetting();
    if (currentGroup === "Favorite") {
      getFavorite();
    } else if (currentGroup === "Pending Request") {
      getPendingRequest();
    } else if (currentGroup === "My Friend Request") {
      getMyFriendRequest();
    } else if (currentGroup === "My Friend") {
      getMyFriends();
    } else {
      setCurrentResult([]);
    }
  }, [currentGroup]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const profilesPerPage = 9;
  const totalPages = Math.ceil(profiles.length / profilesPerPage);
  const startIndex = (currentPage - 1) * profilesPerPage;
  const endIndex = startIndex + profilesPerPage;
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const resetPaginationSetting = () => {
    setCurrentPage(1);
  };
  const profileSection = profiles.slice(startIndex, endIndex);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "30px 0px",
      }}
    >
      <ToggleMenu
        size="small"
        value={currentGroup}
        setValue={setCurrentGroup}
        options={groupOptions}
      />
      <Box
        p={3}
        width="100%"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        {profileSection.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 600,
                fontFamily: "Handlee, sans-serif",
                marginBottom: "20px",
              }}
            >
              Nothing found over here...
              <br />
              Maybe you can discover more friends
              <br />
              through our discover page?
            </Typography>
            <img
              src={NoFriendPage}
              width="40%"
              alt="Background when friend page is empty"
            />
          </Box>
        ) : (
          <>
            <Container width="100%">
              <Grid container spacing={3} rowSpacing={5} sx={{ width: "100%" }}>
                {profileSection.map((profile, index) => (
                  <Grid
                    item
                    key={userID + profile._id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    sx={{ width: "100%" }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <UserCard
                        profile={profile}
                        userID={userID}
                        sx={{ flexGrow: 1 }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
            <Pagination
              showFirstButton
              showLastButton
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{ marginTop: "50px", marginBottom: "20px" }}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
