import React, { useEffect, useState } from "react";
import "./login.css";
import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment, Snackbar, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../config/Firebase";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    sessionStorage.clear(); // Clear everything from the session when component mounts
  }, []);

  const validateEmail = (email) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      if (!email || !validateEmail(email)) {
        setEmailError(true);
        return;
      }
      if (!password) {
        setPasswordError(true);
        return;
      }
  
      // Check if email and password are admin credentials
      if (email === "admin@gmail.com" && password === "admin") {
        sessionStorage.setItem("aid", "admin"); // Set session aid to admin
        navigate("./admin"); // Redirect to ./admin
        return;
      }
  
      // Authenticate user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const id = userCredential.user.uid;
  
      console.log(id);
      const docRefUser = doc(db, "collection_user", id);
      const docSnapUser = await getDoc(docRefUser);
  
      const docRefAdmin = doc(db, "Admin_collection", id);
      const docSnapAdmin = await getDoc(docRefAdmin);
  
      const docRefLawyer = doc(db, "lawyer_collection", id);
      const docSnapLawyer = await getDoc(docRefLawyer);
  
      const docRefPS = doc(db, "police_station_collection", id);
      const docSnapPS = await getDoc(docRefPS);
  
      if (docSnapUser.exists()) {
        sessionStorage.setItem("uid", id);
        navigate("../../../User/");
      } else if (docSnapAdmin.exists()) {
        sessionStorage.setItem("aid", id);
        navigate("../../../Admin/");
      } else if (docSnapLawyer.exists()) {
        sessionStorage.setItem("lid", id);
        navigate("../../../Lawyer/");
      } else if (docSnapPS.exists()) {
        sessionStorage.setItem("pid", id);
        navigate("../../police");
      } else {
        setError("Invalid credentials");
      }
      console.log(id);
    } catch (error) {
      const errorMessage = error.message;
      setError("Incorrect email / password");
    } finally {
      setLoading(false);
    }
  };
  

  const handleForgotPassword = () => {
    console.log(email);
    const auth = getAuth();
sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log("email Sent");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  };

  const handleCloseAlert = () => {
    setError("");
  };

  const CheckAuth = async () => {
    // Check authentication logic
  };

  useEffect(() => {
    CheckAuth();
  }, []);

  return (
    <Box className="mainlogin" component="form">
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <div className="leftContainer">
        <div className="h1input">
          <Typography variant="h1">Login</Typography>
        </div>
        <div className="input">
          <TextField
            id="Email"
            label="Username/Email"
            required
            variant="standard"
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            error={emailError}
            helperText={emailError ? "Email is required and must be valid" : ""}
          />
        </div>
        <div className="input">
          <TextField
            id="standard-password-input"
            label="Password...."
            variant="standard"
            type={showPassword ? "text" : "password"}
            onChange={(event) => setPassword(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={passwordError}
            helperText={passwordError ? "Password is required" : ""}
          />
        </div>
        <div className="button">
          <Button variant="outlined" type="button" onClick={handleLogin} disabled={loading || emailError || passwordError}>
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </div>
        <div className="linkContainer">
          <div className="link">
            <Typography variant="subtitle2">Don't have an account?</Typography>{" "}
            <div className="change">
              <span>
                <Link to="../../Register">Join Now</Link>{" "}
              </span>
            </div>
          </div>
          <div className="forgot" align="center">
            <Button onClick={handleForgotPassword} disabled={emailError || !validateEmail(email)}>
              Forgotten Password
            </Button>
            {(emailError || !validateEmail(email)) && (
              <Typography variant="caption" color="error">
                Please provide a valid email address.
              </Typography>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Login;
