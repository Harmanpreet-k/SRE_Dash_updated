import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar, Pie, Line } from "react-chartjs-2";
import Spinner from "./loading3.gif";

let new_data = {
  xLabels: [],
  yLabels: [],
};
const ErrorCount = () => {
  const [loader, setLoader] = useState(true);
  const [chartData, setChartData] = useState({
    xLabels: [],
    yLabels: [],
  });
  const fetchChartData = () => {
    const ApiKey = localStorage.getItem("apiKey");
    const ApiId = localStorage.getItem("apiId");
    const Span = localStorage.getItem("Span");
    // console.log(ApiKey);
    // console.log(ApiId);

    fetch(
      `https://api.applicationinsights.io/v1/apps/${ApiId}/metrics/exceptions/count?timespan=${Span}&interval=P1D`,
      {
        headers: {
          "x-api-key": `${ApiKey}`,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        const data = res.value.segments;
        // alert(res);

        // console.log("data received", data);
        data.forEach((d) => {

          if(localStorage.getItem("Start")==null && localStorage.getItem("End")==null  )
          {
            new_data.xLabels.push(new Date(d.end).toDateString());
            new_data.yLabels.push(d["exceptions/count"].sum);
          }
         
          else
          {
            if(d.end>=localStorage.getItem('Start') && d.start<=localStorage.getItem('End'))
            {
            new_data.xLabels.push(new Date(d.end).toDateString());
            new_data.yLabels.push(d["exceptions/count"].sum);
            }
          }
        });
        // console.log("final newData:", new_data);
        setChartData(new_data);
        setLoader(false);
      })
      .catch((err) => console.log("error while fetching the data: ", err));

    // .catch((err)=>console.log('error error',err))
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
  },[]);

  const data = {
    labels: unique(new_data.xLabels),
    datasets: [
      {
        label: "Exception Counts",
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
      {/* <Line data={data} /> */}
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

export default ErrorCount;
