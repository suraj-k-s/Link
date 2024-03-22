import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, CircularProgress } from "@mui/material"; // Import CircularProgress for loading animation
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../config/Firebase";
import law1 from "../../assets/icon/mylawyer.png";

const AllLawyersPage = () => {
  const [lawyers, setLawyers] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [loading, setLoading] = useState(true); // State variable for loading

  useEffect(() => {
    allLawyers();
    getUserRequests();
  }, []);

  const allLawyers = async () => {
    try {
      const lawyersCollection = collection(db, "lawyer_collection");
      const lawyersSnapshot = await getDocs(lawyersCollection);
      const lawyersList = lawyersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      const getSpecilisation = collection(db, "Lawyer_Category");
      const getSpecilisationSnapshot = await getDocs(getSpecilisation);
      const getSpecilisationList = getSpecilisationSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      const joindata = lawyersList.map((item) =>({
        ...item,
        catName:getSpecilisationList.find((cat)=> cat.id === item.specialization),
      }) )
      .filter((item)=>item.catName && item.catName.id)
      
      setLawyers(joindata);
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      console.log(err);
    }
  };

  const getUserRequests = async () => {
    try {
      const userId = sessionStorage.getItem("uid");
      const q = query(
        collection(db, "Collection_lawyer_connection"),
        where("userID", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const userRequestsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserRequests(userRequestsData);
    } catch (error) {
      console.error("Error fetching user requests:", error);
    }
  };

  const handleRequest = async (lawyerId) => {
    try {
      const userId = sessionStorage.getItem("uid");
      const existingRequest = userRequests.find(
        (request) => request.lawyerID === lawyerId
      );

      if (existingRequest) {
        alert("You have already sent a request to this lawyer.");
        return;
      }

      await addDoc(collection(db, "Collection_lawyer_connection"), {
        userID: userId,
        lawyerID: lawyerId,
        cStatus: 0,
      });

      alert("Request sent successfully!");
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const handleCancelRequest = async (lawyerId) => {
    try {
      const userId = sessionStorage.getItem("uid");
      const existingRequest = userRequests.find(
        (request) => request.lawyerID === lawyerId
      );

      if (!existingRequest) {
        alert("No request found to cancel.");
        return;
      }

      const q = query(
        collection(db, "Collection_lawyer_connection"),
        where("userID", "==", userId),
        where("lawyerID", "==", lawyerId)
      );
      const querySnapshot = await getDocs(q);
      const requestId = querySnapshot.docs[0].id;
      await deleteDoc(doc(db, "Collection_lawyer_connection", requestId));
      alert("Request cancelled successfully!");
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error cancelling request:", error);
    }
  };

  return (
    <div className="maincontainer">
      <Typography variant="h4">All Lawyers</Typography>
      {loading ? ( // Show loading animation if data is being fetched
        <CircularProgress />
      ) : lawyers.length > 0 ? (
        <Grid container spacing={2}>
          {lawyers.map((lawyer, index) => (
            <Grid item key={index} xs={12} md={6} lg={4}>
              <div className="finebody">
                <div className="fineHeading">
                  <Typography variant="h6">{lawyer.full_name}</Typography>
                </div>
                <div className="fineContainer">
                  <div className="fineImg">
                    {lawyer.profile_picture ? (
                      <img
                        src={lawyer.profile_picture}
                        style={{ maxHeight: "150px", objectFit: "cover" }}
                        alt="Lawyer Profile"
                      />
                    ) : (
                      <img src={law1} alt="Fine img" />
                    )}
                  </div>
                  <Typography variant="h6">
                    Specialization: {lawyer.catName.categoryName}
                  </Typography>
                  <Typography variant="subtitle1">
                    Qualification : {lawyer.qualification}
                  </Typography>
                  <Typography variant="subtitle1">
                    ID: {lawyer.userId}
                  </Typography>
                  {userRequests.some(
                    (request) => request.lawyerID === lawyer.userId
                  ) ? (
                    userRequests.map((request) => {
                      if (
                        request.lawyerID === lawyer.userId &&
                        request.cStatus === 1
                      ) {
                        return (
                          <Button variant="contained" color="primary" disabled>
                            Accepted
                          </Button>
                        );
                      } else if (request.lawyerID === lawyer.userId) {
                        return (
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleCancelRequest(lawyer.userId)}
                          >
                            Cancel Request
                          </Button>
                        );
                      }
                    })
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleRequest(lawyer.userId)}
                    >
                      Request
                    </Button>
                  )}
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">....</Typography>
      )}
    </div>
  );
};

export default AllLawyersPage;
