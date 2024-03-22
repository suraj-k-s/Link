import React, { useEffect, useState } from "react";
import { db } from "../../../config/Firebase";
import { Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "./ViewCase.css";
import badge from "../../assets/images/kp-badge.png";

const ViewCase = () => {
  const { id } = useParams();
  console.log(id);
  const [caseDisp, setCaseDisp] = useState({});
  const [userData, setUserData] = useState([]);
  const [policeData, setPoliceData] = useState([]);

  const display = async () => {
    try {
      // Retrieve police complaint details
      const userData = await getDoc(doc(db, "PoliceComplaint", id));
      const filteredData = userData.data();

      // Fetch the CaseType document
      const caseTypeDoc = await getDoc(
        doc(db, "CaseType", filteredData.caseCategory)
      );
      const caseType = caseTypeDoc.data().CaseType;

      // Fetch the SubCaseType document
      const subCaseTypeDoc = await getDoc(
        doc(db, "SubCaseType", filteredData.subCaseCategory)
      );
      const subCaseCategory = subCaseTypeDoc.data().SubCaseCategory;

      // Merge the details with filteredData
      const mergedData = {
        ...filteredData,
        caseType: caseType || "",
        subCaseCategory: subCaseCategory || "",
      };

      setCaseDisp(mergedData);
      console.log(mergedData);

      // Fetch user details
      const userIdFromCollectionUser = mergedData.userId;
      const userDetailsRef = collection(db, "collection_user");
      const queryUser = query(
        userDetailsRef,
        where("user_Id", "==", userIdFromCollectionUser)
      );
      const snapshot = await getDocs(queryUser);

      if (!snapshot.empty) {
        const userDetailsDoc = snapshot.docs[0];
        const userDetails = {
          ...userDetailsDoc.data(),
          id: userDetailsDoc.id,
        };
        console.log("User details:", userDetails);
        setUserData(userDetails);
      } else {
        console.log(
          "No user found with the specified user ID:",
          userIdFromCollectionUser
        );
      }

      // Fetch police station details using pid from session
      const pid = sessionStorage.getItem("pid");
      const policeStationRef = doc(db, "police_station_collection", pid);
      const policeStationDoc = await getDoc(policeStationRef);

      if (policeStationDoc.exists()) {
        const policeStationData = policeStationDoc.data();
        console.log("Police station data:", policeStationData);
        setPoliceData(policeStationData);
      } else {
        console.log("No police station found with the specified PID:", pid);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    display();
  }, []);

  return (
    <div className="ViewCase" style={{ padding: "10px 220px" }}>
      <Typography variant="h2">Case View</Typography>

      <div className="caseVieContainer">
        <div className="CaseContainer">
          <div className="caseHeader">
            <div className="pIcon">
              <img src={badge} alt="police badge" />
            </div>
            <div className="pdetails">
              <Typography
                variant="h4"
                sx={{ fontFamily: "Times New Roman, Times, serif" }}
              >
                Kreala Police department
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontFamily: "Times New Roman, Times, serif",textAlign: "center"  }}
                
              >
                Case report
              </Typography>
              <div className="hr" sx={{ margin: "20px 0px" }}></div>
              <Typography
                variant="h6"
                sx={{ fontFamily: "Times New Roman, Times, serif" }}
              >
                {policeData.stationName}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontFamily: "Times New Roman, Times, serif" }}
              >
               Address: {policeData.address}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontFamily: "Times New Roman, Times, serif" }}
              >
                Email : {policeData.email}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontFamily: "Times New Roman, Times, serif" }}
              >
                phone : {policeData.phone}
              </Typography>
            </div>
          </div>
          <div className="hr"></div>
          <div className="caseDetails">
            <Typography
              variant="h4"
              sx={{ fontFamily: "Times New Roman, Times, serif" }}
            >
              {" "}
              Complainant{" "}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ fontFamily: "Times New Roman, Times, serif" }}
            >
              Report Filed:{" "}
              {caseDisp.timestamp
                ? new Date(caseDisp.timestamp.seconds * 1000).toDateString()
                : ""}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontFamily: "Times New Roman, Times, serif" }}
            >
              {" "}
              Name: {userData.user_name}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ fontFamily: "Times New Roman, Times, serif" }}
            >
              {" "}
              DOB: {userData.user_dob}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontFamily: "Times New Roman, Times, serif" }}
            >
              Number : {userData.user_mobile}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontFamily: "Times New Roman, Times, serif" }}
            >
              Email ID : {userData.user_email}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontFamily: "Times New Roman, Times, serif" }}
            >
              Address : {userData.user_address}
            </Typography>
            <div className="caseinfo">
              <Typography
                variant="h4"
                sx={{ fontFamily: "Times New Roman, Times, serif" }}
              >
                Case info
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: "Times New Roman, Times, serif" }}
              >
                Type: {caseDisp.caseType} - {caseDisp.subCaseCategory}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: "Times New Roman, Times, serif" }}
              >
                Description: {caseDisp.complaintDescription}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: "Times New Roman, Times, serif" }}
              >
                Attachment file:{" "}
                {caseDisp.documentURLs ? (
                  <Link to={caseDisp.documentURLs}>Click</Link>
                ) : (
                  "Not Uploaded"
                )}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCase;
