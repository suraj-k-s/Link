import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../config/Firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import "./SubCaseType.css";

const SubCaseType = () => {
  const dbSubCase = collection(db, "SubCaseType");
  const [dispCaseCat, setDispCaseCat] = useState([]);
  const [caseCat, setCaseCat] = useState("");
  const [subCaseCat, setSubCaseCat] = useState("");
  const [dispayData, setDispayData] = useState([]);
  const [updateId, setUpdateId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (updateId) {
        const updateRef = doc(dbSubCase, updateId);
        await updateDoc(updateRef, {
          CaseCategory: caseCat,
          SubCaseCategory: subCaseCat,
        });
      } else {
        await addDoc(dbSubCase, {
          CaseCategory: caseCat,
          SubCaseCategory: subCaseCat,
        });
      }

      console.log(` ${subCaseCat} inserted`);
      console.log("success");
      setCaseCat("");
      setUpdateId("");
      setSubCaseCat("");
      showSubCaseCat();
    } catch (error) {
      console.error(error);
    }
  };

  const getCaseCat = async () => {
    const CatData = await getDocs(collection(db, "CaseType"));
    const filteredData = CatData.docs.map((doc, key) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setDispCaseCat(filteredData);
  };

  const showSubCaseCat = async () => {
    try {
      const CatData = await getDocs(collection(db, "CaseType"));
      const filteredCatData = CatData.docs.map((doc, key) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const querySnapshot = await getDocs(dbSubCase);
      const dispData = querySnapshot.docs.map((doc, key) => ({
        CategortId: doc.id,
        ...doc.data(),
      }));
      console.log(dispData);
      console.log(filteredCatData);
      const joinData = dispData
        .map((subcategory) => ({
          ...subcategory,
          CaseInfo: filteredCatData.find(
            (category) => category.id === subcategory.CaseCategory
          ),
        }))
        .filter(
          (subcategory) => subcategory.CaseInfo && subcategory.CaseInfo.id
        );

      setDispayData(joinData);
      console.log(joinData);
    } catch (error) {
      console.error(error);
    }
  };
  const Update = async (id) => {
    console.log(id);
    const docRef = doc(dbSubCase, id);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    setCaseCat(docData.CaseCategory);
    setSubCaseCat(docData.SubCaseCategory);
    console.log(docData);
    setUpdateId(id);
  };

  const Delete = async (id) => {
    console.log("Delete : " + id);
    await deleteDoc(doc(dbSubCase, id));
    showSubCaseCat();
  };

  useEffect(() => {
    getCaseCat();
    showSubCaseCat();
  }, []);

  return (
    <Box className="SubCaseType" component={"form"} onSubmit={handleSubmit}>
      <Typography variant="h3">Sub Case Type</Typography>
      <div className="form">
        <div className="formcontent">
          <div className="input">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Case Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Case Category"
                required
                onChange={(e) => setCaseCat(e.target.value)}
                value={caseCat}
              >
                {dispCaseCat.map((row, key) => (
                  <MenuItem value={row.id}>{row.CaseType}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="text">
            <TextField
              id="standard-basic"
              label="Case subcategory"
              required
              fullWidth
              value={subCaseCat}
              onChange={(e) => setSubCaseCat(e.target.value)}
              variant="standard"
            />
          </div>
          <div className="btn">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </div>

      <div className="table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right"> ID</TableCell>
                <TableCell align="right">Case Category</TableCell>
                <TableCell align="right">Sub Case Category</TableCell>
                <TableCell align="right">Action</TableCell>
                <TableCell align="right"></TableCell>
        
              </TableRow>
            </TableHead>
            <TableBody>
              {dispayData.map((row, key) => (
                <TableRow key={key}>
                 
                  <TableCell align="right">{key + 1}</TableCell>
                  <TableCell align="right">{row.CategortId}</TableCell>
                  <TableCell align="right">{row.CaseInfo.CaseType}</TableCell>
                  <TableCell align="right">{row.SubCaseCategory}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      onClick={() => Update(row.CategortId)}
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => Delete(row.CategortId)}
                      startIcon={<DeleteIcon />}
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

export default SubCaseType;
