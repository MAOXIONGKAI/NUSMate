import React, { useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import Landingpage_Background from "../image/Landpage_Background.png";
import "../App.css";

import Logo from "../image/Logo.png";
import StyledButton from "../component/StyledButton";
import Copyright from "./Copyright";

const HeroContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0, 6),
  color: "#dimgray",
  textAlign: "center",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${Landingpage_Background})`,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    opacity: 0.3, // Adjust the opacity here
    zIndex: -1, // Ensure the pseudo-element is behind the content
  },
}));

const MainContent = styled(Container)(({ theme }) => ({
  padding: theme.spacing(0, 0, 6, 0),
}));

const Feature = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(3),
  textAlign: "center",
  width: "100%",
}));

const FeatureText = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

const Footer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(90deg, rgba(83,207,255,1) 0%, rgba(100,85,240,1) 100%)",
  padding: theme.spacing(3),
  color: "#fff",
  textAlign: "center",
}));

function LandingPage() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in");
      const windowHeight = window.innerHeight;

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
          element.classList.add("visible");
        } else {
          element.classList.remove("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Ensure hero section is visible on mount with a delay for transition effect
    setTimeout(() => {
      document.getElementById("hero").classList.add("visible");
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <main>
        <HeroContent className="fade-in" id="hero">
          <Container maxWidth="sm">
            <img src={Logo} alt="Main Logo for landing page" width="30%" />
            <Typography
              component="h1"
              variant="h2"
              gutterBottom
              sx={{ fontFamily: "Poetsen One", fontSize: "60px" }}
            >
              Welcome to NUSMate
            </Typography>
            <Typography
              variant="h5"
              paragraph
              sx={{ fontFamily: "Handlee", fontWeight: "600" }}
            >
              Fostering Lifelong Friendships for the New Generations of NUS!
            </Typography>
            <StyledButton
              text="Get Started"
              variant="contained"
              component={Link}
              to="/login"
            />
          </Container>
        </HeroContent>
        <Box className="fade-in" sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ marginTop: "100px", marginBottom: "20px" }}
          >
            Our Features
          </Typography>
        </Box>
        <MainContent>
          <List>
            <ListItem className="fade-in">
              <Feature>
                <FeatureText>
                  <ListItemText
                    primary="#1 User Authentication"
                    secondary="Create your very own user profile, including personal customization!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <FeatureText>
                  <ListItemText
                    primary="#2 Find Your Tribe"
                    secondary="Connect with others through Sharing of Interests, Hobbies, Courses, and More!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <FeatureText>
                  <ListItemText
                    primary="#3 Customized Search"
                    secondary="Search others by hobbies, study years, location, and more to find your perfect match!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <FeatureText>
                  <ListItemText
                    primary="#4 Direct Communication"
                    secondary="DM each other via an integrated chat system that supports text, emojis, and images!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <FeatureText>
                  <ListItemText
                    primary="#5 Activity Posting"
                    secondary="Share plans or activities, including date, time, location, and description!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <FeatureText>
                  <ListItemText
                    primary="#6 Activity Tracking"
                    secondary="Use the calendar to manage your events and commitments!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <FeatureText>
                  <ListItemText
                    primary="#7 Instant Matching"
                    secondary="Create events and let the system do the work, match based on interests and availability!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <FeatureText>
                  <ListItemText
                    primary="#8 Drift Bottle"
                    secondary="Connect with random nearby users, let location data introduce you to new people nearby!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <FeatureText>
                  <ListItemText
                    primary="#9 Birthday Celebration"
                    secondary="Send birthday greetings and messages to anyone celebrating their special day!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            {/* Add more ListItems for additional features */}
          </List>
        </MainContent>
        <MainContent id="about">
          <Box className="fade-in" sx={{ textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              About Us
            </Typography>
            <Typography>Hi! We are Xiongkai and Xiao Ao.<br/>and we are Team XtraOrdinary Kaleidoscope.</Typography>
          </Box>
        </MainContent>
        <MainContent id="contact">
          <Box className="fade-in" sx={{ textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Typography>If you have any query about our project.<br />Feel free to reach out to us!<br />We value all feedback and review about us<br /> that are helpful for our future improvement!</Typography>
          </Box>
        </MainContent>
      </main>
      <Footer>
        <Copyright color="white" />
      </Footer>
    </div>
  );
}

function HomePage(prop) {
  return (
    <div className="tobeCompleted">
      <h1>Welcome!</h1>
      {prop.profile && <h1>{prop.profile.username}</h1>}
      <h2>
        The home page for logged in users is meant <br />
        to be finished in the future milestones
      </h2>
      <p>Please stay tunned to our new wonderful features!</p>
    </div>
  );
}

export default function Main(prop) {
  return (
    <>{prop.loggedIn ? <HomePage profile={prop.profile} /> : <LandingPage />}</>
  );
}
