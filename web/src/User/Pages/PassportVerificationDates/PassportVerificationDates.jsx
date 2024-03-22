import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { db } from "../../../config/Firebase";
import "../mainpadding.css"
const PassportVerificationDates = () => {
  const [verificationDates, setVerificationDates] = useState([]);

  useEffect(() => {
    // Fetch passport verification visit dates from the database
    const fetchVerificationDates = async () => {
      const verificationDatesRef = collection(db, "passport_verification_dates");
      const verificationDatesSnapshot = await getDocs(verificationDatesRef);
      const datesList = verificationDatesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVerificationDates(datesList);
    };

    fetchVerificationDates();
  }, []);

  return (
    <div className="maincontainer">
      <Typography variant="h4">Passport Verification Visit Dates</Typography>

      {verificationDates.length === 0 ? (
        <Typography>No verification dates available.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Visit Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {verificationDates.map((date) => (
                <TableRow key={date.id}>
                  <TableCell>{date.userId}</TableCell>
                  <TableCell>{date.userName}</TableCell>
                  <TableCell>{date.visitDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default PassportVerificationDates;
