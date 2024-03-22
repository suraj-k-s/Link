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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./District.css";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config/Firebase";

const District = () => {
  const [district, setDistrict] = useState("");
  const [showdistrict, setShowDistrict] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const dist = collection(db, "districts");

  const addDistrict = async (e) => {
    e.preventDefault();
    if (selectedId) {
      const upadteRef = doc(dist, selectedId);
      await updateDoc(upadteRef, {
        district: district,
      });
      fetchData();
      setDistrict("");
    
    } else {
      const docRef = await addDoc(collection(db, "districts"), {
        district,
      });
      fetchData();
      setDistrict("");
      console.log("Document written with ID: ", docRef.id);
    }
    setSelectedId(null);

  };

  const UpdateData = async (id) => {
    const docRef = doc(dist, id);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    setSelectedId(id);
    setDistrict("");
  
    setDistrict(docData.district);
    console.log(docData);
  };

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "districts"));
    const data = querySnapshot.docs.map((doc, key) => ({
      id: key + 1,
      districtId: doc.id,
      ...doc.data(),
    }));
    setShowDistrict(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = async (id) => {
    try {
      await deleteDoc(doc(dist, id));
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className="District" component={"form"} on onSubmit={addDistrict}> 
      <div className="wrapper">
        <Typography variant="h3" className="h1">
          District
        </Typography>
        <div className="form">
          <div className="formWrapper">
            <div className="input">
              <TextField
                id="outlined-basic"
                label="Name of the district"
                value={district}
                required
                onChange={(event) => setDistrict(event.target.value)}
              />
            </div>
            <div className="btn">
              <Button
                variant="outlined"
                type="submit"
                className="btn"
                
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer component={Paper} sx={{ width: "600px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sl .No</TableCell>
                <TableCell>District</TableCell>
                <TableCell align="center">Action</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showdistrict.map((doc, key) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={key}
                >
                  <TableCell component="th" scope="row">
                    {doc.id}
                  </TableCell>
                  <TableCell>{doc.district}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => UpdateData(doc.districtId)}
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => deleteData(doc.districtId)}
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
    </Box>
  );
};

export default District;
