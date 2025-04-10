import React, { useContext, useEffect, useState } from "react";
import { Crypto } from "../../context/CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../../config/api";
import {
  CircularProgress,
  ThemeProvider,
  createTheme,
  Box,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import { chartDays } from "../../config/data";
import Button from "../Button";

function CoinInfo({ coin }) {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = useContext(Crypto);
  const [flag, setFlag] = useState(false);

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setFlag(true);
      setHistoricData(data.prices);
    } catch (error) {
      console.error("Failed to fetch historical data:", error);
    }
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 3,
          padding: 5,
          "@media (max-width: 960px)": {
            width: "100%",
            marginTop: 0,
            padding: 2,
            paddingTop: 0,
          },
        }}
      >
        {!historicData || !flag ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coinData) => {
                  const date = new Date(coinData[0]);
                  const time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: "#EEDC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                marginTop: 3,
                justifyContent: "space-between",
                width: "100%",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {chartDays.map((day) => (
                <Button
                  key={day.value}
                  onclick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </Button>
              ))}
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default CoinInfo;
