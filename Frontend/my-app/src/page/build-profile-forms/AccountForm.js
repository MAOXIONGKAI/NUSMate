import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AccountForm(prop) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            align="center"
            style={{
              fontFamily: "Handlee, sans-serif",
              fontWeight: "600",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            Come join NUSMate!
            <br />
            Let's build a more friendly NUS Community!"
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={prop.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={prop.error["username"]}
                  id="text"
                  label="Username"
                  autoComplete="username"
                  name="username"
                  value={prop.formData.username}
                  onChange={prop.handleChange}
                  inputProps={{ maxLength: 30 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={prop.error["email"]}
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  name="email"
                  value={prop.formData.email}
                  onChange={prop.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={prop.error["password"]}
                  label="Password"
                  data-testid="Password"
                  type="password"
                  id="password"
                  name="password"
                  value={prop.formData.password}
                  onChange={prop.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={prop.error["confirmPassword"]}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={prop.formData.confirmPassword}
                  onChange={prop.handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
