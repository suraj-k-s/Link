import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./RegisterCaseForm.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/Firebase";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const generateCaseNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const RegisterCaseForm = () => {
  const [caseTitle, setCaseTitle] = useState("");
  const [caseType, setCaseType] = useState("");
  const [subCaseType, setSubCaseType] = useState("");
  const [caseDescription, setCaseDescription] = useState("");
  const [catData, setCatData] = useState([]); // Initialize as an empty array
  const [subCatData, setSubCatData] = useState([]);
  const [caseFile, setCaseFile] = useState(null);
  const [generatedCaseNumber, setGeneratedCaseNumber] = useState(null);

  const handleCaseTypeChange = (event) => {
    setCaseType(event.target.value);
  };
  const handleSubCaseTypeChange = (event) => {
    setSubCaseType(event.target.value);
  };

  const handleFileChange = (event) => {
    setCaseFile(event.target.files[0]);
  };

  const category = async () => {
    const category = await getDocs(collection(db, "CaseType"));
    const filteredCat = category.docs.map((doc, key) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setCatData(filteredCat);
    subCategory();
  };

  const subCategory = async () => {
    try {
      if (caseType) {
        const subCategoryCollection = collection(db, "SubCaseType");
        const q = query(
          subCategoryCollection,
          where("CaseCategory", "==", caseType)
        );
        const filteredSubCategory = await getDocs(q);

        const filteredSubCat = filteredSubCategory.docs.map((doc, key) => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log(filteredSubCat);
        setSubCatData(filteredSubCat);
      } else {
        console.error("Case Type is not set");
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSubmit = () => {
    const caseNumber = generateCaseNumber();
    setGeneratedCaseNumber(caseNumber);

    console.log("Submitting case registration form...");
    console.log("Case Number:", caseNumber);
    console.log("Case Title:", caseTitle);
    console.log("Subcase Type:", subCaseType);
    console.log("Case Description:", caseDescription);
    console.log("Case File:", caseFile);
  };

  useEffect(() => {
    category();
  }, [caseType]);

  return (
    <div className="register-case-form" style={{ padding: "10px 220px" }}>
      <Typography variant="h4">Register a Case</Typography>

      <TextField
        label="Case Title"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        onChange={(e) => setCaseTitle(e.target.value)}
      />

      <FormControl variant="outlined" fullWidth required margin="normal">
        <InputLabel id="case-type-label">Case Type</InputLabel>
        <Select
          labelId="case-type-label"
          id="case-type-select"
          value={caseType}
          onChange={handleCaseTypeChange}
          label="CaseType"
        >
          {catData.map((row, key) => (
            <MenuItem value={row.id} key={key}>
              {row.CaseType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" fullWidth required margin="normal">
        <InputLabel id="sub-category-label">Sub Category</InputLabel>
        <Select
          labelId="sub-category-label"
          id="sub-category-select"
          value={subCaseType}
          onChange={handleSubCaseTypeChange}
          label="Sub Category"
        >
          {subCatData.map((row, key) => (
            <MenuItem value={row.id} key={key}>
              {row.SubCaseCategory}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Case Description"
        variant="outlined"
        fullWidth
        required
        multiline
        rows={4}
        margin="normal"
        onChange={(e) => setCaseDescription(e.target.value)}
      />

      <input
        accept="application/pdf"
        style={{ display: "none" }}
        id="case-file-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="case-file-upload">
        <Button
          component="span"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          margin="normal"
        >
          Upload Case Documents
        </Button>
      </label>
      {caseFile && <Typography>{caseFile.name}</Typography>}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Register Case
      </Button>

      {generatedCaseNumber && (
        <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
          Your Case Number: {generatedCaseNumber}
        </Typography>
      )}

  
    </div>
  );
};

export default RegisterCaseForm;
