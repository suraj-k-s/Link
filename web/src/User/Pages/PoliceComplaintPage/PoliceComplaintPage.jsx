import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { db, storage } from "../../../config/Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

import "./PoliceComplaintPage.css";
import PhoneInput from "react-phone-number-input";

const PoliceComplaintPage = () => {
  const [complainantName, setComplainantName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [documents, setDocuments] = useState(null);
  const [caseCategory, setCaseCategory] = useState("");
  const [subCaseCategory, setSubCaseCategory] = useState("");
  const [showCaseCategory, setShowCaseCategory] = useState([]);
  const [displaySubcat, setDisplaySubcat] = useState([]);
  const handleFileChange = (event) => {
    setDocuments(event.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCaseCat();
      // handleCaseCategoryChange();
    };
    fetchData();
  }, []);

  const getCaseCat = async () => {
    try {
      const CaseCat = await getDocs(collection(db, "CaseType"));
      const filteredCat = CaseCat.docs.map((docs) => ({
        id: docs.id,
        ...docs.data(),
      }));
      setShowCaseCategory(filteredCat);
      getSubCat();
    } catch (error) {
      console.error("Error fetching case categories:", error.message);
    }
  };

  const getSubCat = async (Id) => {
    setCaseCategory(Id);
    try {
      const querysub = await query(
        collection(db, "SubCaseType"),
        where("CaseCategory", "==", Id)
      );
      const data = await getDocs(querysub);
      const datamapped = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDisplaySubcat(datamapped);
    } catch (error) {
      console.error("Error fetching sub-case categories:", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      var documentURLs = "";
      // Upload documents to storage
      if (documents) {
        const documentMetadata = {
          contentType: documents.type,
        };
        const fileStorageRef = ref(
          storage,
          "policeComplaintDocument/" + documents.name
        );

        await uploadBytesResumable(fileStorageRef, documents, documentMetadata);
        documentURLs = await getDownloadURL(fileStorageRef);
      }
      // Add police complaint to the database
      const Uid = sessionStorage.getItem("uid");
      const getUserID = doc(db, "collection_user",Uid);
      const userData = await getDoc(getUserID);
      const userId = userData.data().user_Id;

      await addDoc(collection(db, "PoliceComplaint"), {
        userId,
        complainantName,
        contactNumber,
        documentURLs,
        subCaseCategory,
        caseCategory,
        vStatus: 0,
        complaintDescription,
        timestamp: new Date(),
      });

      // Reset form after submission
      setComplainantName("");
      setContactNumber("");
      setComplaintDescription("");
      setDocuments(null);
      setCaseCategory("");
      setSubCaseCategory("");

      alert("Police complaint filed successfully!");
    } catch (error) {
      console.error("Error filing police complaint:", error.message);
      alert("Error filing police complaint. Please try again.");
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="PoliceComplaintContainer"
    >
      <div className="complaintitem">
        <Typography variant="h4">File a Police Complaint</Typography>

        <TextField
          label="Your Name"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={complainantName}
          onChange={(e) => setComplainantName(e.target.value)}
        />

        <PhoneInput
          placeholder="enter phone number"
          required
          defaultCountry="IN"
          value={contactNumber}
          onChange={setContactNumber}
        />

        <FormControl fullWidth>
          <InputLabel id="case-category-label">Case Category</InputLabel>
          <Select
            required
            labelId="case-category-label"
            id="case-category"
            value={caseCategory}
            label="Case Category"
            onChange={(event) => getSubCat(event.target.value)}
          >
            {showCaseCategory.map((row, key) => (
              <MenuItem key={key} value={row.id}>
                {row.CaseType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginTop: "10px" }}>
          <InputLabel id="sub-case-category-label">
            Sub Case Category
          </InputLabel>
          <Select
            required
            labelId="sub-case-category-label"
            id="sub-case-category"
            value={subCaseCategory}
            label="Sub Case Category"
            onChange={(event) => setSubCaseCategory(event.target.value)}
          >
            {displaySubcat.map((row, key) => (
              <MenuItem key={key} value={row.id}>
                {row.SubCaseCategory}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Complaint Description"
          variant="outlined"
          fullWidth
          required
          multiline
          rows={4}
          margin="normal"
          value={complaintDescription}
          onChange={(event) => setComplaintDescription(event.target.value)}
        />

        <input
          style={{ display: "none" }}
          id="document-upload"
          type="file"
          onChange={handleFileChange}
        />

        <Button variant="contained" color="primary" type="submit">
          File Complaint
        </Button>
      </div>
      <div className="upload">
        <label htmlFor="document-upload">
          <Button
            required
            component="span"
            variant="contained"
            sx={{
              width: 300,
              height: 70,
            }}
            startIcon={<CloudUploadIcon />}
            margin="normal"
          >
            Upload Document if any
          </Button>
        </label>
      </div>
    </Box>
  );
};

export default PoliceComplaintPage;
