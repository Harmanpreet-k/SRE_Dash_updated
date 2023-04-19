import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar, Pie, Line } from "react-chartjs-2";

const Availibility = () => {
  const [chartData, setChartData] = useState({
    xLabels: [],
    yLabels: [],
  });
  const getName = () => {
    const ApiKey = localStorage.getItem("apiKey");
    const ApiId = localStorage.getItem("apiId");
    fetch(`https://api.applicationinsights.io/v1/apps/${ApiId}/metaData`, {
      headers: {
        "x-api-key": `${ApiKey}`,
      },
    })
      .then((response) => {
        // Convert the response to JSON
        return response.json();
      })
      .then((data) => {
        // Access the "applications" value from the JSON data
        // setTimeout(() => {
        const applications = data.applications;
        // console.log(applications[0].name);
        const appName = applications[0].name;
        console.log(appName);
        localStorage.setItem("appname", appName);
        // }, 1000);
      })
      .catch((error) => {
        // Handle any errors that may occur
        console.error(error);
      });
  };
  getName();

  const fetchChartData = () => {
    const ApiKey = localStorage.getItem("apiKey");
    const ApiId = localStorage.getItem("apiId");
    // console.log(ApiKey);
    // console.log(ApiId);

    fetch(
      `https://api.applicationinsights.io/v1/apps/${ApiId}/metrics/availabilityResults/availabilityPercentage?timespan=P30D&interval=PT10M`,
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
          new_data.yLabels.push(
            d["availabilityResults/availabilityPercentage"].avg
          );
        });
        console.log("final newData:", new_data);
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
        label: "Availibility",
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
        data: chartData.yLabels,
      },
    ],
  };
  return (
    <div style={{ height: "400px", widht: "400px", marginTop: "20px" }}>
      <Line data={data} />
    </div>
  );
};

export default Availibility;
