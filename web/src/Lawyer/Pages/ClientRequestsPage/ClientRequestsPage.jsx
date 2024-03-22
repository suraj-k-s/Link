import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, CircularProgress } from "@mui/material";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../config/Firebase";

const ClientRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    getClientRequests();
  }, []);

  useEffect(() => {
    if (userId) {
      getClientRequests(userId);
    }
  }, [userId]);

  useEffect(() => {
    const lid = sessionStorage.getItem("lid");
    getUserId(lid);
  }, []);

  const getUserId = async (lid) => {
    try {
      const docRef = doc(db, "lawyer_collection", lid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userId = userData.userId;
        setUserId(userId);
        console.log("userId:", userId);
        getClientRequests();
      } else {
        console.log("No such document exists!");
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  const getClientRequests = async (userId) => {
    try {
      const q = query(
        collection(db, "Collection_lawyer_connection"),
        where("lawyerID", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const requestsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const userDeatil = collection(db, "collection_user");
      const userData = await getDocs(userDeatil);
      const userDetailData = userData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("userDetailData:", userDetailData);
      const joinData = requestsData.map((doc) => ({
        ...doc,
        userDetail: userDetailData.find((user) => user.id === doc.userID),
      }));

      console.log("joinData:", joinData);
      setRequests(joinData);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching client requests:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await updateDoc(doc(db, "Collection_lawyer_connection", requestId), {
        cStatus: 1,
      });
      console.log("Request accepted successfully!");
      getClientRequests(userId); // Refresh requests after accept
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await deleteDoc(doc(db, "Collection_lawyer_connection", requestId));
      console.log("Request rejected successfully!");
      getClientRequests(userId); // Refresh requests after reject
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="maincontainer">
      <Typography variant="h4">Client Requests</Typography>
      {loading ? ( // Show loading indicator while fetching data
        <CircularProgress />
      ) : requests.length > 0 ? (
        <Grid container spacing={2}>
          {requests.map((request) => (
            <Grid item key={request.id} xs={12} md={6} lg={4}>
              <div className="finebody">
                <div className="fineHeading">
                  <Typography variant="subtitle1">
                    Client ID: {request.userDetail.user_Id}
                  </Typography>
                </div>
                <div className="fineContainer">
                  <img src={request.userDetail.user_photo} alt="user Profile" style={{ height: "150px"}} />                  
                  <Typography variant="subtitle1">
                    Name: {request.userDetail.user_name}
                  </Typography>
                  
                  <Typography variant="subtitle1">
                    Name: {request.userDetail.user_email}
                  </Typography>
                  <Typography variant="subtitle1">
                    Status: {request.cStatus === 0 ? "Pending" : "Accepted"}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAcceptRequest(request.id)}
                    disabled={request.cStatus === 1}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRejectRequest(request.id)}
                    disabled={request.cStatus === 1}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">No requests found</Typography>
      )}
    </div>
  );
};

export default ClientRequestsPage;
