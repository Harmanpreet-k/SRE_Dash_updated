import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar, Pie, Line } from "react-chartjs-2";
import Spinner from "./loading3.gif";
let new_data = {
  xLabels: [],
  yLabels: [],
};
const Availibility = () => {
  const [loader, setLoader] = useState(true);
  const [email, setEmail] = useState("");
  const [api, setApi] = useState("");
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

      const apiResponse = await fetch("http://localhost:5000/api", {
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
      });

      const apiData = await apiResponse.json();
      const apiArray = apiData.msg;
      console.log(apiArray, "dttttt");
      // array.push(apiArray)
      apiArray.map((e) => array.push(e));
      console.log(array[0][0].apiid, "arr1");

      const apiKey = localStorage.getItem("apiKey");
      const apiId = localStorage.getItem("apiId");

      // const apiId = array[0][0].apiid;
      // console.log(apiId, "arr2");

      const metaDataResponse = await fetch(
        `https://api.applicationinsights.io/v1/apps/${apiId}/metaData`,
        {
          headers: {
            "x-api-key": `${apiKey}`,
          },
        }
      );

      const metaData = await metaDataResponse.json();
      const applications = metaData.applications;
      const appName = applications[0].name;
      console.log(appName);
      localStorage.setItem("appname", appName);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChartData = async () => {
    try {
      const apiKey = localStorage.getItem("apiKey");
      const apiId = localStorage.getItem("apiId");

      const response = await fetch(
        `https://api.applicationinsights.io/v1/apps/${apiId}/metrics/availabilityResults/availabilityPercentage?timespan=P30D&interval=P1D`,
        {
          headers: {
            "x-api-key": `${apiKey}`,
          },
        }
      );

      const res = await response.json();
      const data = res.value.segments;

      const new_data = {
        xLabels: [],
        yLabels: [],
      };

      data.forEach((d) => {
        new_data.xLabels.push(new Date(d.start).toDateString());
        new_data.yLabels.push(
          d["availabilityResults/availabilityPercentage"].avg
        );
      });

      setChartData(new_data);
      setLoader(false);
    } catch (err) {
      console.log("error while fetching the data: ", err);
    }
  };

  useEffect(() => {
    getName();
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
           <img src={Spinner} alt="Spinner" />
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
