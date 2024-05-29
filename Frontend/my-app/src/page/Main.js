import React, { useEffect } from "react";
import { Typography, Container, Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import Landingpage_Background from "../image/Landpage_Background.png";
import "../App.css";

import Logo from "../image/Logo.png";
import Logo2 from "../image/Logo2.png";
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
  padding: theme.spacing(8, 0, 6),
}));

const Feature = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: "lightgray",
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
            <img src={Logo2} alt="Main Logo for landing page" width="30%" />
            <Typography component="h1" variant="h2" gutterBottom sx={{fontFamily:"Poetsen One", fontSize: "60px"}}>
              Welcome to NUSMate
            </Typography>
            <Typography variant="h5" paragraph sx={{fontFamily:"Handlee", fontWeight:"600"}}>
            Connecting NUS students with lifelong friendships through our vibrant social platform
            </Typography>
            <StyledButton text="Get Started" variant="contained" component={ Link } to="/login"/>
          </Container>
        </HeroContent>
        <MainContent>
          <Grid container spacing={4} id="features">
            <Grid item xs={12} sm={6} md={4}>
              <Feature className="fade-in">
                <Typography variant="h5">Feature 1</Typography>
                <Typography>Detail about feature 1.</Typography>
              </Feature>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Feature className="fade-in">
                <Typography variant="h5">Feature 2</Typography>
                <Typography>Detail about feature 2.</Typography>
              </Feature>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Feature className="fade-in">
                <Typography variant="h5">Feature 3</Typography>
                <Typography>Detail about feature 3.</Typography>
              </Feature>
            </Grid>
          </Grid>
        </MainContent>
        <MainContent id="about">
          <Box className="fade-in">
            <Typography variant="h4" gutterBottom>
              About Us
            </Typography>
            <Typography>Information about the company or project.</Typography>
          </Box>
        </MainContent>
        <MainContent id="contact">
          <Box className="fade-in">
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Typography>Email: example@example.com</Typography>
          </Box>
        </MainContent>
      </main>
      <Footer>
        <Copyright />
      </Footer>
    </div>
  );
}

export default function Main() {
  return (
    <>
      <LandingPage />
    </>
  );
}
