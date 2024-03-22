import React, { useState, useEffect } from "react";
import { Typography, List, Grid, CircularProgress } from "@mui/material";
import "./LawyerClientsPage.css";
import { Link } from "react-router-dom";
import { db } from "../../../config/Firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const LawyerClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lid = sessionStorage.getItem("lid");
    if (lid) {
      fetchClients(lid);
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
        fetchClients(userId);
      } else {
        console.log("No lawyer found with ID:", lid);
      }
    } catch (error) {
      console.error("Error fetching lawyer userId:", error);
    }
  };

  const fetchClients = async (lawyerId) => {
    try {
      const lawyerClientsQuery = query(
        collection(db, "Collection_lawyer_connection"),
        where("lawyerID", "==", lawyerId),
        where("cStatus", "==", 1)
      );
      const lawyerClientsSnapshot = await getDocs(lawyerClientsQuery);
      const clientIds = lawyerClientsSnapshot.docs.map((doc, key) => ({
        ...doc.data(),
        cid: doc.id,
      }));
      console.log("clientids:", clientIds);

      const getUsers = collection(db, "collection_user");
      const usersSnapshot = await getDocs(getUsers);
      const users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("users:", users);

      const joinData = users
        .map((user) => {
          const client = clientIds.find((client) => client.userID === user.id);
          return { ...user, client };
        })
        .filter((user) => user.client && user.client.cid);

      console.log("joinData:", joinData);
      setClients(joinData);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching clients:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  return (
    <div className="LawyerClientsPage" style={{ padding: "10px 220px" }}>
      <Typography variant="h4">Clients</Typography>
      {loading ? (
        <CircularProgress /> // Display loading animation while fetching data
      ) : clients.length > 0 ? (
        <Grid container spacing={2}>
          {clients.map((client, index) => (
            <Grid item key={index} xs={12} md={6} lg={4}>
              <List>
                <div className="clientsContainer">
                  <div className="client-list">
                    <div className="client-img">
                      <img src={client.user_photo} alt="img" />
                    </div>

                    <div className="client-detail">
                      <Typography variant="h6">{client.user_name}</Typography>

                      <Typography variant="subtitle1">
                        Phone: {client.user_mobile}
                      </Typography>
                      <Typography variant="subtitle1">
                        Email: {client.user_email}
                      </Typography>
                      <Typography variant="subtitle1">
                        Address: {client.user_address}
                      </Typography>
                    </div>
                  </div>
                </div>
              </List>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">No clients available.</Typography>
      )}
      <div className="add-client-button">
        <Link to="../ClientRequestsPage">
          <Typography variant="subtitle2">Add New Client</Typography>
        </Link>
      </div>
    </div>
  );
};

export default LawyerClientsPage;
