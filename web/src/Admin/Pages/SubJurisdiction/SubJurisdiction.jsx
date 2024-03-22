import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../Jurisdiction/Jurisdiction.css";
import {
  
  collection,
  
  getDoc,
  getDocs,
 
} from "firebase/firestore";
import { db } from "../../../config/Firebase";
const SubJurisdiction = () => {
  const dbJur = collection(db, "Jurisdiction");

  const getJurisdiction = async () => {
    const jursdictionData = await getDocs(dbJur);
    const filterdJurisdictionData = jursdictionData.docs.map((data) => ({
      ...data.data(),
      jurID: data.id,
    }));
    console.log(filterdJurisdictionData);
  };
  useEffect(() => {
    getJurisdiction();
  }, []);

  return (
    <div className="SubJurisdiction">
      <div className="wrapper">
        <div className="h1">
          <Typography variant="h3">SubJurisdiction</Typography>
        </div>

        <div className="form">
          <div className="formWrapper">
            <div className="input">
              <TextField
                id="outlined-basic"
                label="Name of the SubJurisdiction"
                required
              />
              <div className="btn">
                <Button variant="outlined" type="submit" className="btn">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="table">
          <div className="tableCategory">
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Index</TableCell>
                    <TableCell align="center">SubJurisdiction</TableCell>
                    <TableCell align="center">Action</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row"></TableCell>
                    <TableCell align="center"> sub </TableCell>
                    <TableCell align="center">
                      <Button variant="outlined">Update</Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="outlined">Delete</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubJurisdiction;
