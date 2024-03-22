import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import "../mainpadding.css"


const EmergencyRequestPage = () => {
  const [emergencyType, setEmergencyType] = useState("");
  const [emergencyDescription, setEmergencyDescription] = useState("");

  const handleEmergencyTypeChange = (event) => {
    setEmergencyType(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const uid = sessionStorage.getItem("SessionId");

      // Add the emergency request to the database
      const emergencyRequestRef = await addDoc(collection(db, "emergencyRequests"), {
        UserID: uid,

        emergencyType,
        emergencyDescription,
        status: "pending", // You can set an initial status like "pending"
      });

      console.log("Emergency request submitted with ID:", emergencyRequestRef.id);

      // Clear the form fields after submission
      setEmergencyType("");
      setEmergencyDescription("");
    } catch (error) {
      console.error("Error submitting emergency request:", error);
    }
  };

  return (
    <div className="maincontainer ">
      <Typography variant="h4">Emergency Request</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="emergency-type-label">Emergency Type</InputLabel>
        <Select
          labelId="emergency-type-label"
          id="emergency-type-select"
          value={emergencyType}
          onChange={handleEmergencyTypeChange}
          label="Emergency Type"
        >
          <MenuItem value="Medical">Medical</MenuItem>
          <MenuItem value="Accident">Accident</MenuItem>
          <MenuItem value="Fire">Fire</MenuItem>
          {/* Add more emergency types as needed */}
        </Select>
      </FormControl>

      <TextField
        label="Emergency Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={emergencyDescription}
        onChange={(e) => setEmergencyDescription(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Emergency Request
      </Button>
    </div>
  );
};

export default EmergencyRequestPage;
