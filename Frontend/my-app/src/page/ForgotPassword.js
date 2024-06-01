import React from "react";
import axios from "axios";
import Copyright from "./Copyright";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StyledButton from "../component/StyledButton";
import { Alert } from "@mui/material";
import CustomizedSnackbar from "../component/CustomizedSnackbar";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [profileNotFound, setProfileNotFound] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFail, setOpenFail] = React.useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
  };

  const updateDatabase = async (email, password) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/profiles/email/${email}`,
        {
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(
        "Password Successfully Updated" + JSON.stringify(response.data)
      );
      setOpenSuccess(true);
      setProfileNotFound(false);
      setFormData({ email: "", password: "" });
      return response.data;
    } catch (error) {
      setOpenFail(true);
      if (error && error.response.status === 404) {
        setProfileNotFound(true);
        console.log("Profile Not Found: Email not associated with any profile");
      }
      console.log("Reset Password Failed due to server error");
    }
  };

  const resetPassword = (event) => {
    const email = formData.email.trim();
    const newPassword = formData.password.trim();
    if (email === "" || newPassword === "") return;

    event.preventDefault();
    updateDatabase(email, newPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "black",
              width: "100px",
              height: "100px",
              margin: "25px",
            }}
          >
            <LockOutlinedIcon style={{ width: "50%", height: "50%" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Having Trouble Logging in?
          </Typography>
          <Typography
            component="body2"
            variant="span"
            style={{
              color: "gray",
              fontSize: "16px",
              textAlign: "center",
              fontWeight: "300",
            }}
          >
            Enter your registered email and new password below to reset password
          </Typography>
          <Box
            sx={{ width: "100%", mt: 3, marginTop: "25px" }}
            display="flex"
            flexDirection="column"
            gap="20px"
          >
            <TextField
              required
              fullWidth
              name="email"
              label="Email"
              type="text"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            {profileNotFound && (
              <Alert severity="error">
                No Profile Found: Email not associated with any profile
              </Alert>
            )}
            <StyledButton
              fullWidth
              text="Reset"
              onClick={resetPassword}
              style={{
                color: "white",
                marginLeft: "auto",
                marginRight: "100px",
                fontSize: "16px",
              }}
            />
            <Box textAlign="center">
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <CustomizedSnackbar
        text="Successfully Reset Password"
        open={openSuccess}
        setOpen={setOpenSuccess}
      />
      <CustomizedSnackbar
        severity="error"
        text="Password Reset Failed"
        open={openFail}
        setOpen={setOpenFail}
      />
    </ThemeProvider>
  );
}
