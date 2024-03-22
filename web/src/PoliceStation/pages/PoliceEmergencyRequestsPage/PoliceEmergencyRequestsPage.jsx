import React, { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/Firebase";


const PoliceEmergencyRequestsPage = () => {
  const [emergencyRequests, setEmergencyRequests] = useState([]);

  useEffect(() => {
    // Fetch the list of emergency requests from the database
    const fetchEmergencyRequests = async () => {
      const emergencyRequestsRef = collection(db, "emergencyRequests");
      const emergencyRequestsSnapshot = await getDocs(emergencyRequestsRef);
      const requestsList = emergencyRequestsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmergencyRequests(requestsList);
    };

    fetchEmergencyRequests();
  }, []);

  return (
    <div style={{ padding: "10px 220px" }}>
      <Typography variant="h4">Emergency Requests</Typography>

      {emergencyRequests.length > 0 ? (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Emergency Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emergencyRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.emergencyType}</TableCell>
                  <TableCell>{request.emergencyDescription}</TableCell>
                  <TableCell>{request.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="subtitle1">No emergency requests found.</Typography>
      )}
    </div>
  );
};

export default PoliceEmergencyRequestsPage;
