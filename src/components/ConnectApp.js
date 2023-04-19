import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Button, CardMedia, Typography } from "@material-ui/core";
import { Avatar, TextField, Link } from "@material-ui/core";
import Modal from "react-modal";
import ArrowBack from "@material-ui/icons/ArrowBackIos";

import "./connect.css";
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

export default function ConnectData() {
  const avatarStyle = { backgroundColor: "Black" };
  const classes = useStyles();
  const [apiKey, setApiKey] = useState("");
  const [apiID, setApiID] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const isSubmitDisabled = !(apiKey && apiID);
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
  const handleConnectClick = () => {
    // setShowAlert(false);
    if (apiKey.trim() !== "") {
      window.location.href = "/home";
    }

    // alert("analysing your app");

    // setShowAlert(false);

    localStorage.setItem("display", false);
  };

  return (
    <div className="body">
      <div className={classes.header}>
        <Link href="/Home">
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
          Connect to App{" "}
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
            // marginBottom: "70%",
          }}
        >
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
            variant="contained"
            href="/home"
            className={classes.button}
            disabled={isSubmitDisabled}
            onClick={handleConnectClick}
          >
            Connect to Dashboard
          </Button>

          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
