import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../config/Firebase";

const Permit = () => {
  const Permitdb = collection(db, "Permit");
  const [permit, setPermit] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [dispalyData, setDispalyData] = useState([]);



  const submit = async (e) => {
    e.preventDefault();
    try {
      if (selectedId) {
        const updateRef = doc(Permitdb, selectedId);
        await updateDoc(updateRef, {
          permit,
        });
        Display();
        setPermit("");
      } else {
        console.log(permit);
        await addDoc(Permitdb, {
          permit,
        });
        alert(`${permit} inserted successfully`);
        setPermit("");
        Display();
      }
    } catch (error) {
      console.error(error);
    }
  }
  

      



  const Update = async (id) => {
    console.log(id);
    const docRef = doc(Permitdb,id);
    const docSnap=await getDoc(docRef);
    const docData=docSnap.data();
    setSelectedId(id);
    setPermit(docData.permit);
  };





  useEffect(() => {
    Display();
  }, []);

  const Display = async (e) => {
    const data = await getDocs(Permitdb);
    const filtered = data.docs.map((doc, key) => ({
      ...doc.data(),
      ID: doc.id,
    }));
    setDispalyData(filtered);
  };

  const Delete = async (id) => {
    console.log(id);
 await deleteDoc(doc(Permitdb,id));
    alert("Permit deleted successfully");
Display();
  };

  return (
    <div>
      <Box className="Permit" component="form" onSubmit={submit}>
        <div className="permitContainer">
          <h1>Permit</h1>
          <TextField
            label="Permit"
            required
            value={permit}
            onChange={(e) => setPermit(e.target.value)}
          />
          <Button variant="contained" type="submit">
            {" "}
            Submit
          </Button>
        </div>
      </Box>
      <div className="dispaly"></div>
      <TableContainer component={Paper}>
        <Table sx={{ Width: 150 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">Permit</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dispalyData.map((row, index) => (
              <TableRow>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.permit} </TableCell>
                <TableCell align="center">
                  <Button variant="outlined" onClick={() => Update(row.ID)}>
                    Update
                  </Button>{" "}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <Button variant="outlined" onClick={()=>Delete(row.ID)} color="error">
                    Delete{" "}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Permit;
