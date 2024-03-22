import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import "./case.css"
const CaseDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [caseDetails, setCaseDetails] = useState(null);
  const [selectedLawyer, setSelectedLawyer] = useState("");
  const [lawyers, setLawyers] = useState([]);
  const [joindata, setJoindata] = useState([]); // State to store joined data
  const [lawyer, setLawyer] = useState(null); // State to store joined data
  const { id } = useParams();

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const caseRef = doc(db, "PoliceComplaint", id);
        const caseSnapshot = await getDoc(caseRef);
        
        if (caseSnapshot.exists()) {
          setCaseDetails({ id: caseSnapshot.id, ...caseSnapshot.data() });

          console.log("Case Details:", caseSnapshot.data());
          fetchLawyer(caseSnapshot.data().lawyer);
        } else {
          console.log("No such case found!");
        }
      } catch (error) {
        console.error("Error fetching case details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [id]);

  const fetchLawyer = async (lid) => {
    if (lid) {
      try {
        const lawyerQuery = query(collection(db, "lawyer_collection"), where("userId", "==", lid));
        const lawyerSnapshot = await getDocs(lawyerQuery);
        
        if (!lawyerSnapshot.empty) {
          const lawyerDoc = lawyerSnapshot.docs[0];
          setLawyer(lawyerDoc.data());
          console.log("Lawyer Details:", lawyerDoc.data());
        } else {
          setLawyer(null);
        }
      } catch (error) {
        console.error("Error fetching lawyer:", error.message);
      }
    } else {
      setLawyer(null);
    }
  };

  const lawyerConnection = async (uid) => {
    try {
      const lawyersCollection = collection(db, "Collection_lawyer_connection");
      const querySnapshot = await getDocs(lawyersCollection);
      const lawyersList = querySnapshot.docs
        .filter((doc) => doc.data().userID === uid)
        .map((doc) => ({
          id: doc.id,
          lawyerID: doc.data().lawyerID,
        }));

      const lawyerCollection = collection(db, "lawyer_collection");
      const lawyersDetails = [];

      for (const lawyer of lawyersList) {
        const q = where(lawyerCollection, "userId", "==", lawyer.lawyerID);
        const querySnapshot2 = await getDocs(q);
        const lawyerDetails = querySnapshot2.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        lawyersDetails.push(...lawyerDetails);
      }

     
      
      
            setLawyers(lawyersDetails);
      console.log("Joined Data:", joindata);
      console.log("Lawyers Details:", lawyersDetails);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogLawyer = async () => {
    try {
      const upadtedb = doc(db, "PoliceComplaint", id);
      await updateDoc(upadtedb, { lawyer: selectedLawyer });
      console.log("Lawyer updated successfully!");
    } catch (error) {
      console.error("Error updating lawyer:", error);
    }
  };
  
  return (
    <div className="details-container" style={{ padding: "10px 220px" }}>
      <Typography variant="h4" sx={{padding:"10px"}}>Case Details</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        caseDetails && (
          <div sx={{display: "flex", flexDirection: "column"}}>

          
            <div className="heading-case">

            <Typography variant="h5">Case ID: {caseDetails.id}</Typography>
            </div>
          <div className="case-details">
            <Typography variant="subtitle1">Complainant Name: {caseDetails.complainantName}</Typography>
            <Typography variant="subtitle1">Contact Number: {caseDetails.contactNumber}</Typography>
            <Typography variant="subtitle1">Complaint Description: {caseDetails.complaintDescription}</Typography>
            {caseDetails.lawyer ? (
              <div>
                <Typography variant="subtitle1">Lawyer: {caseDetails.lawyer}</Typography>
                {lawyer && (
                  <div>
                    <div className="hr"></div>
                    <Typography variant="h6" sx={{padding:"10px"}}>Lawyer Details</Typography>
                    <img src={lawyer.profile_picture} alt="Lawyer Profile" style={{ width: "150px"}} />
                    <Typography variant="subtitle1">Name: {lawyer.full_name}</Typography>
                    <Typography variant="subtitle1">Email: {lawyer.email}</Typography>
                    <Typography variant="subtitle1">Mobile: {lawyer.mobile}</Typography>
                    <Typography variant="subtitle1">Address: {lawyer.address}</Typography>
                    <Typography variant="subtitle1">Qualification: {lawyer.qualification}</Typography>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Button variant="outlined" color="primary" onClick={() => lawyerConnection(sessionStorage.getItem("uid"))}>Add Lawyer</Button>
                {lawyers.length > 0 && (
                  <div>
                    <FormControl>
                      <InputLabel id="lawyer-select-label">Select Lawyer</InputLabel>
                      <Select
                        labelId="lawyer-select-label"
                        id="lawyer-select"
                        value={selectedLawyer}
                        label="Lawyer"
                        onChange={(e) => setSelectedLawyer(e.target.value)}
                      >
                        {lawyers.map((lawyer) => (
                          <MenuItem key={lawyer.id} value={lawyer.userId}>
                            {lawyer.full_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button variant="outlined" color="primary" onClick={handleLogLawyer}>Submit</Button>
                  </div>
                )}
              </div>
            )}
          </div>
      </div>
        )
      )}
    </div>
  );
};

export default CaseDetailsPage;
