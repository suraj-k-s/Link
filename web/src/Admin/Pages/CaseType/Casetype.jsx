import React, { useEffect, useState } from "react";
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
import { db } from "../../../config/Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import "./Casetype.css";

const Casetype = () => {
  const casetype = collection(db, "CaseType");
  const [caseType, setCaseType] = useState("");
  const [showCasetype, setShowCasetype] = useState([]);
  const [selectedid, setSelectedid] = useState(null);

  const insCase = async () => {
    if (selectedid) {
      const refUpdate = doc(casetype, selectedid);
      await updateDoc(refUpdate, {
        CaseType: caseType,
      });
      setSelectedid(null);
      setCaseType("");
      getData();
    } else {
      try {
        await addDoc(casetype, {
          CaseType: caseType,
        });
        alert(`${caseType} inserted `);
        getData();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const getData = async () => {
    try {
      const data = await getDocs(casetype);
      const filteredData = data.docs.map((doc, key) => ({
        ...doc.data(),
        ID: doc.id,
      }));
      console.log(filteredData);
      setShowCasetype(filteredData);
    } catch (error) {
      console.error(error);
    }
  };
  const removeData = async (id) => {
    try {
      await deleteDoc(doc(casetype, id));
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const updateCasetype = async (id) => {
    const docRef = doc(casetype, id);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    setSelectedid(id);
    setCaseType(docData.CaseType);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Casetype">
      <div className="wrapper">
        <Typography variant="h3" className="h1">
          Casetype
        </Typography>
        <div className="form">
          <div className="formWrapper">
            <div className="input">
              <TextField
                id="outlined-basic"
                label=" Casetype name"
                required
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
              />
            </div>
            <div className="btn">
              <Button
                variant="outlined"
                type="submit"
                className="btn"
                onClick={insCase}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="table">
          <div className="tableCasetype">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">id</TableCell>
                    <TableCell align="center">Casetype</TableCell>
                    <TableCell align="center">Action</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showCasetype.map((row, key) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row" align="center">
                        {key + 1}
                      </TableCell>
                      <TableCell align="center">{row.CaseType} </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          type="submit"
                          className="btn"
                          onClick={() => removeData(row.ID)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          type="submit"
                          className="btn"
                          onClick={() => updateCasetype(row.ID)}
                        >
                          Update
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

export default Casetype;
