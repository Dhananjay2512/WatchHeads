import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const Contact = () => {
  return (
    <section>
      <Container
        sx={{
          color: "rgba(229, 229, 229, 0.5)",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            margin: "2rem 0 2.5rem",
          }}
        >
          It is a home grown website that provide genuine products at a reasonable rate.
          Moreover our products has passed 3 layer verification and then delivered to you.
          <br />
          We provide free shipping in India. Also we deliver our products overseas and charge
          according to your region.
        </Typography>

        <Typography
          sx={{
            fontSize: "1.5rem",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "white",
              margin: "0 0 1rem",
            }}
          >
            Corporate Address :
          </Typography>
          WatchHeads Pvt. Ltd.
          <br />
          3rd Floor, B114-116, Industrial Phase 2 Next to Tribune Chowk,
          <br />
          Chandigarh, 160030
        </Typography>

        <Typography
          sx={{
            color: "rgba(174, 148, 106, 1)",
            fontSize: "2rem",
            textDecoration: "capitalize",
            margin: "5rem 0 2rem",
          }}
        >
          PARTNER WITH
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            justifyContent: "space-between",
            margin: "1rem 0rem 5rem",
          }}
        >
          {[1, 2, 4].map((item) => (
            <Box
              sx={{
                borderRadius: "1rem",
                overflow: "hidden",
              }}
              key={item.img}
            >
              <Box
                sx={{
                  width: "300px",
                  //   height: "250px",

                  "& > img": {
                    width: "100%",
                    height: "100%",
                    display: "block",
                  },
                }}
              >
                <img src={`./content${item}.jpeg`} alt={item.title} loading="lazy" />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </section>
  );
};

export default Contact;
