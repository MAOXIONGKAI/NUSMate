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
  Button,
} from "@mui/material";
import dayjs from "dayjs";

export default function ProfilePage(prop) {
  //Testing data from database, which contains all the user information
  //To be deleted after backend integration
  const formData = {
    username: "MAO XIONGKAI",
    email: "conan7153@gmail.com",
    password: "123456789",
    birthday: "2001-12-10T16:00:00.000Z",
    confirmPassword: "123456789",
    description: "Hi, I have practiced for 2.5 years, now music!",
    education_status: "Undergraduate",
    first_major: "Computer Science",
    gender: "Male",
    interests: ["Sing", "Jump", "Rap", "Basketball"],
    location: "Bukit Batok",
    nationality: "Chinese",
    second_major: "",
    year_of_study: 1,
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Avatar
              sx={{ width: 120, height: 120, mb: 2 }}
              //TODO: replace with user's own uploaded avatar
              src=""
              alt="User Avatar"
            />
            <Box sx={{ display: "flex", alignItems: "baseline" }}>
              <Typography variant="h4" sx={{ marginRight: "5px" }}>
                {formData.username}
              </Typography>
              <Typography component="h5" variant="body2" color="gray">
                {formData.gender === "Male"
                  ? "(he/him)"
                  : formData.gender === "Female"
                  ? "(she/her)"
                  : ""}
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="textSecondary">
              {formData.email}
            </Typography>
            <Typography variant="body1" sx={{margin: "20px"}}>{formData.description}</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              Edit Profile
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Box mt={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                NUS Profile
              </Typography>
              <Typography variant="body1">NUS profile</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                About Me
              </Typography>
              <Typography variant="body1">
                Birthday: {dayjs(formData.birthday).format("MMM D YYYY")}
                <br />
                Location: {formData.location}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}