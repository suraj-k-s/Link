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
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import "./category.css";

const Category = () => {
  const Cat = collection(db, "Lawyer_Category");
  const [category, setCategory] = useState("");
  const [dispalyData, setDispalyData] = useState([]);


  const addCategory = async () => {
    try {
      await addDoc(Cat, {
        categoryName: category,
      });
      alert(`${category} inserted Succesfulley`);
      showCategory();
      setCategory("");

    } catch (error) {
      console.error(error);
    }
    
  };
  const showCategory = async () => {
    const data = await getDocs(Cat);
    const filtereData = data.docs.map((doc, key) => ({
      ...doc.data(),
      ID: doc.id,
    }));
    setDispalyData(filtereData);
  };

  const deleteData = async (Id) => {
    const msg = await deleteDoc(doc(Cat,Id ));
    console.log(msg);
    showCategory();


  }

  useEffect(() => {}, []);
  showCategory();

  return (
    <div className="Category">
      <div className="wrapper">
        <Typography variant="h3" className="h1">
          Category
        </Typography>
        <div className="form">
          <div className="formWrapper">
            <div className="input">
              <TextField
                id="outlined-basic"
                label=" Category name"
                required
                value = {category }
                onChange={(event) => setCategory(event.target.value)}
              />
            </div>
            <div className="btn">
              <Button
                variant="outlined"
                type="submit"
                className="btn"
                onClick={addCategory}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="table">
          <div className="tableCategory">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">id</TableCell>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dispalyData.map((row, index) => (
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{row.categoryName} </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          type="submit"
                          className="btn"
                          onClick={() => deleteData(row.ID)}
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

export default Category;
