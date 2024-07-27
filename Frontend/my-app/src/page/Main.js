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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ForumIcon from "@mui/icons-material/Forum";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import Diversity3Icon from '@mui/icons-material/Diversity3';

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
  background:
    "linear-gradient(90deg, rgba(83,207,255,1) 0%, rgba(100,85,240,1) 100%)",
  padding: theme.spacing(3),
  color: "#fff",
  textAlign: "center",
}));

function LandingPage(prop) {
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
            { !prop.loggedIn && <StyledButton
              text="Get Started"
              variant="contained"
              component={Link}
              to="/login"
            />}
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
                <AccountCircleIcon sx={{ height: "60px", width: "60px" }} />
                <FeatureText>
                  <ListItemText
                    primary="#1 User Authentication"
                    secondary="Create your very own user profile and start exploring our platform!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <InsertEmoticonIcon sx={{ height: "60px", width: "60px" }} />
                <FeatureText>
                  <ListItemText
                    primary="#2 Personality Test"
                    secondary="Understand your personality trait better through our customized persoanlity test!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <Diversity1Icon sx={{ height: "60px", width: "60px" }} />
                <FeatureText>
                  <ListItemText
                    primary="#3 Find Your Tribe"
                    secondary="Connect with others by sharing your interests, hobbies, courses, and more!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <PersonSearchIcon sx={{ height: "60px", width: "60px" }} />
                <FeatureText>
                  <ListItemText
                    primary="#4 Customized Search"
                    secondary="Search others by hobbies, study years, location, and more to find your perfect match!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <TravelExploreIcon sx={{ height: "60px", width: "60px" }} />
                <FeatureText>
                  <ListItemText
                    primary="#5 Instant Matching"
                    secondary="Hard to find friends of your preference? Let the system do the job for you!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <ForumIcon sx={{ height: "60px", width: "60px" }} />
                <FeatureText>
                  <ListItemText
                    primary="#6 Direct Communication"
                    secondary="DM each other via an integrated chat system to know each other better!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <ConnectWithoutContactIcon
                  sx={{ height: "60px", width: "60px" }}
                />
                <FeatureText>
                  <ListItemText
                    primary="#7 Activity Posting"
                    secondary="Share holiday plans or social activities, and invite other people to join!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <QuickreplyIcon sx={{ height: "60px", width: "60px" }} />
                <FeatureText>
                  <ListItemText
                    primary="#8 Instant Interactions & Notifications"
                    secondary="Responsive user interactions will make sure that you never miss an opportunity to socialize!"
                  />
                </FeatureText>
              </Feature>
            </ListItem>
            <ListItem className="fade-in">
              <Feature>
                <Diversity3Icon sx={{ height: "60px", width: "60px" }} />
                <FeatureText>
                  <ListItemText
                    primary="#9 Efficient Relationship Management"
                    secondary="Manage your friend and activities on the same platform altogether!"
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
            <Typography>
              Hi! We are Xiongkai and Xiao Ao from Team XtraOrdinary
              Kaleidoscope.
              <br />
              <br />
              As freshmen who are struggling to blend into the new environment in
              NUS,
              <br />
              we believe that having efficient channels to connect people within
              <br />
              the new environment is very important, so we created NUSMate!
              <br />
              <br />
              A social platform that provides freshmen and foreign exchange
              students
              <br />
              with extra opportunities to connect with people and make new
              friends!
              <br />
            </Typography>
          </Box>
        </MainContent>
        <MainContent id="contact">
          <Box className="fade-in" sx={{ textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Typography>
              If you have any query about our project, feel free to reach out to
              us!
              <br />
              We value all feedbacks and reviews that are helpful for our
              future improvement!
              <br />
              Please stay tunned for our wonderful new features in the future,
              thank you!
            </Typography>
          </Box>
        </MainContent>
      </main>
      <Footer>
        <Copyright color="white" />
      </Footer>
    </div>
  );
}

export default function Main(prop) {
  return (
    <LandingPage loggedIn={prop.loggedIn} />
  );
}
