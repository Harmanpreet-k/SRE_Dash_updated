import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AppsIcon from "@material-ui/icons/Apps";
import IconButton from "@material-ui/core/IconButton";
import Swal from "sweetalert2";
// import SpeedIcon from "@mui/icons-material/Speed";
import "./home.css";
import { Doughnut } from "react-chartjs-2";
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
import ReactSpeedometer from "react-d3-speedometer";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";

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
    // backgroundColor: "white",
    height: "85vh",
    marginTop: "80px",
    border: "1px solid #000000",
    margin: theme.spacing(2),
    // paddingBottom: theme.spacing(2),
    boxShadow: "0px 6px 10px grey",
    borderRadius: theme.spacing(1),
    // justifyContent: "center",
    backgroundColor: "#6592FD",
    // background: "hsl(0, 0%, 100%, 0.1)",
    // backdropFilter: "blur(1rem)",
    scrollBehavior: "smooth",
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
    // padding: theme.spacing(1), // Padding for the box
    // marginBottom: theme.spacing(1), // Margin bottom for spacing between boxes
    borderRadius: theme.spacing(1), // Border radius for the box
    width: "200px",
    height: "30px",
    textAlign: "center",
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
      color: "white",
    },
  },
  label: {
    fontWeight: "bold", // Font weight for the label text
  },
}));

function HomePage() {
  const [appname, setAppname] = useState("");
  const [score, setScore] = useState("");
  const [selectedValue, setSelectedValue] = useState(""); // State to store selected value
  const [selectedValues, setSelectedValues] = useState(""); // State to store selected value

  const [heading, setHeading] = useState("TimeSpan");
  const [endDate, setEndDate] = useState();

const [error, setError] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    localStorage.setItem("Span", event.target.value);
    localStorage.setItem("Name", event.target.value);
    window.location.reload(true);

    // Update selected value in state
  };
  const RefreshMethod = () => {
    window.location.reload(true);
   

   if(localStorage.getItem('Start')==null || localStorage.getItem("End")==null)

    {

      Swal.fire(

        'Ooops ',

        'Both Field are required',

        'question'

      )

    }

    else

    {

      window.location.reload(true);

    }



  };

  const handleStartDates = (e) => {
    setDate(e.target.value);
    localStorage.setItem("Start", e.target.value);
    console.log(localStorage.getItem("Start"));

    
      const selectedDate = e.target.value;
     
      // Check if the selectedDate is empty or invalid
      
     
     // ...
      if(localStorage.getItem('Start')==null || localStorage.getItem("End")==null)

    {

      Swal.fire(

        'Ooops ',

        'Both Field are required',

        'question'

      )

    }

    else

    {

      window.location.reload(true);

    }
    
  };
  const handleEndDates = (e) => {
    setEndDate(e.target.value);
    localStorage.setItem("End", e.target.value);
    console.log(localStorage.getItem("End"));
  
  };
  const handleChangesInterval = (event) => {
    setSelectedValues(event.target.value); // Update selected value in state
    localStorage.setItem("interval", event.target.value);
  };
  useEffect(() => {
    setTimeout(() => {
      const retrievedAppname = localStorage.getItem("appname");
      // const eliminatedAppName = retrievedAppname.replace(/\d+$/, "");
      // console.log("App name:", eliminatedAppName);
      setAppname(retrievedAppname); // Update appname state with retrieved value or empty string
      // window.location.reload();
    }, 1000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      const retrievedScore = localStorage.getItem("score");
      setScore(retrievedScore || ""); // Update score state with retrieved value or empty string

      // Update appname state with retrieved value or empty string
    }, 6000);
  }, []);

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  //   const [display, setDisplay] = useState(false);
  const [apiID, setApiID] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [email, setEmail] = useState("");
  const isSubmitDisabled = !(apiKey && apiID);
  const location = useLocation();

  const [startDate, setDate] = useState();
  // const email = queryParameters.get("email");

  const handleConnectClick = async (e) => {
    setEmail(location.pathname.split("/")[2].slice(0));

    e.preventDefault();
    console.log(apiKey, apiID);
    if (apiKey.trim() !== "") {
      let result = await fetch("http://localhost:5000/update", {
        method: "post",
        body: JSON.stringify({ apiKey, apiID, email }),
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
      window.location.href = `/home/${email}`;
      console.log(result);
    }

    localStorage.setItem("display", false);
  };

  const handleApiKeyChange = (event) => {
    const newApiKey = event.target.value;
    setApiKey(newApiKey);
    localStorage.setItem("apiKey", newApiKey);
    const appName = localStorage.getItem("apiKey");
  };
  const handleApiIdChange = (event) => {
    const newApiId = event.target.value;
    setApiID(newApiId);
    localStorage.setItem("apiId", newApiId);
  };
  const handleButtonClick = () => {
    setEmail((prevEmail) => {
      localStorage.removeItem("Start");
      localStorage.removeItem("End");
      const newEmail = location.pathname.split("/")[2].slice(0);
      console.log(newEmail, "mail mail");
      window.location.href = `/connect/${newEmail}`;
      return newEmail;
    });
  };
  const avatarStyle = { backgroundColor: "Black" };
  const handleDrawerOpen = () => {
    setIsOpen(true);
  };


  const handleDrawerClose = () => {
    setIsOpen(false);
  };
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

        console.log(server, "server1");

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

      console.log(failed, "failed1");
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
      avail =
        data.value.segments[0]["availabilityResults/availabilityPercentage"]
          .avg;
      console.log(avail, "avail1");
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

      console.log(response, "response1");
    })
    .catch((error) => {
      console.error(error);
    });

  req();

  setTimeout(() => {
    sucess = ((server - failed) / server) * 100;
    // sucess = 50;

    console.log(sucess, "sucess1");
  }, 2000);

  //   var i = 0;
  const ReliabilityScore = () => {
    // Your logic here
    let result = ""; // Store the result as a string

    setTimeout(() => {
      if (!sucess || !response || !avail) {
        result = "NA";
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
    }, 3000);
  };

  ReliabilityScore();

  const result = localStorage.getItem("score");
  console.log(result, "res1");
  let bgColor = "";
  let value = 8; // default value
  // Determine the background color based on the score
  if (result === "Bad") {
    // bgColor = "#FFDA03";
    // bgColor = " #F7B032";
    value = 28;
  } else if (result === "Poor") {
    // bgColor = "#ffa940";
    // bgColor = "#FEF37D";
    value = 48;
  } else if (result === "Average") {
    // bgColor = "#EF9100";
    value = 68;
  } else if (result === "Good") {
    // bgColor = "#94C120";
    value = 98;
  } else {
    // bgColor = "#EA4E1B";
  }

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
            href="/"
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
          {/* <SpeedIcon></SpeedIcon> */}
          <div></div>
          <Typography align="left" variant="h6" className={classes.title}>
            SRE Dashboard
          </Typography>
          <div className={classes.contentText}>
            <Button
              variant="contained"
              // href={`/Connect/${email}`}
              onClick={handleButtonClick}
              className={classes.button}
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
        <Card className={classes.card2} elevation={3}>
          <CardContent className="media-scroller">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // position: "fixed ",
                // background: "hsl(0, 0%, 100%, 0.1)",
                // backdropFilter: "blur(0.3em)",
                width: "95vw",
                marginTop: "-14px",
                padding: "0",
                marginLeft: "9px",
                borderRadius: "5px",
                // alignItems: "start",
                marginBottom: "-17px",
                // top: 0,
                // boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto", // Use grid layout to display appname and score in a row
                  alignItems: "center",
                  gap: "10px",
                  textAlign: "left",
                  color: "white",
                  marginLeft: "85px",
                  marginTop: "0px",
                  // marginTop: "5px",

                  fontSize: "40px",
                  fontWeight: "bold",

                  textShadow: "3px 3px 5px rgba(0, 0, 0, 1)",
                }}
              >
                {appname}
              </div>
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                style={{
                  width: "150px",
                  marginTop: "45px",
                  marginLeft: "0px",
                  marginRight: "-20px",
                }}
              >
                {/* <InputLabel
                  // htmlFor="dropdown"
                  // style={{
                  //   marginTop: "3px",
                  // }}
                >
                {localStorage.getItem("Name")}
                </InputLabel> */}
                {/* <Select
                  id="dropdown"
                  label="Timespan"
                  value={selectedValue}
                  onChange={handleChange}
                  labelWidth={120}
                  size="small" // Set the size to small
                >
                  <MenuItem value="P30D">Month</MenuItem>
                  <MenuItem value="P7D">Week</MenuItem>
                  <MenuItem value="P1D">Day</MenuItem>
                </Select> */}
              </FormControl>

              <div className="row justify-content-end m-3">
                <div className="col">
                  <label className="title">From :</label>{" "}
                  <input
                    className="form-control"
                    type="date"
                    value={localStorage.getItem("Start")}
                    onChange={handleStartDates}
                    max={localStorage.getItem("today")}
                    onKeyDown={(e) => e.preventDefault()}
   onPaste={(e) => e.preventDefault()}
   onCut={(e) => e.preventDefault()}
   onDrag={(e) => e.preventDefault()}
  onDrop={(e) => e.preventDefault()}
                  
                  />
                  
                </div>
                <div className="col">
                  <label className="title">To : </label>
                  <input
                    type="date"
                    className="form-control"
                    value={localStorage.getItem("End")}
                    onChange={handleEndDates}
                    min={localStorage.getItem("Start")}
                    max={localStorage.getItem("today")}
                    onKeyDown={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onDrag={(e) => e.preventDefault()}
                   onDrop={(e) => e.preventDefault()}
                  />
                </div>

                <div className="col">
                  <br />
                  <button onClick={RefreshMethod} className="btn btn-dark">
                    Search
                  </button>
                </div>
              </div>
             

              <ReactSpeedometer
                styles={{
                  marginTop: "0px",
                  marginBottom: "-300px",
                  padding: "0",
                }}
                shadowOpacity={0.4} // Set shadow opacity to 0.4
                shadowBlur={4} // Set shadow blur radius to 4
                shadowX={10} // Set horizontal shadow offset to 2
                shadowY={10} // Set vertical shadow offset to 2
                value={value} // the value to be shown on the speedometer
                minValue={0} // the minimum value of the speedometer
                maxValue={100} // the maximum value of the speedometer
                width={200} // the width of the speedometer
                height={125} // the height of the speedometer
                needleColor="black" // the color of the needle
                startColor="#e92028" // the color of the start segment
                endColor="#41ba0b" // the color of the end segment
                segments={5} // the number of segments on the speedometer
                textColor="black" // the color of the text labels
                needleTransitionDuration={3330} // the duration of the needle transition animation
                needleHeightRatio={0.5}
                needleTransition="easeElastic"
                valueTextFontSize="0px"
                customSegmentLabels={[
                  {
                    text: "NA",
                    position: "INSIDE",
                    color: "white",
                    fontSize: "10px",
                  },
                  {
                    text: "Bad",
                    position: "INSIDE",
                    color: "white",
                    fontSize: "10px",
                  },
                  {
                    text: "Poor",
                    position: "INSIDE",
                    color: "white",
                    fontSize: "10px",
                  },
                  {
                    text: "Avg",
                    position: "INSIDE",
                    color: "white",
                    fontSize: "10px",
                  },
                  {
                    text: "Good",
                    position: "INSIDE",
                    color: "white",
                    fontSize: "10px",
                  },
                ]}
              />
            </div>

            <Typography
              variant="poster"
              style={{
                marginLeft: "1467px",
                marginTop: "0px",
                marginBottom: "400px",
                padding: 0,
                color: "white",
                fontSize: "15px",
                fontWeight: "bold",

                textShadow: "2px 2px 3px rgba(0, 0, 0, 1)",
              }}
            >
              <label> Reliability Score</label>
            </Typography>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4rem",

                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  border: "0.3px solid black ",
                  borderRadius: "12px",
                  padding: "10px",
                  height: "350px",
                  width: "500px",
                  boxShadow: "0px 9px 10px 1px rgba(0,0,0,0.2)",
                }}
              >
                <Box className={classes.labelBox}>
                  <Typography className={classes.label} variant="subtitle1">
                    Server Requests
                  </Typography>
                </Box>
                <ServerReq start={startDate} end={endDate} />
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  border: "1px solid black ",
                  borderRadius: "20px",
                  // borderRadius: "20px",
                  padding: "10px",
                  height: "350px",
                  width: "500px",
                  boxShadow: "0px 9px 10px 1px rgba(0,0,0,0.2)",
                }}
              >
                <Box className={classes.labelBox}>
                  <Typography className={classes.label} variant="subtitle1">
                    Latency
                  </Typography>
                </Box>
                <Letancy start={startDate} end={endDate} />
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  border: "1px solid black ",
                  borderRadius: "20px",
                  padding: "10px",
                  height: "350px",
                  width: "500px",
                  boxShadow: "0px 9px 10px 1px rgba(0,0,0,0.2)",
                }}
              >
                <Box className={classes.labelBox}>
                  <Typography className={classes.label} variant="subtitle1">
                    Exception Count
                  </Typography>
                </Box>
                <ErrorCount />
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  border: "1px solid black ",
                  borderRadius: "20px",
                  padding: "10px",
                  height: "350px",
                  width: "500px",
                  boxShadow: "0px 9px 10px 1px rgba(0,0,0,0.2)",
                }}
              >
                <Box className={classes.labelBox}>
                  <Typography className={classes.label} variant="subtitle1">
                    User Count
                  </Typography>
                </Box>
                <UserCount />
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  border: "1px solid black ",
                  borderRadius: "20px",
                  padding: "10px",
                  height: "350px",
                  width: "500px",
                  boxShadow: "0px 9px 10px 1px rgba(0,0,0,0.2)",
                }}
              >
                <Box className={classes.labelBox}>
                  <Typography className={classes.label} variant="subtitle1">
                    Availibility
                  </Typography>
                </Box>
                <Availibility />
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  border: "1px solid black ",
                  borderRadius: "20px",
                  padding: "10px",
                  height: "350px",
                  width: "500px",
                  boxShadow: "0px 9px 10px 1px rgba(0,0,0,0.2)",
                }}
              >
                <Box className={classes.labelBox}>
                  <Typography className={classes.label} variant="subtitle1">
                    Failed Requests
                  </Typography>
                </Box>
                <FailedReq />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {localStorage.getItem("display") == "true" && (
        <Card className={classes.card} elevation={3}>
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
                  required
                  // variant="outlined"
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
                  // variant="outlined"
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
                  disabled={isSubmitDisabled}
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
