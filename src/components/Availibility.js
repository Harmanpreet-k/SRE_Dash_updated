import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar, Pie, Line } from "react-chartjs-2";
let new_data = {
  xLabels: [],
  yLabels: [],
};
const Availibility = () => {
  const [loader, setLoader] = useState(true);
  const [email, setEmail] = useState("");
  const [chartData, setChartData] = useState({
    xLabels: [],
    yLabels: [],
  });
  const getName = async () => {
    let array = [];

    try {
      const response = await fetch("http://localhost:5000/loggeduser", {
        method: "GET",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      const data = await response.json();
      const e = data.msg;
      setEmail(e);
    } catch (error) {
      console.error(error);
    }

    fetch("http://localhost:5000/api", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(email, "mail mail");
        console.log(data, "daaaaaaaataaa");
        // array = [];
        array.push(data.msg[0]);
        // console.log(array, "arr");
      });

    const ApiKey = localStorage.getItem("apiKey");

    console.log(array, "arr");

    const ApiId = localStorage.getItem("apiId");
    fetch(`https://api.applicationinsights.io/v1/apps/${ApiId}/metaData`, {
      headers: {
        "x-api-key": `${ApiKey}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const applications = data.applications;

        const appName = applications[0].name;
        console.log(appName);
        localStorage.setItem("appname", appName);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  getName();

  const fetchChartData = () => {
    const ApiKey = localStorage.getItem("apiKey");
    const ApiId = localStorage.getItem("apiId");

    fetch(
      `https://api.applicationinsights.io/v1/apps/${ApiId}/metrics/availabilityResults/availabilityPercentage?timespan=P30D&interval=P1D`,
      {
        headers: {
          "x-api-key": `${ApiKey}`,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        const data = res.value.segments;

        // console.log("data received", data);
        data.forEach((d) => {
          new_data.xLabels.push(new Date(d.start).toDateString());
          new_data.yLabels.push(
            d["availabilityResults/availabilityPercentage"].avg
          );
        });
        // console.log("final newData:", new_data);
        setChartData(new_data);
        setLoader(false);
      })
      .catch((err) => console.log("error while fetching the data: ", err));
  };

  useEffect(() => {
    // console.log("making fetch request");
    fetchChartData();
  }, []);
  const unique = (paramters) => {
    var unique1 = paramters
      .map((ar) => JSON.stringify(ar))
      .filter((itm, idx, arr) => arr.indexOf(itm) === idx)
      .map((str) => JSON.parse(str));
    const datas = unique1;
    return datas;
  };

  const data = {
    labels: unique(new_data.xLabels),
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
        data: new_data.yLabels,
      },
    ],
  };
  return (
    <div style={{ height: "400px", widht: "400px", marginTop: "20px" }}>
      {/* {console.log("data==-=-=-=", data)} */}
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
        <Line data={data} />
      )}
    </div>
  );
};

export default Availibility;
