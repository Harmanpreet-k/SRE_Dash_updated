import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AppsIcon from "@material-ui/icons/Apps";
import IconButton from "@material-ui/core/IconButton";
import { useNavigate } from "react-router-dom";
import "./home.css";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import { Box, Drawer, TextField } from "@material-ui/core";
import Letancy from "./Letancy";
import ServerReq from "./ServerReq";
import UserCount from "./UserCount";
import ErrorCount from "./ErrorCount";
import FailedReq from "./FailedReq";
import Availibility from "./Availibility";
// import Box from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
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
    color: "white",
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold", // Add bold font weight to title
  },
  avatar: {
    marginLeft: theme.spacing(1), // Add some spacing between title and avatar
    background: "#1976D2", // Update avatar background color
  },
  card: {
    display: "flex",
    overflowY: "auto",
    backgroundColor: "white",
    height: "81vh",
    marginTop: "90px",
    border: "1px solid #000000",
    margin: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    boxShadow: "0px 6px 10px grey",
    borderRadius: theme.spacing(1),
    // backgroundColor: "black",
  },
  card2: {
    display: "flex",
    overflowY: "auto",
    backgroundColor: "white",
    height: "81vh",
    marginTop: "90px",
    border: "1px solid #000000",
    margin: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    boxShadow: "0px 6px 10px grey",
    borderRadius: theme.spacing(1),
    // justifyContent: "center",
  },
  button: {
    backgroundColor: "white",

    color: "black",
    // backgroundColor: "#ffd330",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // marginTop: theme.spacing(2),
    marginRight: "20px",
    borderRadius: "5px",
    border: "4",
    height: "30px",
    // color: "#5f3d1d",
    fontWeight: "bold",
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
    "&:hover": {
      backgroundColor: "#C7D5F3",
      color: "#002D62",
    },
  },
  contentContainer: {
    // flex: 1,
    // padding: theme.spacing(2),
    // display: "flex",
    // justifyContent: "center",
    // overflowY: "auto",
    // alignItems: "center",
  },
  //   contentText: {
  //     textAlign: "center",
  //   },
  contentText: {
    fontWeight: "bold",
  },
  drawer: {
    width: 240,
    // flexShrink: 0,
    alignContent: "left",
  },
  drawerPaper: {
    width: 240,
    background: "hsl(0, 0%, 100%, 0.1)",
    backdropFilter: "blur(0.6rem)", // alignContent: "left",
  },

  bottomButton: {
    margin: theme.spacing(1.5),
    textAlign: "left",
    paddingLeft: "0",
    width: "60%",
  },
  alignLeft: {
    // alignItems: "flex-start",
  },
  labelBox: {
    backgroundColor: "#f5f5f5", // Background color for the box
    padding: theme.spacing(1), // Padding for the box
    marginBottom: theme.spacing(1), // Margin bottom for spacing between boxes
    borderRadius: theme.spacing(1), // Border radius for the box
    width: "200px",
    height: "30px",
  },
  btn: {
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
    },
  },
  label: {
    fontWeight: "bold", // Font weight for the label text
  },
}));

function HomePage() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  //   const [display, setDisplay] = useState(false);
  const [apiID, setApiID] = useState("");
  const [apiKey, setApiKey] = useState("");
  const handleConnectClick = () => {
    if (apiKey.trim() !== "") {
      window.location.href = "/home";
    }
    localStorage.setItem("display", false);
  };
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
  const avatarStyle = { backgroundColor: "Black" };
  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        open={isOpen}
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "start",
            justifyItems: "flex-start",
            overflowY: "auto",
          }}
        >
          {" "}
          {/* Add className to align text */}
          <Typography
            variant="h5"
            align="center"
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              color: "#1134A6",
              fontWeight: "10%",
            }}
          >
            {/* DASHBOARDS */}
          </Typography>
          {/* Profile */}
          <Button
            className={classes.bottomButton}
            startIcon={<PersonIcon />}
            fullWidth
          >
            Profile
          </Button>
          {/* Settings */}
          <Button
            className={classes.bottomButton}
            startIcon={<SettingsIcon />}
            fullWidth
          >
            Settings
          </Button>
          {/* Logout */}
          <Button
            className={classes.bottomButton}
            startIcon={<ExitToAppIcon />}
            fullWidth
          >
            Logout
          </Button>
        </div>

        {/* Add Dashboard */}
      </Drawer>

      <div className={classes.root}>
        <div className={classes.header}>
          <IconButton>
            <AppsIcon
              className={classes.logo}
              onClick={isOpen ? handleDrawerClose : handleDrawerOpen}
            />
          </IconButton>
          <Typography align="left" variant="h6" className={classes.title}>
            SRE Dashboard
          </Typography>
          <div className={classes.contentText}>
            <Button
              variant="contained"
              href="/Connect"
              className={classes.button}
              //   className="btn btn-primary rounded"
            >
              ADD APP
            </Button>
          </div>
          <Avatar className={classes.avatar} style={avatarStyle}>
            {/* Update avatar to display initials */}
            <Typography variant="subtitle1">SD</Typography>
          </Avatar>
        </div>
      </div>
      {localStorage.getItem("display") == "false" && (
        <Card className={classes.card} elevation={3}>
          <CardContent
            className={classes.contentContainer}
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <div style={{ flex: 1 }}>
              <Box className={classes.labelBox}>
                <Typography className={classes.label} variant="subtitle1">
                  Server Requests
                </Typography>
              </Box>
              <ServerReq />
            </div>
            <div>
              <Box className={classes.labelBox}>
                <Typography className={classes.label} variant="subtitle1">
                  Latency
                </Typography>
              </Box>
              <Letancy />
            </div>

            <div>
              <Box className={classes.labelBox}>
                <Typography className={classes.label} variant="subtitle1">
                  Error Count
                </Typography>
              </Box>
              <ErrorCount />
            </div>
            <div>
              <Box className={classes.labelBox}>
                <Typography className={classes.label} variant="subtitle1">
                  User Count
                </Typography>
              </Box>
              <UserCount />
            </div>
            <div>
              <Box className={classes.labelBox}>
                <Typography className={classes.label} variant="subtitle1">
                  Availibility
                </Typography>
              </Box>
              <Availibility />
            </div>
            <div>
              <Box className={classes.labelBox}>
                <Typography className={classes.label} variant="subtitle1">
                  Failed Requests
                </Typography>
              </Box>
              <FailedReq />
            </div>
          </CardContent>
        </Card>
      )}
      {localStorage.getItem("display") == "true" && (
        <Card className={classes.card2} elevation={3}>
          <CardContent
          // className={classes.contentContainer}
          // style={{ display: "flex", flexWrap: "wrap" }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="data-background-image"></div>
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
                  marginTop: "40px",
                  marginRight: "60px",
                }}
              >
                <TextField
                  label="Enter API key "
                  variant="outlined"
                  style={{
                    width: "70%",
                    marginTop: "20px",
                  }}
                  value={apiKey}
                  onChange={handleApiKeyChange}
                />
                <TextField
                  label="Enter API ID "
                  variant="outlined"
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
                  className={classes.btn}
                  disabled={apiKey.trim() === ""}
                  onClick={handleConnectClick}
                >
                  Connect to Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default HomePage;
