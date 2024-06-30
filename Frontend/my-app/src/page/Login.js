import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Copyright from "./Copyright";

import Avatar from "@mui/material/Avatar";
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
import StyledButton from "../component/StyledButton";
import Alert from "@mui/material/Alert";
import CircularIndeterminate from "../component/CircularIndeterminate";

// TODO remove, this demo shouldn't need to reset the theme.
// ^Note that this code is from template, the comment is not written by me.
// Do not touch this code, this is for future reference

const defaultTheme = createTheme();

export default function Login(prop) {
  const navigate = useNavigate();

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
  //If there's any valid saved form data from localStorage, initialize as the saved data
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

  const [invalidInfo, setInvalidInfo] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Fetch database profile data through axios
  // Takes the login info filled by user and send http request to Backend API
  const getData = async () => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    // Fetching profile data from database based on user's input
    try {
      const response = await axios.get(
        `${backendURL}/api/profiles/email/${formData.email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // If response is valid, check if the password match
      if (response.data.password !== formData.password) {
        setInvalidInfo(true);
        return;
      }

      return response.data;
    } catch (error) {
      //Handling any issue related to the server
      if (error.response && error.response.status === 404) {
        setInvalidInfo(true);
      } else {
        setServerError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.email === "" || formData.password === "") return;
    //Prevent the page from refresh when user click submit

    // Start the loading animation
    setIsLoading(true);

    //If remember me option not checked, erase local stored form data when submit
    if (!formData.remember) {
      window.localStorage.removeItem("loginFormData");
    }

    const profileData = await getData();
    console.log("Data received:" + JSON.stringify(profileData));
    if (profileData) {
      prop.setProfile(profileData);
      prop.setLoggedIn(true);
      navigate("/profile");
    }
    //Submit the form data from here when backend is ready...
  };

  //Update local stored form data when formData state is changed
  React.useEffect(() => {
    window.localStorage.setItem("loginFormData", JSON.stringify(formData));
  }, [formData]);

  // Random Wallpaper Resources
  const [randomURL, authorName, attribution] = RandomImage();
  console.log(randomURL);
  const unsplashURL =
    "https://unsplash.com/?utm_source=NUSMate&utm_medium=referral";

  return (
    <ThemeProvider theme={defaultTheme}>
      { isLoading && <CircularIndeterminate />}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          data-testid="RandomWallpaper"
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${randomURL})`, //Line disable to prevent too frequent request to unsplash API
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography variant="body2" sx={{ marginTop: "auto", backgroundColor: "rgba(100, 100, 100, 0.7)", color: "white", width:"100%", textAlign: "center"}}>
            Photo by&nbsp;
            <Link href={attribution} variant="body2" sx={{color: "#ADD8E6"}}>
              {authorName}
            </Link>
            &nbsp;on&nbsp;
            <Link href={unsplashURL} variant="body2" sx={{color: "#ADD8E6"}}>
              Unsplash
            </Link>
          </Typography>
        </Grid>
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
              {invalidInfo && (
                <Alert severity="error" sx={{ marginTop: "20px" }}>
                  Invalid Email or Password
                </Alert>
              )}
              {serverError && (
                <Alert severity="error" sx={{ marginTop: "20px" }}>
                  Unknown Server Error, Please Try Again
                </Alert>
              )}
              <StyledButton
                fullWidth
                text="Sign"
                type="submit"
                variant="contained"
              />
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
