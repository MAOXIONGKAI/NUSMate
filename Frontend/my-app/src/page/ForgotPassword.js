import React from "react";
import Copyright from "./Copyright";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
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
            Enter your email or username below, and we will help you reset your
            password.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, marginTop: "25px" }}
          >
            <TextField
              required
              fullWidth
              name="account-info"
              label="account-info"
              type="text"
              id="account-info"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Find Account
            </Button>
            <Box textAlign="center">
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
