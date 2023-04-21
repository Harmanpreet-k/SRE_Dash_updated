import React, { useEffect, useState } from "react";
// import Paper from "@mui/material/Paper";
import { Paper } from "@material-ui/core";

// import {
// Chart,
// PieSeries,
// Title,
// } from "@devexpress/dx-react-chart-material-ui/dist/dx-react-chart-material-ui";
// import { Animation } from "chart.js/dist";
// import { Chart } from "@devexpress/dx-react-chart/dist/dx-react-chart.es";
// import { Chart } from "@devexpress/dx-react-chart-material-ui/dist/dx-react-chart-material-ui";
// import { PieSeries } from "@devexpress/dx-react-chart-material-ui/dist/dx-react-chart-material-ui";
// import { Title } from "@devexpress/dx-react-chart-material-ui/dist/dx-react-chart-material-ui";
// import { Animation } from "@devexpress/dx-react-chart/dist/dx-react-chart.es";
// import { Animation } from "@devexpress/dx-react-chart";
// import { Animation } from "@devexpress/dx-react-chart/dist/dx-react-chart.es.js";
// import { Animation } from "chart.js";
function ReliabilityScore() {
  // window.location.reload();
  const [chartData, setChartData] = useState(data);
  const ApiKey = localStorage.getItem("apiKey");
  const ApiId = localStorage.getItem("apiId");
  let server;
  let failed;
  let avail;
  let response;
  let sucess;

  const req = () => {
    fetch(
      `https://api.applicationinsights.io/v1/apps/${ApiId}/metrics/requests/count?timespan=P1D&interval=PT24H`,
      {
        headers: {
          "x-api-key": `${ApiKey}`,
        },
      }
    )
      .then((response) => {
        // Convert the response to JSON
        return response.json();
      })

      .then((data) => {
        // Access the "applications" value from the JSON data
        // const applications = data.applications;
        // console.log(applications[0].name);
        // const appName = applications[0].name;
        // console.log(data);
        server = data.value.segments[0]["requests/count"].sum;
        // server = 100;

        console.log(server, "server");

        // localStorage.setItem("appname", appName);
      })
      .catch((error) => {
        // Handle any errors that may occur
        console.error(error);
      });
  };

  fetch(
    `https://api.applicationinsights.io/v1/apps/${ApiId}/metrics/requests/failed?timespan=P30D&interval=P1D`,
    {
      headers: {
        "x-api-key": `${ApiKey}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      failed = data.value.segments[0]["requests/failed"].sum;

      console.log(failed, "failed");
    })
    .catch((error) => {
      console.error(error);
    });
  fetch(
    `https://api.applicationinsights.io/v1/apps/${ApiId}/metrics/availabilityResults/availabilityPercentage?timespan=P30D&interval=PT10M`,
    {
      headers: {
        "x-api-key": `${ApiKey}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      // avail = 100;
      console.log(data, "data");
      // console.log(avail, "avail");
      console.log(typeof avail);
    })
    .catch((error) => {
      console.error(error);
    });
  fetch(
    `https://api.applicationinsights.io/v1/apps/${ApiId}/metrics/requests/duration?timespan=P1D&interval=PT24H`,
    {
      headers: {
        "x-api-key": `${ApiKey}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      //   console.log(data);
      response = data.value.segments[0]["requests/duration"].avg;
      //   response = 4000;

      console.log(response, "response");
    })
    .catch((error) => {
      console.error(error);
    });
  req();
  setTimeout(() => {
    sucess = ((server - failed) / server) * 100;
    // sucess = 50;

    console.log(sucess, "sucess");
  }, 2000);

  //   var i = 0;
  const ReliabilityScore = () => {
    // Your logic here
    let result = ""; // Store the result as a string

    setTimeout(() => {
      if (!sucess || !response || !avail) {
        result = "Data not avail";
      } else {
        if (sucess >= 99 && response <= 2000 && avail >= 99) {
          result = "Good";
        } else if (
          (sucess >= 99 && response <= 2000) ||
          (avail >= 99 && response <= 2000) ||
          (avail >= 99 && sucess >= 99)
        ) {
          result = "Average";
        } else if (sucess >= 99 || response <= 2000 || avail >= 99) {
          result = "Bad";
        } else {
          result = "Poor";
        }
      }

      // Store the result in localStorage
      localStorage.setItem("score", result);
    }, 5000);
  };
  const data = [
    { title: "server", per: 70 },
    { title: "availibility", per: 90 },
    { title: "succes", per: 90 },
    { title: "response", per: 14 },
  ];
  // Call the function to start the timer
  ReliabilityScore();

  // Retrieve the stored result from localStorage
  const result = localStorage.getItem("score");
  console.log(result, "res");

  return (
    <Paper>
      {/* <Chart data={chartData}> */}
      {/* <PieSeries valueField="val" argumentField="region" innerRadius={0.6} /> */}
      {/* <Title text="The Population of Continents and Regions" /> */}
      {/* <Animation /> */}
      {/* </Chart> */}
    </Paper>
  );
}

export default ReliabilityScore;
