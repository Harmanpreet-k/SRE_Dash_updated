import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
const ServerReq = () => {
  const [loader, setLoader] = useState(true);

  const [datas, setDatas] = useState();
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
        const new_data = {
          xLabels: [],
          yLabels: [],
        };
        // console.log("data received", data);
        data.forEach((d) => {
          new_data.xLabels.push(new Date(d.start).toDateString());
          new_data.yLabels.push(d["requests/count"].sum);
        });
        console.log("final newData:", new_data);
        setChartData(new_data);
        // console.log("final newData:", new_data);

        //         setChartData(new_data);

        setDatas(chartData.yLabels);

        setLoader(false);
      })
      .catch((err) => console.log("error while fetching the data: ", err));
  };

  useEffect(() => {
    // console.log("making fetch request");
    fetchChartData();
  }, []);

  const data = {
    labels: chartData.xLabels,
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
        data: datas,
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
      ) : datas.length < 1 ? (
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
