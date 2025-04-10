import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { TrendingCoins } from "../../config/api";
import { Crypto } from "../../context/CryptoContext";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

function Carousel() {
  const [trendingData, setTrendingData] = useState([]);
  const { currency, symbol } = useContext(Crypto);

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrendingData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line
  }, [currency]);

  const numberWithCommas = (x) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const items = trendingData.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link
        to={`/coins/${coin.id}`}
        key={coin.id}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
          textDecoration: "none",
        }}
      >
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin.symbol}&nbsp;
          <span style={{ color: profit ? "rgb(14,203,129)" : "red" }}>
            {profit && "+"}
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return (
    <Box
      sx={{
        height: "50%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </Box>
  );
}

export default Carousel;
