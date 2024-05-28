import React from "react";
import "../index.css";
import Copyright from "./Copyright";

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
import RandomImage from "../data/RandomImage";

// TODO remove, this demo shouldn't need to reset the theme.
// ^Note that this code is from template, the comment is not written by me.
// Do not touch this code, this is for future reference

const defaultTheme = createTheme();

export default function Login() {
  //Read saved form data from local storage
  //If there's valid data set the default value as the saved data
  //If there's no data/invalid data, set the default value as null
  let savedFormData;
  try {
    savedFormData = JSON.parse(window.localStorage.getItem("loginFormData"));
  } catch (error) {
    console.log(error);
    savedFormData = null;
  }

  //Form data state
  //If there's any valid saved form data, initialize as the saved data
  //Else, initialize it as object with default value for each field
  const [formData, setFormData] = React.useState(
    savedFormData !== null
      ? savedFormData
      : {
          email: "",
          password: "",
          remember: false,
        }
  );

  //Handle change event every time the form element is changed
  const handleChange = (event) => {
    //Get relevant information from the element that triggered the event
    const { name, type, value, checked } = event.target;

    //Update the formData field based on element that triggered the event
    //with user's input value
    setFormData((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  //Handle submit event when user submit the form
  const handleSubmit = (event) => {
    //Prevent the page from refresh when user click submit
    event.preventDefault();

    //If remember me option not checked, erase local stored form data when submit
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

  //Update local stored form data when formData state is changed
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
            backgroundImage: `url(${RandomImage()})`,
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
              marginTop: "5%",
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
                  <Link href="/sign-up" variant="body2">
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
