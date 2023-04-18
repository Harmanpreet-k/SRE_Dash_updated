import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
const ServerReq = () => {
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
        console.log("data received", data);
        data.forEach((d) => {
          new_data.xLabels.push(new Date(d.start).toDateString());
          new_data.yLabels.push(d["requests/count"].sum);
        });
        console.log("serv req:", new_data);
        setChartData(new_data);
      })
      .catch((err) => console.log("error while fetching the data: ", err));
  };

  useEffect(() => {
    console.log("making fetch request");
    fetchChartData();
  }, []);

  const data = {
    labels: chartData.xLabels,
    datasets: [
      {
        label: "Server requests",
        backgroundColor: [
          "rgba(255, 26, 104, 0.2)",

          "rgba(54, 162, 235, 0.2)",

          "rgba(255, 206, 86, 0.2)",

          "rgba(75, 192, 192, 0.2)",

          "rgba(153, 102, 255, 0.2)",

          "rgba(255, 159, 64, 0.2)",

          "rgba(0, 0, 0, 0.2)",
        ],

        borderColor: [
          "rgba(255, 26, 104, 1)",

          "rgba(54, 162, 235, 1)",

          "rgba(255, 206, 86, 1)",

          "rgba(75, 192, 192, 1)",

          "rgba(153, 102, 255, 1)",

          "rgba(255, 159, 64, 1)",

          "rgba(0, 0, 0, 1)",
        ],
        borderWidth: 1,
        data: chartData.yLabels,
      },
    ],
  };
  return (
    <div style={{ height: "400px", widht: "400px", marginTop: "20px" }}>
      <Bar data={data} />
    </div>
  );
};

export default ServerReq;
