import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { Button, CardMedia, Typography } from "@material-ui/core";
import { Avatar, TextField, Link } from "@material-ui/core";
import Modal from "react-modal";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import axios from "axios";
import "./connect.css";
import { useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  fileInput: {
    display: "none",
  },
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(0, 2),
    background: "#002D62",
    color: theme.palette.common.white,
    position: "fixed",
    top: 0,
    width: "100%", // Update width to 100% to cover the entire viewport
    height: "55px",
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    marginRight: theme.spacing(1), // Add some spacing between logo/icon and title
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold", // Add bold font weight to title
  },
  avatar: {
    marginLeft: theme.spacing(1), // Add some spacing between title and avatar
    background: "#1976D2", // Update avatar background color
  },

  button: {
    backgroundColor: "#EE9949",

    color: "#5f3d1d",
    // backgroundColor: "#ffd330",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.1,
    marginTop: theme.spacing(2),
    borderRadius: "5px",
    border: "4",
    height: "10px",
    fontWeight: "bold",
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
    "&:hover": {
      backgroundColor: "#be7a3a",
      color: "white",
    },
  },

  body: {
    overflow: "hidden",
  },
  fileInputElement: {
    marginLeft: theme.spacing(1),
  },
}));

export default function RegisterApp() {
  const avatarStyle = { backgroundColor: "Black" };
  const classes = useStyles();
  const [apiKey, setApiKey] = useState("");
  const [apiID, setApiID] = useState("");
  const [appName, setAppName] = useState("");

  const isSubmitDisabled = !(apiKey && apiID);
  const [email, setEmail] = useState("");
  const location = useLocation();
  const handleApiKeyChange = (event) => {
    const newApiKey = event.target.value;
    setApiKey(newApiKey);
    localStorage.setItem("apiKey", newApiKey);
  };
  const handleApiIdChange = (event) => {
    const newApiId = event.target.value;
    setApiID(newApiId);
    localStorage.setItem("apiId", newApiId);
  };
  const handleAppNameChange = (event) => {
    const newAppname = event.target.value;
    setAppName(newAppname);
    localStorage.setItem("appname", newAppname);
  };
  // getUsersData();
  const handleConnectClick = async (e) => {
    setEmail(location.pathname.split("/")[2].slice(0));

    e.preventDefault();
    console.log(apiKey, apiID, appName);
    if (apiKey.trim() !== "") {
      let result = await fetch("http://localhost:5000/update", {
        method: "post",
        body: JSON.stringify({ apiKey, apiID, email, appName }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "data");
        });

      result = await result;
      // console.log(queryParameters, "query");
      console.log(email, " email");
      console.log("pathname", location.pathname.split("/")[2].slice(0));
      // console.log({ params }, "data data");
      window.location.href = `/connect/${email}`;

      console.log(result);
    }

    localStorage.setItem("display", false);
  };

  return (
    <div className="body">
      <div className={classes.header}>
        <Link href="/connect/:email">
          <ArrowBack style={{ color: "white", marginRight: "10px" }} />
        </Link>
        <Typography align="left" variant="h6" className={classes.title}>
          SRE Dashboard
        </Typography>
        <Avatar className={classes.avatar} style={avatarStyle}>
          {/* Update avatar to display initials */}
          <Typography variant="subtitle1">SD</Typography>
        </Avatar>
      </div>
      <div style={{ width: "100%" }}>
        <h2
          style={{
            marginTop: "15vh",
            marginLeft: "5vw",
            display: "inline-block",
          }}
        >
          Register App{" "}
          {/* <ArrowForwardIcon
            style={{ verticalAlign: "middle", marginBottom: "0.2em" }}
          /> */}
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="data-background-image"></div>
        {/* <div style={{ display: "grid", marginRight: "30vw" }}> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "2rem",
            alignItems: "center",
            alignContent: "center",
            width: "50vw",
            border: "1px solid black",
            borderRadius: "10px",
            boxShadow: "0px 10px 14px -1px rgba(0,0,0,0.2)",
            backgroundColor: "#F4F9FF",
            marginLeft: "100px",
            // marginBottom: "70%",
          }}
        >
          <TextField
            label="Enter APP Name "
            // variant="outlined"
            required
            style={{
              width: "70%",
              marginTop: "20px",
            }}
            value={appName}
            onChange={handleAppNameChange}
          />
          <TextField
            label="Enter API key "
            // variant="outlined"
            required
            style={{
              width: "70%",
              marginTop: "20px",
            }}
            value={apiKey}
            onChange={handleApiKeyChange}
          />
          <TextField
            label="Enter APP ID "
            required
            style={{
              width: "70%",
              marginTop: "20px",
            }}
            value={apiID}
            onChange={handleApiIdChange}
          />

          <Button
            style={{
              padding: "25px",
            }}
            variant="contained"
            // href="/home"
            className={classes.button}
            disabled={isSubmitDisabled}
            onClick={handleConnectClick}
          >
            Register App
          </Button>

          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
