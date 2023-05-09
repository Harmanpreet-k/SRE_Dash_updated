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

  connectButton: {

        backgroundColor: "#EE9949",
    
    
    
    
        color: "#5f3d1d",
    
        // backgroundColor: "#ffd330",
    
        // display: "flex",
    
        justifyContent: "center",
    
        alignItems: "center",
    
        flex: 0.4,
    
        marginTop: theme.spacing(2),
    
        borderRadius: "5px",
    
        border: "4",
    
        height: "60px",
    
        // width: "10px",
    
        fontSize: "70",
    
        fontFamily: "monospace",
    
        fontWeight: "bold",
    
        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
    
        marginBottom: "10px",
    
        "&:hover": {
    
          backgroundColor: "#be7a3a",
    
          color: "white",
    
        },
    
      },
    
      registerButton: {
    
        backgroundColor: "#1D458A",
    
    
    
    
        color: "#EBF2FA",
    
        // backgroundColor: "#ffd330",
    
        // display: "flex",
    
        justifyContent: "center",
    
        alignItems: "center",
    
        flex: 0.4,
    
        marginTop: theme.spacing(2),
    
        borderRadius: "5px",
    
        border: "4",
    
        height: "60px",
    
        // width: "10px",
    
        fontSize: "70",
    
        fontFamily: "monospace",
    
        fontWeight: "bold",
    
        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
    
        marginBottom: "10px",
    
        "&:hover": {
    
          backgroundColor: "#4B75CB",
    
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
  const [apikey1, setApiKey1] = useState("");
  const [apiID, setApiID] = useState("");
  const [apiData, setApiData] = useState([], []);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const isSubmitDisabled = !(apiKey && apiID);

  const [appname, setAppname] = useState("");
  const location = useLocation();

  const [email, setEmail] = useState(location.pathname.split("/")[2].slice(0));

  
 


  const handleApiKeyChange = async (event) => {
    const newApiKey = event.target.value;
    alert(newApiKey);

    const newEmail = location.pathname.split("/")[2].slice(0);
    //  await fetch("http://localhost:5000/identifyapikey", {


    //    method: "post",
    //     body: JSON.stringify({newApiKey,email}),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data, "data");
    //     });


    setEmail(newEmail);
    //setApiKey1(newApiKey);

    localStorage.setItem("apiKey", apikey1);
  };
  const handleApiIdChange = (event) => {
    //const newApiId = event.target.value;//.split(",")[1];
    //setApiID(newApiId);
    //const newAppName = event.target.value.split(",")[0];
    // alert(event.target.value.split(",")[0]);
   // localStorage.setItem("appname", newAppName);
    //localStorage.setItem("apiId", newApiId);
   localStorage.setItem("appname",event.target.value.split(",")[1] );

localStorage.setItem("apiId",event.target.value.split(",")[0] );
   // setAppname(newAppName);
    // alert(newApiId);

    // localStorage.setItem("appname", newAppName);
  };

  const handleRegisterClick = async (e) => {
    setEmail((prevEmail) => {
      const newEmail = location.pathname.split("/")[2].slice(0);
      console.log(newEmail, "mail mail");
      window.location.href = `/register/${newEmail}`;
      return newEmail;
    });
  };

  const handleConnectClick = async (e) => {
   


    const timeElapsed = Date.now();

    const today = new Date(timeElapsed);

    localStorage.setItem("today",today.toISOString().split("T")[0])




   

    console.log(today.toISOString().split("T")[0])

localStorage.removeItem("Start")

localStorage.removeItem("End")

localStorage.setItem("Span","P30D")
 





    e.preventDefault()

    setEmail(location.pathname.split("/")[2].slice(0))

    // e.preventDefault();
    // console.log(email);

    // setTimeout(() => {
    //   window.location.href = `/home/${email}`;
    // }, 1000);

    // setEmail((prevEmail) => {
    //   const newEmail = location.pathname.split("/")[2].slice(0);
    //   console.log(newEmail, "mail mail");
    //  // window.location.href = `/home/${newEmail}`;
    //   return newEmail;
    // });


    fetch("http://localhost:5000/validateapikey", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        apikey1,
      }),

     
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.msg);
        if (data.msg == 'Incorrect API Key') {
          setErrorMessage("Invalid API Key");
          setShowErrorMessage(true);
        }
        if (data.msg == 'Correct API Key') {
          // setErrorMessage("Valid API Key");
          // setShowErrorMessage(true);
          localStorage.setItem("apiKey", apikey1);
          console.log("newApikey",);
          window.location.href = `/home/${email}`

        }

      });



  };

  const Apifun = async () => {
    let array = [];
    try {
      const response = await fetch("http://localhost:5000/api", {
        method: "GET",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
      console.log(data.msg[0].api, "apidataa");
      setApiData(data.msg[0].api);
      console.log(apiData, "apiiiii");
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
        setErrorMessage('You are not authorized to access this resource.');
        setShowErrorMessage(true);
        // setTimeout(() => {
        // //   window.location.href = `/`;
        //  }, 15000);
      }

    }

  };

  useEffect(() => {
    Apifun();
  }, []);

  // Rest of the code

  return (
    <div className="body">
      <div className={classes.header}>
        <Link href="/home/:email">
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
          <div>
            <select
              onChange={handleApiIdChange}
              style={{
                width: "350px",
                marginTop: "80px",
                marginLeft: "0px",
                marginRight: "-28px",
              }}

              //value={apiID}
            >
              <option value="" disabled selected>
                Select app name
              </option>
              {apiData.map((e, index) => {
                return (
                  <option  value={[e.apiid,e.appname]}>
                    {e.appname}
                  </option>
                );
              })}
            </select>
            
          </div>

          {/* <TextField
            label="Enter APP ID "
            required
            style={{
              width: "70%",
              marginTop: "20px",
            }}
            value={apiID}
            onChange={handleApiIdChange}
          /> */}
          <TextField
            label="Enter API key "
            // variant="outlined"
            required
            style={{
              width: "70%",
              marginTop: "20px",
            }}
            value={apikey1}
            onChange={(e) => setApiKey1(e.target.value)}

          />
           
<div style={{ textAlign: 'left' }}> {showErrorMessage && ( <div className="Error-message" style={{ color: 'red', paddingTop: '0', marginTop: '0px', fontSize: '16px', fontWeight: 'bold', }} > {errorMessage} </div> )} </div>



          <div

                  style={{

                     display: "flex",

                     flexDirection: "row",

                     justifyContent: "space-between",

                     // height: "200px",

                     width: "40vw",

                     paddingLeft: "40px",

                     paddingRight: "35px",

                  }}

               >
                

                  <Button

                     variant="contained"

                     // href="/home"

                     className={classes.connectButton}

                     // disabled={isSubmitDisabled}

                     onClick={handleConnectClick}

                  >

                     Connect to Dashboard

                  </Button>

                  <Button

                     variant="contained"

                     className={classes.registerButton}

                     onClick={handleRegisterClick}

                  >

                     Register New App

                  </Button>

               </div>
          
         

          
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
