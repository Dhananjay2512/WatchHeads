import { Container, CssBaseline, Divider, Grid } from "@mui/material";
import { ContentContainer, HeroContainer, ImgContainer, NavFix } from "../styles/hero";
import React from "react";
import Content from "../components/Content";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <HeroContainer>
        <Grid
          container
          sx={{
            backgroundColor: "#0B0B0B",
          }}
        >
          <Grid
            item
            lg={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ContentContainer>
              <h3>WatchHeads</h3>
              <h6>Time is a luxury</h6>
              <p>A Classic Collection of Luxurious Watches for the Real Gentlemen.</p>

              <button>
                <Link to="/Product">Order Now</Link>
              </button>
            </ContentContainer>
          </Grid>
          <Grid
            item
            lg={6}
            sx={{
              marginTop: "2rem",
            }}
          >
            <ImgContainer>
              <img src="./hero.jpeg" alt="" />
            </ImgContainer>
          </Grid>
        </Grid>
      </HeroContainer>
      {/* <Content /> */}
    </>
  );
};

export default Hero;
