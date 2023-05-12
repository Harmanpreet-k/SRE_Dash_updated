import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./signup.css";
// import { Alert } from "@mui/material/core";
// import { Alert } from "@mui/material";
// import Alert from "@mui/material/Alert";
import { ThemeContext } from "styled-components";
// import makeStyles from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// import alert
const useStyles = makeStyles((theme) => ({
  button: {
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
const Signup = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apikey, setApikey] = useState("");
  const [apiid, setApiid] = useState("");
  const [appname, setAppname] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const classes = useStyles();

  const isSubmitDisabled = !(
    name &&
    email &&
    phone &&
    password &&
    confirmPassword
  );
  const validateName = () => {
    const namePattern = /^[a-zA-Z]+$/;
    if (name.length === 0 || !namePattern.test(name)) {
      setNameError(true);
      return false;
    }
    setNameError(false);
    return true;
  };

  const validateEmail = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setEmailError(true);
      return false;
    }
    setEmailError(false);
    return true;
  };

  const validatePhone = () => {
    if (phone.length === 0) {
      setPhoneError(true);
      return false;
    }
    setPhoneError(false);
    return true;
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      return false;
    }
    setPasswordError(false);
    return true;
  };

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      return false;
    }
    setConfirmPasswordError(false);
    return true;
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleSubmit = async (e) => {

        e.preventDefault();
    
    
    
    
        let result = await fetch("http://localhost:5000/register", {
    
          method: "post",
    
    
    
    
          body: JSON.stringify({
    
            name,
    
            email,
    
            phone,
    
            password,
    
            apikey,
    
            apiid,
    
            appname,
    
          }),
    
          headers: {
    
            "Content-Type": "application/json",
    
          },
    
        });
    
    
    
    
        result = await result.json();
    
    
    
    
        console.warn(result);
    
    
    
    
        if (!validateEmail()) {
    
          setEmailError("Enter a valid emailId");
    
        }
    
        if (!validatePassword()) {
    
          setPasswordError("Enter a valid password");
    
        }
    
        if (!validateName()) {
    
          setNameError("Enter a valid name");
    
        }
    
        if (!validateConfirmPassword()) {
    
          setNameError("");
    
        }
    
        if (!validatePhone()) {
    
          setPhoneError();
    
        }
    
        if (
    
          validateEmail() &&
    
          validatePassword() &&
    
          validateName() &&
    
          validateConfirmPassword() &&
    
          validatePhone() &&
    
          result
    
        ) {
    
          Swal.fire(
            'Good job!',
            'You Signed Up Successfully!',
            'success'
          )
    
          setShowSuccessMessage(true);
    
          setTimeout(() => {
    
            window.location.href = "/";
    
          }, 2000);
    
        }
    
      };

  const paperStyle = { padding: "40px 30px", width: 1000, margin: "15px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#90CAF9" };
  // const marginTop = { marginTop: 5 };
  const boxStyle = {
    width: 400,
    align: "left",
  };
  const textPrivate = {
    color: "#2F4F4F",
  };
  return (
    <Grid>
      <Paper
        elevation={10}
        style={paperStyle}
        className="signup-background-image"
      >
        <Box style={boxStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}></Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create an account !
            </Typography>
          </Grid>
          <form>
            <TextField
              fullWidth
              label="Name"
              placeholder="Enter your name"
              error={nameError}
              helperText={nameError ? "Name is required" : ""}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Email"
              placeholder="Enter your email"
              error={emailError}
              helperText={
                emailError ? "Please enter a valid email address" : ""
              }
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Phone Number"
              placeholder="Enter your phone number"
              error={phoneError}
              helperText={phoneError ? "Phone number is required" : ""}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              error={passwordError}
              helperText={passwordError ? "Please enter a strong password" : ""}
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

            <TextField
              fullWidth
              label="Confirm Password"
              placeholder="Confirm your password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              error={confirmPasswordError}
              helperText={confirmPasswordError ? "Passwords do not match" : ""}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Typography
              mt={4}
              style={textPrivate}
              variant="caption"
              color="#2929b8"
            >
              By registering, you confirm that you accept our Terms of service
              and Privacy Policy
            </Typography>
            <Button
              variant="contained"
              // style={{

              // }}
              className={classes.button}
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
            >
              Sign Up
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
            style={{
              display: "inline-block",
              backgroundColor: "#3f51b5",
              color: "#fff",
              padding: "10px 20px",
              textDecoration: "none",
              borderRadius: "5px",
              width: "100%",
              textAlign: "center",
            }}
            onClick={handleSubmit}
          >
            Sign in
          </Link> */}
          Already have an account ?<Link href="/">Login</Link>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Signup;
