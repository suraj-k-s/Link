// LawyerAcceptDeclineCasePage.jsx
import React, { useState } from "react";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const LawyerAcceptDeclineCasePage = () => {
  const [pendingCases, setPendingCases] = useState([
    // Assume you have a list of pending cases
    { caseId: 1, caseDetails: "Case details 1" },
    { caseId: 2, caseDetails: "Case details 2" },
    // Add more cases as needed
  ]);

  const handleAcceptCase = (caseId) => {
    // Your logic to accept the case
    // Example: acceptCase(caseId);
  };

  const handleDeclineCase = (caseId) => {
    // Your logic to decline the case
    // Example: declineCase(caseId);
  };

  return (
<div className="LawyerAcceptDeclineCasePage" style={{ padding: "10px 220px" }}>
      <Typography variant="h4">Pending Cases</Typography>

      {pendingCases.length > 0 ? (
        <List>
          {pendingCases.map((caseItem) => (
            <ListItem key={caseItem.caseId}>
              <ListItemText primary={caseItem.caseDetails} />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAcceptCase(caseItem.caseId)}
              >
                Accept Case
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeclineCase(caseItem.caseId)}
              >
                Decline Case
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No pending cases</Typography>
      )}
    </div>
  );
};

export default LawyerAcceptDeclineCasePage;
