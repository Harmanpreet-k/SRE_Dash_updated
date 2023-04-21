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
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const handleLogin = () => {
  //   if (!username || !password) {
  //     setError("Please enter both username and password.");
  //   } else if (username !== "admin" || password !== "admin123") {
  //     setError("Incorrect username or password.");
  //   } else {
  //     window.location.href = "/Home";
  //     localStorage.setItem("display", true);
  //   }
  // };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve stored user data from localStorage
    const storedData = localStorage.getItem("userData");
    const userData = storedData ? JSON.parse(storedData) : null;

    userData.map((e) => {
      // console.log(e.name);
      if (!username || !password) {
        setError("Please enter both username and password.");
      } else {
        if (userData) {
          // Compare input values with stored user data
          // console.log(userData);
          if (username === e.name && password === e.password) {
            console.log("Login successful");
            window.location.href = "/home";
            localStorage.setItem("display", true);
          } else {
            console.log("Invalid username or password");
            setError("Incorrect username or password.");
          }
        } else {
          console.log("Form is invalid");
        }
      }
    });
    // Validate form inputs
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
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            error={error}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <Link
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
          </Link>
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
