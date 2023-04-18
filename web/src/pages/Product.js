import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import ImgMediaCard from "../components/Card";
import { v4 as uuidv4 } from "uuid";

const Product = () => {
  const [watch, setWatch] = useState([]);
  const getWatches = async () => {
    try {
      const options = {
        method: "GET",
        // url: "https://fakestoreapi.com/products",
        // url: "https://api.storerestapi.com/categories",
        url: "https://flipkart.dvishal485.workers.dev/search/wristwatch",
      };

      axios
        .request(options)
        .then(function (response) {
          // console.log(response.data);
          setWatch(response.data.result.slice(0, 10));
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {}
  };

  // console.log(watch);

  useEffect(() => {
    getWatches();
  }, []);
  return (
    <section>
      <Container>
        <Grid container gap={4}>
          {watch.map((item, index) => {
            return <ImgMediaCard props={item} index={index % 5} id={uuidv4()} />;
          })}
        </Grid>
      </Container>
    </section>
  );
};

export default Product;
