// LawyerProfile.jsx
import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const LawyerProfile = () => {
  const [lawyerDetails, setLawyerDetails] = useState({
    photo: "", // URL or file
    name: "John Doe",
    address: "123 Main Street, Cityville",
    phoneNumber: "123-456-7890",
    email: "john.doe@example.com",
    password: "", // Current password
    newPassword: "", // New password
  });

  const handleChange = (field, value) => {
    setLawyerDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Perform actions to update lawyer details
    console.log("Updating lawyer details:", lawyerDetails);
    // Add logic to send updated details to the backend
  };

  return (
    <div className="LawyerProfile"style={{ padding: "10px 220px" }}>
      <Typography variant="h4">Lawyer Profile</Typography>

      {/* Photo Upload */}
      {/* Add logic for handling photo upload */}
      <TextField
        label="Profile Photo (URL or File)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={lawyerDetails.photo}
        onChange={(e) => handleChange("photo", e.target.value)}
      />

      {/* Basic Information */}
      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={lawyerDetails.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={lawyerDetails.address}
        onChange={(e) => handleChange("address", e.target.value)}
      />

      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={lawyerDetails.phoneNumber}
        onChange={(e) => handleChange("phoneNumber", e.target.value)}
      />

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={lawyerDetails.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      {/* Password Update */}
      <TextField
        label="Current Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={lawyerDetails.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />

      <TextField
        label="New Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={lawyerDetails.newPassword}
        onChange={(e) => handleChange("newPassword", e.target.value)}
      />

      {/* Submit Button */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Update Profile
      </Button>
    </div>
  );
};

export default LawyerProfile;
