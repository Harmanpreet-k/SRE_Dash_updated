import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
let new_data = {
  xLabels: [],
  yLabels: [],
};
const FailedReq = () => {
  const [loader, setLoader] = useState(true);
  const [chartData, setChartData] = useState({
    xLabels: [],
    yLabels: [],
  });
  const fetchChartData = () => {
    const ApiKey = localStorage.getItem("apiKey");
    const ApiId = localStorage.getItem("apiId");
    fetch(
      `https://api.applicationinsights.io/v1/apps/${ApiId}/metrics/requests/failed?timespan=P30D&interval=P1D`,
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
          new_data.yLabels.push(d["requests/failed"].sum);
        });
        // console.log("final newData of failure:", new_data);
        setChartData(new_data);
        setLoader(false);
      })
      .catch((err) => console.log("error while fetching the data: ", err));
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
    fetchChartData();
  }, []);

  const data = {
    labels: unique(new_data.xLabels),
    datasets: [
      {
        label: "Failed requests",
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
      ) : new_data.yLabels.length === 0 ? (
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
        <Bar data={data} />
      )}
    </div>
  );
};

export default FailedReq;
