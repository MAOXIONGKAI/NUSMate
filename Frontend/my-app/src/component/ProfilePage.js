import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import StyledButton from "./StyledButton";

export default function ProfilePage(prop) {
  const {
    username,
    email,
    first_major,
    second_major,
    education_status,
    year_of_study,
    nationality,
    gender,
    birthday,
    location,
    interests,
    description
  } = prop.profile;

  const year_th =
    year_of_study === 1
      ? "st"
      : year_of_study === 2
      ? "nd"
      : year_of_study === 3
      ? "rd"
      : "th";

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            fullHeight
          >
            <Avatar
              sx={{ width: 120, height: 120, mb: 2 }}
              //TODO: replace with user's own uploaded avatar
              src=""
              alt="User Avatar"
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" sx={{ marginRight: "5px" }}>
                {username}
              </Typography>
              <Typography component="h5" variant="body2" color="gray">
                {gender === "Male"
                  ? "(he/him)"
                  : gender === "Female"
                  ? "(she/her)"
                  : ""}
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="textSecondary">
              {email}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                margin: "20px",
                fontWeight: "lighter",
                maxWidth: "75%",
                textAlign: "center",
              }}
            >
              {description}
            </Typography>
            <StyledButton variant="contained" text="Edit Profile" />
          </Box>
        </CardContent>
      </Card>

      <Box mt={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, height: "100%", width: "100%" }}>
              <Typography variant="h6" gutterBottom>
                NUS Profile
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        First Major:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {first_major}
                      </TableCell>
                    </TableRow>
                    {second_major && (
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Second Major:
                        </TableCell>
                        <TableCell style={{ fontWeight: "lighter" }}>
                          {second_major}
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Education Status:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {education_status}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Year of Study:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {year_of_study}
                        {year_th} year
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Nationality:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {nationality}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, height: "100%", width: "100%" }}>
              <Typography variant="h6" gutterBottom>
                About Me
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Birthday:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {dayjs(birthday).format("MMM D YYYY")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Location:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        {location}
                      </TableCell>
                    </TableRow>
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
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Personality:
                      </TableCell>
                      <TableCell style={{ fontWeight: "lighter" }}>
                        Nil
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
