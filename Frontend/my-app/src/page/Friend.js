import { Typography, Box } from "@mui/material";
import React from "react";
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
                {[prop.profile].map((profile, index) => (
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
                      <UserCard profile={profile} sx={{ flexGrow: 1 }} />
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
