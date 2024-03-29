// var axios = require('axios');
// var data = JSON.stringify({
//     "mode": "FULL",
//     "exchangeTokens": {
//         "NSE": ["3045"]
//     }
// });

// var config = {
//   method: 'post',
//   url: 'https://apiconnect.angelbroking.com/',
//   headers: { 
//     'X-PrivateKey': 'atdnztsF', 
//     'Accept': 'application/json, application/json', 
//     'X-SourceID': 'WEB, WEB', 
//     'X-UserType': 'USER', 
//     'Authorization': 'Bearer 1df46bfe-c236-4846-ac7d-cbcf52129535', 
//     'Content-Type': 'application/json'
//   },
//   data : data
// };

import React, { useState, useEffect } from "react";
import axios from "axios";
import LightweightChart1 from "../../app/components/LightWeightChart1";

const LightWeightChartAPI = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request({
          method: "GET",
          url: "https://yahoo-finance127.p.rapidapi.com/historic/tcs.ns/1d/3d",
          headers: {
            "X-RapidAPI-Key": "2c1d93c14dmshcabf7c3bc305e7fp1ba0b4jsn3b1d3df0e4ed", // Replace with your actual API key
            "X-RapidAPI-Host": "yahoo-finance127.p.rapidapi.com",
          },
        });

        const processedData = processChartData(response.data);
        setChartData(processedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const processChartData = (data) => {
    const timestamps = data.timestamp;
    const indicators = data.indicators.quote[0];

    return timestamps.map((timestamp, index) => ({
      time: timestamp,
      open: indicators.open[index],
      high: indicators.high[index],
      low: indicators.low[index],
      close: indicators.close[index],
      volume: indicators.volume[index],
    }));
  };

  return (
    <div className="chart-container">
      <LightweightChart1 data={chartData} />
    </div>
  );
};

export default LightWeightChartAPI;

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });
