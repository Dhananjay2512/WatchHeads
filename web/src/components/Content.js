import React from "react";
import { Container, Grid, ImageList, ImageListItem } from "@mui/material";
import { Box } from "@mui/system";

const Content = () => {
  return (
    <section>
      <Container
        sx={{
          margin: "4rem auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          {[1, 2, 3, 4].map((item) => (
            <Box
              sx={{
                borderRadius: "1rem",
                overflow: "hidden",
              }}
              key={item.img}
            >
              <Box
                sx={{
                  width: "200px",
                  height: "250px",

                  "& > img": {
                    width: "100%",
                    height: "100%",
                    display: "block",
                  },
                }}
              >
                <img src={`./watch${item}.jpeg`} alt={item.title} loading="lazy" />
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            justifyContent: "space-between",
            margin: "5rem 0rem ",
          }}
        >
          {[1, 2].map((item) => (
            <Box
              sx={{
                borderRadius: "1rem",
                overflow: "hidden",
              }}
              key={item.img}
            >
              <Box
                sx={{
                  width: "400px",
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

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            justifyContent: "space-between",
            margin: "7rem 0rem 5rem",
          }}
        >
          {[3, 4, 5].map((item) => (
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

export default Content;
