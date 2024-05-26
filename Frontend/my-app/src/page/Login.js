import React from "react";
import "../index.css";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Person from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/MAOXIONGKAI/NUSMate">
        Team XtraOrdinary Kaleidoscope
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  let savedFormData;
  try {
    savedFormData = JSON.parse(window.localStorage.getItem("loginFormData"));
  } catch (error) {
    console.log(error);
    savedFormData = null;
  }

  const [formData, setFormData] = React.useState(
    savedFormData !== null
      ? savedFormData
      : {
          email: "",
          password: "",
          remember: false,
        }
  );

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.remember) {
      window.localStorage.setItem("loginFormData", {
        email: "",
        password: "",
        remember: false,
      });
    }
    console.log(formData);
    //Submit the form data from here when backend is ready...
  };

  React.useEffect(() => {
    window.localStorage.setItem("loginFormData", JSON.stringify(formData));
  }, [formData]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            style={{
              fontFamily: "Handlee, sans-serif",
              fontWeight: "800",
              marginTop: "5",
              marginBottom: "0px",
            }}
          >
            Discover Your Best Friend in NUS!
          </Typography>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "black", width: "100px", height: "100px" }}
            >
              <Person sx={{ width: "50%", height: "50%" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
