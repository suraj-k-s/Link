import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import "./ExistingCase.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ExistingCase = () => {
  const [caseDisp, setCaseDisp] = useState([]);

  const display = async () => {
    const data = await getDocs(collection(db, "PoliceComplaint"));
    const filteredData = data.docs.map((doc, key) => ({
      ...doc.data(),
      id: doc.id,
      timestamp: doc.data().timestamp.toDate(), // Convert timestamp to JavaScript Date object
    }));
    console.log(filteredData);
    // Sort the data by timestamp in descending order
    const sortedData = filteredData.sort((a, b) => b.timestamp - a.timestamp);
    // setCaseDisp(sortedData);

    const UserData = collection(db, "collection_user");
    const UserDataSnapshot = await getDocs(UserData);
    const UserDataList = UserDataSnapshot.docs.map((doc, key) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(UserDataList);

    const joindata = sortedData
      .map((item) => ({
        ...item,
        userID: UserDataList.find((user) => user.user_Id === item.userId),
      }))
      .filter((item) => item.userID && item.userID.id);
      console.log(joindata);
      setCaseDisp(joindata);
  };

  useEffect(() => {
    display();
  }, []);

  return (
    <div className="ExistingCase">
      <h1>Existing Case</h1>
      <div className="caseContainer">
        {caseDisp.map((row, key) => (
          <div className="case" key={key}>
            <div className="name">Complaint Name: {row.userID.user_name}</div>
            <div className="description">
              Description: {row.complaintDescription}
            </div>
            <div className="date">
              Complaint Date: {row.timestamp.toDateString()}
            </div>
            <div className="viewbtn">
              <Link to={`../ViewCase/${row.id}`}>
                <Button variant="contained">View</Button>
              </Link>
              <div className="cStatus"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExistingCase;
