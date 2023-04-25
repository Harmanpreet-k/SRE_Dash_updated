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
import "./login.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";

// import alert
const useStyles = makeStyles((theme) => ({
  button: {
    // backgroundColor: "#EE9949",

    // color: "#5f3d1d",
    // // backgroundColor: "#ffd330",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // flex: 0.1,
    // marginTop: theme.spacing(2),
    // borderRadius: "5px",
    // border: "4",
    // height: "10px",
    // fontWeight: "bold",
    // boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
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

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isSubmitDisabled = !(email && password);
  const classes = useStyles();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(email);
    // Retrieve stored user data from localStorage
    // const storedData = localStorage.getItem("userData");
    // const userData = storedData ? JSON.parse(storedData) : null;

    // userData.map((e) => {

    //   if (!username || !password) {
    //     setError("Please enter both username and password.");
    //   } else {
    //     if (userData) {

    //       if (username === e.name && password === e.password) {
    //         console.log("Login successful");
    //         window.location.href = "/home";
    //         localStorage.setItem("display", true);
    //       } else {
    //         console.log("Invalid username or password");
    //         setError("Incorrect username or password.");
    //       }
    //     } else {
    //       console.log("Form is invalid");
    //     }
    //   }
    // });
    //   let result = await fetch("http://localhost:5000/login", {
    //     method: "post",

    //     body: JSON.stringify({ email, password }),

    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   result = await result.json();
    //   console.warn(result);
    //   // Validate form inputs
    // };
    // console.log("hi");
    let status = 404;

    let result = await fetch("http://localhost:5000/login", {
      method: "post",

      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    status = result.status;

    if (status == 200) {
      // window.location.href = "/home";
    } else if (status == 404) {
      setError("Incorrect username or password.");
      console.log("in");
    }
    // result = await result;
    console.log("hi");
    console.log(result, "result");
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
