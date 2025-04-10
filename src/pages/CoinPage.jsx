import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Crypto } from "../context/CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import { LinearProgress, Typography, Box } from "@mui/material";
import HTMLReactParser from "html-react-parser";
import CoinInfo from "../component/Banner/CoinInfo";

function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = useContext(Crypto);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
      } catch (err) {
        console.error("Failed to fetch coin:", err);
      }
    };

    fetchCoin();
  }, [id]);

  if (!coin) {
    return <LinearProgress sx={{ backgroundColor: "gold" }} />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-start" },
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 3,
          borderRight: { md: "2px solid grey" },
          paddingRight: { md: 2 },
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 3,
            pt: 0,
            textAlign: "justify",
          }}
        >
          {HTMLReactParser(coin?.description.en.split(". ")[0] || "")}
        </Typography>

        <Box
          sx={{
            alignSelf: "flex-start",
            padding: 3,
            pt: 1,
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            justifyContent: { md: "space-around" },
            alignItems: { xs: "flex-start", sm: "center", md: "flex-start" },
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
            >
              Rank:
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: "Montserrat", ml: 1 }}>
              {coin?.market_cap_rank}
            </Typography>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
            >
              Current Price:
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: "Montserrat", ml: 1 }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data?.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
            >
              Market Cap:
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: "Montserrat", ml: 1 }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data?.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}{" "}
              M
            </Typography>
          </Box>
        </Box>
      </Box>

      <CoinInfo coin={coin} />
    </Box>
  );
}

export default CoinPage;
