// UserRequestLawyerPage.jsx
import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
} from "@mui/material";

const UserRequestLawyerPage = () => {
  const [caseDetails, setCaseDetails] = useState("");

  const handleRequestLawyer = () => {
    // Your logic to send a request to the lawyer
    // Example: requestLawyer(caseDetails);
  };

  return (
    <div className="UserRequestLawyerPage">
      <Typography variant="h4">Request a Lawyer</Typography>

      <TextField
        label="Case Details"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={caseDetails}
        onChange={(e) => setCaseDetails(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={handleRequestLawyer}>
        Request Lawyer
      </Button>
    </div>
  );
};

export default UserRequestLawyerPage;
