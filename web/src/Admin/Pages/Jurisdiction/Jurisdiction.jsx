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
import "./Jurisdiction.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config/Firebase";
const Jurisdiction = () => {
  const jur = collection(db, "Jurisdiction");
  const [jurisdictionValue, setJurisdictionValue] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [dispalayData, setDispayData] = useState([]);

  useEffect(() => {
    showJurisdiction();
  }, []);

  const submitJurisdiction = async () => {
    if (selectedId) {
      const washingtonRef = doc(jur, selectedId);

      await updateDoc(washingtonRef, {
        Jurisdiction: jurisdictionValue,
      });
      showJurisdiction();
      setSelectedId(null);
    } else {
      try {
        await addDoc(jur, {
          Jurisdiction: jurisdictionValue,
        });
        alert(`${jurisdictionValue} Inserted succesfulley `);
        setJurisdictionValue("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const showJurisdiction = async () => {
    try {
      const data = await getDocs(jur);
      const filteredData = data.docs.map((doc, key) => ({
        ...doc.data(),
        ID: doc.id,
      }));
      setDispayData(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteValue = async (id) => {
    try {
      console.log(id);
      const msg = await deleteDoc(doc(jur, id));
      showJurisdiction();
      console.log(msg);
    } catch (error) {
      console.error(error);
    }
  };

  const selectDoc = async (Id) => {
    const docRef = doc(jur, Id);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    setSelectedId(Id);
    setJurisdictionValue(docData.Jurisdiction);
  };
  return (
    <div className="Jurisdiction">
      <div className="wrapper">
        <div className="h1">
          <Typography variant="h3">Jurisdiction</Typography>
        </div>

        <div className="form">
          <div className="formWrapper">
            <div className="input">
              <TextField
                id="outlined-basic"
                label="Name of the Jurisdiction"
                value={jurisdictionValue}
                onChange={(e) => setJurisdictionValue(e.target.value)}
                required
              />
              <div className="btn">
                <Button
                  variant="outlined"
                  type="submit"
                  className="btn"
                  onClick={submitJurisdiction}
                >
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
                    <TableCell align="center">Jurisdiction</TableCell>
                    <TableCell align="center">Action</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dispalayData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center"> {row.Jurisdiction} </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          onClick={() => selectDoc(row.ID)}
                        >
                          Update
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          onClick={() => deleteValue(row.ID)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jurisdiction;
