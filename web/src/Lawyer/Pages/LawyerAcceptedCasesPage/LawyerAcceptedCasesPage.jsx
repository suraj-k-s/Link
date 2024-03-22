import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import "./LawyerAcceptedCasesPage.css";

const LawyerAcceptedCasesPage = () => {
  const [acceptedCases, setAcceptedCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lid = sessionStorage.getItem("lid");
    if (lid) {
      getLawyerId(lid);
    } else {
      console.log("No lawyer ID found in session storage.");
    }
  }, []);

  const getLawyerId = async (lid) => {
    try {
      const lawyerDocRef = doc(db, "lawyer_collection", lid);
      const lawyerDocSnapshot = await getDoc(lawyerDocRef);

      if (lawyerDocSnapshot.exists()) {
        const lawyerData = lawyerDocSnapshot.data();
        const userId = lawyerData.userId;
        console.log("Lawyer userId:", userId);
        fetchAcceptedCases(userId);
      } else {
        console.log("No lawyer found with ID:", lid);
      }
    } catch (error) {
      console.error("Error fetching lawyer userId:", error);
    }
  };

  const fetchAcceptedCases = async (lid) => {
    try {
      console.log(lid);
      const casesCollection = collection(db, "PoliceComplaint");
      const q = query(casesCollection, where("lawyer", "==", lid));
      const casesSnapshot = await getDocs(q);
      const acceptedCasesData = casesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const subcatIds = new Set(acceptedCasesData.map((caseItem) => caseItem.subCaseCategory));
      const subcatDocs = Array.from(subcatIds).map((subcatId) => doc(db, "SubCaseType", subcatId));
      const subcatSnapshots = await Promise.all(subcatDocs.map((subcatDoc) => getDoc(subcatDoc)));
      const subcatData = subcatSnapshots.reduce((acc, subcatSnapshot) => {
        const subcatId = subcatSnapshot.id;
        const subcat = subcatSnapshot.data();
        acc[subcatId] = subcat;
        return acc;
      }, {});

      const joinedData = acceptedCasesData.map((caseItem) => ({
        ...caseItem,
        subcategory: subcatData[caseItem.subCaseCategory] || "Unknown",
      }));

      console.log("Joined data:", joinedData);
      setAcceptedCases(joinedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching accepted cases:", error);
      setLoading(false);
    }
  };

  return (
    <div className="LawyerAcceptedCasesPage" style={{ padding: "10px 220px", paddingBottom: "50px" }}>
      <div className="Title">
        <Typography variant="h4">Assigned Cases</Typography>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : acceptedCases.length === 0 ? (
        <Typography variant="subtitle1" className="no-cases-message">No accepted cases found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {acceptedCases.map((caseItem) => (
            <Grid item xs={12} md={6} lg={4} key={caseItem.id}>
              <div className="acepted-cases">
                <div className="acepted-cases-list">
                  <Typography variant="h6">{caseItem.complainantName}</Typography>
                  <Typography variant="subtitle1">Number: {caseItem.contactNumber}</Typography>
                  <Typography variant="subtitle1">Subcategory: {caseItem.subcategory.SubCaseCategory}</Typography>
                </div>
                  <div className="cid">

                  <Typography variant="subtitle1">Case ID : {caseItem.id}</Typography>
                  </div>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default LawyerAcceptedCasesPage;
