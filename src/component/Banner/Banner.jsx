import React from "react";
import { Container, Typography, Box } from "@mui/material";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url(./Banner.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          paddingTop: 3,
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            paddingTop: 3,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            CryptoPulse
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgray",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info Regarding Your Favorite Crypto Currency
          </Typography>
        </Box>
        <Carousel />
      </Container>
    </Box>
  );
};

export default Banner;
