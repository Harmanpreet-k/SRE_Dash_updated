import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./login.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import ConnectData from "./ConnectApp";

// import alert
const useStyles = makeStyles((theme) => ({
  button: {
    display: "inline-block",
    backgroundColor: "#3f51b5",
    color: "#fff",
    padding: "10px 20px",
    textDecoration: "none",
    borderRadius: "5px",
    width: "100%",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#3f51b5",
      color: "black",
    },
  },
}));
const Login = () => {
  const paperStyle = {
    padding: "95px 30px",
    width: 1000,
    margin: "30px auto",
  };
  const boxStyle = {
    width: 400,
    // padding: "-5px 30px",

    align: "left",
  };
  const avatarStyle = { backgroundColor: "#90CAF9" };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loggedmail, setLoggedmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const isSubmitDisabled = !(email && password);
  const classes = useStyles();
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    let status = 404;

    fetch("http://localhost:5000/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.msg == "valid user") {
          fetch("http://localhost:5000/loggeduser", {
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
            .then(async (data) => {
              console.log(data, "email");
              // if (data.msg == "valid user") {
              // alert("login successful");
              // dispatch(set_user(email));
              try {
                const response = await fetch(
                  "http://localhost:5000/loggeduser",
                  {
                    method: "GET",
                    crossDomain: true,
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                      "Access-Control-Allow-Origin": "*",
                    },
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data.msg, "dataa");
                    // setLoggedmail(data.msg);
                    // console.log(loggedmail, "eee");
                    setSuccessMessage("Login successful!!");
                    setShowSuccessMessage(true);
                    setTimeout(() => {
                      window.location.href = `/home/${data.msg}`;
                    }, 2000);
                  });
              } catch (err) {
                console.log(err);
                setError("Incorrect username or password.");
              }

              localStorage.setItem("display", true);
            });

          localStorage.setItem("display", true);
        }
      });
  };

  return (
    <Grid>
      <Paper
        elevation={10}
        className="login-background-image"
        style={paperStyle}
      >
        <Box style={boxStyle} sx={{ pt: 920 }}>
          <Grid align="center">
            <Avatar style={avatarStyle}>{/* <LockIcon /> */}</Avatar>
            <h2>Sign In</h2>
          </Grid>
          <form>
            <TextField
              label="EmailID"
              placeholder="Enter EmailID"
              fullWidth
              required
              error={error}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            error={error}
            onChange={(e) => setPassword(e.target.value)}
            helperText={error ? error : ""}
          /> */}
            <TextField
              fullWidth
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              error={error}
              // helperText={passwordError ? "Please enter a strong password" : ""}
              helperText={error ? error : ""}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
              sx={{ mt: 200 }}
            />
            <Button
              variant="contained"
              // style={{

              // }}
              className={classes.button}
              onClick={handleLogin}
              disabled={isSubmitDisabled}
            >
              Sign In
            </Button>
            {showSuccessMessage && (
              <div
                className="success-message"
                style={{
                  color: "green",
                  marginTop: "9px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {successMessage}
              </div>
            )}
          </form>
          {/* <Link
            // href="#"
            style={{
              mt: 200,
              display: "inline-block",
              backgroundColor: "#3f51b5",
              color: "#fff",
              marginTop: "20",
              padding: "10px 20px",
              textDecoration: "none",
              borderRadius: "5px",
              width: "100%",
              textAlign: "center",
            }}
            onClick={handleLogin}
          >
            Sign in
          </Link> */}
          <Typography>
            {/* <Link href="#">Forgot password ?</Link> */}
          </Typography>
          <div style={{ marginTop: "20px" }}>
            <Typography sx={{ pt: -20 }}>
              {" "}
              Don't have an account ?<Link href="/Signup">Sign up</Link>
            </Typography>
          </div>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Login;
