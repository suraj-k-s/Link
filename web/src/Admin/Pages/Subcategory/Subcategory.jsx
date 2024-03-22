import {
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
import React, { useEffect, useState } from "react";
import "../District/District.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../config/Firebase";

const Subcategory = () => {
  const Cat = collection(db, "Lawyer_Category");
  const subCat = collection(db, "lawyerSubCategory");
  const [category, setCategory] = useState("");
  const [subCatVal, setSubCatVal] = useState("");
  const [displaySubLaw, setDisplaySubLaw] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    showCategory();
    showLawyerSub();
  }, []);

  // Getting category
  const showCategory = async () => {
    const data = await getDocs(Cat);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      ID: doc.id,
    }));
    setDisplayData(filteredData);
    showLawyerSub();
  };

  const addSubCat = async () => {
    try {
      await addDoc(subCat, {
        SubCategory: subCatVal,
        Category: category,
      });
      alert(`${subCatVal} inserted successfully`);
      showLawyerSub();
      setCategory("");
      setSubCatVal("");
    } catch (error) {
      console.error(error);
    }
  };

  const showLawyerSub = async () => {
    const subLawyerData = await getDocs(subCat);
    const filteredSubLawyer = subLawyerData.docs.map((doc) => ({
      ...doc.data(),
      SubID: doc.id,
    }));
    console.log( filteredSubLawyer);

    const lawCat = await getDocs(Cat);
    const filteredLawCat = lawCat.docs.map((doc) => ({
      ...doc.data(),
      catID: doc.id,
    }));
    console.log(filteredLawCat);

    const joinData = filteredSubLawyer.map((maintable) =>
      ({
        ...maintable,
        idSubCheck: filteredLawCat.find(
          (collection) => collection.catID === maintable.Category
          ),
        })).filter(
        
        (collection) =>
        collection.idSubCheck && collection.idSubCheck.categoryName
    );
    console.log( joinData);
    setDisplaySubLaw(joinData);

  };

  // // Getting subcategory
  // const showLawyerSub = async () => {
  //   try {
  //     const subLawyerData = await getDocs(subCat);
  //     const filteredSubLawyer = subLawyerData.docs.map((doc) => ({
  //       ...doc.data(),
  //       subID: doc.id,
  //     }));
  //     console.log( filteredSubLawyer);

  //     const lawCat = await getDocs(Cat);
  //     const filteredCat = lawCat.docs.map((doc) => ({
  //       ...doc.data(),
  //       catID: doc.id,
  //     }));

  //     const joinData = filteredSubLawyer
  //     .map((subCatdat) => ({
  //       ...subCatdat,
  //       CatInfo: filteredCat.find(
  //         (catDat) => catDat.catID === subCatdat.Category
  //       ),
  //     }))
  //     .filter(
  //       (subCatdat) => subCatdat.CatInfo && subCatdat.CatInfo.categoryName
  //     )

  //     setDisplaySubLaw(joinData);
  //     console.log(joinData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // Adding data to collection

  const deleteValue = async (id) => {
    await deleteDoc(doc(subCat, id));
    showLawyerSub();
    alert("Deleted");
  };

  return (
    <div className="Subcategory">
      <div className="wrapper">
        <Typography variant="h3" className="h1">
          Subcategory
        </Typography>
        <div className="form">
          <div className="formWrapper">
            <div className="input">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={(event) => setCategory(event.target.value)}
                >
                  {displayData.map((doc) => (
                    <MenuItem key={doc.ID} value={doc.ID}>
                      {doc.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="input">
              <TextField
                id="outlined-basic"
                label="Subcategory name"
                required
                onChange={(e) => setSubCatVal(e.target.value)}
              />
            </div>

            <div className="btn">
              <Button
                variant="outlined"
                type="submit"
                onClick={addSubCat}
                className="btn"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer component={Paper} sx={{ Width: "600px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Sl .No</TableCell>
                <TableCell align="center">Lawyer Subcategory</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Action</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displaySubLaw.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.SubCategory}</TableCell>
                  <TableCell align="center">
                    {row.idSubCheck.categoryName}
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="outlined">Update</Button>
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
  );
};

export default Subcategory;
