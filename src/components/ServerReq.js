import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
// import { ResetTv } from "@mui/icons-material";
const new_data = {
  xLabels: [],
  yLabels: [],
};
const ServerReq = () => {
  const [loader, setLoader] = useState(true);
  const [chartData, setChartData] = useState({
    xLabels: [],
    yLabels: [],
  });

  const fetchChartData = () => {
    const ApiKey = localStorage.getItem("apiKey");
    const ApiId = localStorage.getItem("apiId");
    fetch(
      `https://api.applicationinsights.io/v1/apps/${ApiId}/metrics/requests/count?timespan=P30D&interval=P1D`,
      {
        headers: {
          "x-api-key": `${ApiKey}`,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        const data = res.value.segments;
        var unique = data
          .map((ar) => JSON.stringify(ar))
          .filter((itm, idx, arr) => arr.indexOf(itm) === idx)
          .map((str) => JSON.parse(str));
        const datas = unique;
        // console.log("datasssssssssssssss", datas);
        // console.log("data received", data);
        datas.forEach((d) => {
          new_data.xLabels.push(new Date(d.start).toDateString());
          new_data.yLabels.push(d["requests/count"].sum);
        });
        // console.log("serv req------:", new_data);
        // console.log(
        //   "new_data xvariable......................",
        //   new_data.xLabels
        // );
        // console.log("new_data yvariable", new_data.yLabels);
        // console.log("new_data.xLabels.length === 0", new_data.xLabels.length);
        //setChartData(new_data);
        setLoader(false);
      })
      .catch((err) => console.log("error while fetching the data: ", err));
  };

  const reset = () => {
    new_data.xLabels = [];
    new_data.yLabels = [];
  };
  const unique = (paramters) => {
    var unique1 = paramters
      .map((ar) => JSON.stringify(ar))
      .filter((itm, idx, arr) => arr.indexOf(itm) === idx)
      .map((str) => JSON.parse(str));
    const datas = unique1;
    return datas;
  };

  useEffect(() => {
    // console.log("making fetch request");
    reset();
    // console.log("first sergchtuycyjfyhjfjyh23456789098323o", new_data);
    fetchChartData();
    // console.log("second erghmjgefrgth34567u6543", new_data);
  });

  const data = {
    //   var unique = new_data.map(ar=>JSON.stringify(ar))
    // .filter((itm, idx, arr) => arr.indexOf(itm) === idx)
    // .map(str=>JSON.parse(str));
    //      const datas=unique;

    labels: unique(new_data.xLabels),

    datasets: [
      {
        label: "Server requests",
        backgroundColor: [
          "#fff2bf",

          "#f7a400",
          "#3a9efd",
          "#3e4491",
          "#292a73",
          "#1a1b4b",
        ],
        borderColor: [
          "#ad8a00",
          "#fff2bf",

          "#f7a400",
          "#3a9efd",
          "#3e4491",
          "#292a73",
          "#1a1b4b",
        ],
        borderWidth: 1,
        hoverOffset: 4,
        data: new_data.yLabels,
      },
    ],
  };
  const options = {
    responsive: true,
    animation: {
      animateRotate: true, // Enable rotation animation for pie and doughnut charts
      animateScale: true, // Enable scaling animation for all chart types
      easing: "easeInCubic", // Easing function for the animation
      duration: 2000, // Animation easing function
    },
  };
  return (
    // console.log("new data ...........(((((", data),
    <div style={{ height: "400px", widht: "400px", marginTop: "20px" }}>
      {/* < /> */}
      {loader ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60%",
          }}
        >
          <p>loading chart...</p>
        </div>
      ) : new_data.xLabels.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60%",
          }}
        >
          <p>No data available</p>
        </div>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default ServerReq;
