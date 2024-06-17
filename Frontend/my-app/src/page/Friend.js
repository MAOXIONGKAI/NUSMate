import { Typography, Box } from "@mui/material";
import React from "react";
import axios from "axios";
import ToggleMenu from "../component/ToggleMenu";
import {Container, Grid, Pagination} from "@mui/material";
import UserCard from "../component/UserCard";

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

  const getFavorite = async () => {
    try {
        const response = await axios.get(`${backendURL}/api/favorites/${userID}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        setCurrentResult(response.data);
    } catch (error) {
        console.log("Error when fetching favorite user collection from database: " + error);
    }
  } 

  React.useEffect(() => {
    getFavorite();
  }, [currentGroup]); 

  const totalPages = 1;
  const currentPage = 1;
  const handlePageChange = () => {
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "30px 0px"
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
              marginTop: "30px"
            }}
          >
            <Container width="100%">
              <Grid container spacing={3} rowSpacing={5} sx={{ width: "100%" }}>
                {currentResult.map((profile, index) => (
                  <Grid
                    item
                    key={index}
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
                      <UserCard profile={profile} userID={userID} sx={{ flexGrow: 1 }} />
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
          </Box>
    </Box>
  );
}
