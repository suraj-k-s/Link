import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import "./PermitRequestForm.css";
import PhoneInput from "react-phone-number-input";

const PermitRequestForm = () => {
  const [permitType, setPermitType] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantAddress, setApplicantAddress] = useState("");
  const [reason, setReason] = useState("");
  const [permit, setPermit] = useState([]);
  const [eventDateStart, setEventDateStart] = useState("");
  const [eventDateEnd, setEventDateEnd] = useState("");
  const [contactNumber, setContactNumber] = useState(""); // State for phone number

  const handlePermitTypeChange = (event) => {
    setPermitType(event.target.value);
  };

  useEffect(() => {
    getPermit();
  }, []);

  const getPermit = async () => {
    try {
      const permitData = await getDocs(collection(db, "Permit"));
      const filteredPermit = permitData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPermit(filteredPermit);
      console.log(filteredPermit);
    } catch (error) {
      console.error("Error fetching permits:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uid = sessionStorage.getItem("uid");

      // Add the permit request to the database
      const permitRequestRef = await addDoc(collection(db, "permitRequests"), {
        UserID: uid,
        permitType,
        applicantName,
        applicantAddress,
        reason,
        eventDateStart,
        eventDateEnd,
        contactNumber, // Include contactNumber in the permit request data
        timestamp: new Date(),
      });

      console.log("Permit request submitted with ID: ", permitRequestRef.id);

      // Clear form fields after submission
      setPermitType("");
      setApplicantName("");
      setApplicantAddress("");
      setReason("");
      setEventDateStart("");
      setEventDateEnd("");
      setContactNumber(""); // Clear contactNumber after submission
      getPermit();
    } catch (error) {
      console.error("Error submitting permit request:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="permitForm">
      <div className="permitContainer">
        <Typography variant="h4">Submit Permit Request</Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel id="permit-type-label">Permit Type</InputLabel>
          {permit.length > 0 ? (
            <Select
              labelId="permit-type-label"
              id="permit-type-select"
              required
              variant="standard"
              value={permitType}
              onChange={handlePermitTypeChange}
              label="Permit Type"
            >
              {permit.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.permit}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Typography variant="body2">Wait...</Typography>
          )}
        </FormControl>

        <TextField
          label="Applicant Name"
          variant="standard"
          required
          fullWidth
          margin="normal"
          value={applicantName}
          onChange={(e) => setApplicantName(e.target.value)}
        />

<PhoneInput
  placeholder="Enter phone number"
  required
  defaultCountry="IN"
  value={contactNumber}
  onChange={setContactNumber}
/>
        <TextField
          label="Applicant Address"
          variant="standard"
          required
          fullWidth
          margin="normal"
          value={applicantAddress}
          onChange={(e) => setApplicantAddress(e.target.value)}
        />

        <TextField
          label="Detail"
          required
          value={reason}
          multiline
          fullWidth
          rows={3}
          onChange={(e) => setReason(e.target.value)}
          variant="standard"
        />

        <TextField
          id="event-date-start"
          label="Event Date Start"
          type="date"
          required
          fullWidth
          margin="normal"
          value={eventDateStart}
          onChange={(e) => setEventDateStart(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="event-date-end"
          label="Event Date End"
          type="date"
          required
          fullWidth
          margin="normal"
          value={eventDateEnd}
          onChange={(e) => setEventDateEnd(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />


        <div className="Button">
          <Button variant="contained" color="primary" type="submit">
            Submit Permit Request
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default PermitRequestForm;
