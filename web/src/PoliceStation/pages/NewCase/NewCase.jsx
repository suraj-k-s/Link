import React, { useState, useEffect } from "react";
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
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const NewCase = () => {
  const [userId, setUserId] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [documents, setDocuments] = useState(null);
  const [showCasetypes, setShowCasetypes] = useState([]);
  const [caseCategory, setCaseCategory] = useState("");
  const [subCaseCategory, setSubCaseCategory] = useState("");
  const [showCaseCategory, setShowCaseCategory] = useState([]);
  
  const [displaySubcat, setDisplaySubcat] = useState([]);
  const [isUserIdValid, setIsUserIdValid] = useState(false);

  useEffect(() => {
    getCaseCat();
  }, [caseCategory]);

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
    if (Id) {
      setCaseCategory(Id);
    }
    try {
      const querysub = await query(
        collection(db, "SubCaseType"),
        where("CaseCategory", "==", Id || caseCategory)
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
  
  const handleFileChange = (event) => {
    setDocuments(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var documentURLs = "";
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
      const Pid = sessionStorage.getItem("pid");

      await addDoc(collection(db, "PoliceComplaint"), {
        Pid,
        userId,
        documentURLs,
        vStatus: 0,
        complaintDescription,
        caseCategory,
        subCaseCategory,
        timestamp: new Date(),
      });

      setUserId("");
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

  const handleCaseCategoryChange = async () => {
    const querySub = query(
      collection(db, "SubCaseType"),
      where("CaseCategory", "==", caseCategory)
    );
    const data = await getDocs(querySub);
    const datamapped = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDisplaySubcat(datamapped);
  };

  const handleUserIdChange = async (event) => {
    const value = event.target.value;
    setUserId(value);

    // Check if the user has entered 10 digits
    if (value.length === 10) {
      // Perform the check in the database
      const userQuery = query(
        collection(db, "collection_user"),
        where("user_Id", "==", value)
      );
      const querySnapshot = await getDocs(userQuery);
      const isExist = !querySnapshot.empty;

      // Log the result and set the isUserIdValid state
      console.log("User ID exists:", isExist);
      setIsUserIdValid(isExist);
    } else {
      setIsUserIdValid(false);
    }
  };

  const userIdFieldStyle = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: isUserIdValid ? "green" : userId.length === 10 ? "orange" : "",
      },
    },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="NewCaseContainer"
      style={{ padding: "10px 220px" }}
    >
      <div className="complaintitem">
        <Typography variant="h4">File a Police Complaint</Typography>

        <TextField
          label="User ID"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={userId}
          onChange={handleUserIdChange}
          helperText={
            userId.length === 10 && !isUserIdValid
              ? "User ID does not exist"
              : ""
          }
          error={userId.length === 10 && !isUserIdValid}
          sx={userIdFieldStyle}
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
          onChange={(e) => setComplaintDescription(e.target.value)}
        />

        <input
          style={{ display: "none" }}
          id="document-upload"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="document-upload">
          <Button
            required
            component="span"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            margin="normal"
          >
            Upload Document if any
          </Button>
        </label>
      </div>
      <div className="upload">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isUserIdValid}
        >
          File Complaint
        </Button>
      </div>
    </Box>
  );
};

export default NewCase;
