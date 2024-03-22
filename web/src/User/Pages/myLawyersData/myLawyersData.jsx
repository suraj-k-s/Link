import React, { useState, useEffect } from "react";
import { Typography, Button, Grid, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import law1 from "../../assets/icon/mylawyer.png";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../../config/Firebase";

const MyLawyersPage = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = sessionStorage.getItem("uid");
    if (uid) {
      lawyerConnection(uid);
    }
  }, []);

  const lawyerConnection = async (uid) => {
    try {
      const lawyersCollection = collection(db, "Collection_lawyer_connection");
      const querySnapshot = await getDocs(lawyersCollection);
      const lawyersList = querySnapshot.docs
        .filter((doc) => doc.data().userID === uid && doc.data().cStatus === 1)
        .map((doc) => ({
          id: doc.id,
          lawyerID: doc.data().lawyerID,
          ...doc.data(),
        }));
      console.log(lawyersList);
      

      const lawyerCollection = collection(db, "lawyer_collection");
      const lawyersDetails = [];
      for (const lawyer of lawyersList) {
        const q = query(lawyerCollection, where("userId", "==", lawyer.lawyerID));
        const querySnapshot2 = await getDocs(q);
        const lawyerDetails = querySnapshot2.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        lawyersDetails.push(...lawyerDetails);
      }
      // console.log(lawyersDetails);
      // setLawyers(lawyersDetails);


      const getSpecilisation = collection(db, "Lawyer_Category");
      const getSpecilisationSnapshot = await getDocs(getSpecilisation);
      const getSpecilisationList = getSpecilisationSnapshot.docs.map((doc) => ({
        id: doc.id,
       ...doc.data(),
      }));

      const joindata = lawyersDetails.map((item) => ({
       ...item,
        catName: getSpecilisationList.find((cat) => cat.id === item.specialization),
      }))
       .filter((item) => item.catName && item.catName.id);
       setLawyers(joindata);
       console.log(joindata);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching lawyers:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  return (
    <div className="maincontainer">
      <Typography variant="h4">My Lawyers</Typography>
      {loading ? ( // Display loading animation while data is being fetched
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {/* Display fetched lawyers data */}
          {lawyers.map((lawyer) => (
            <Grid key={lawyer.id} item xs={12} md={6} lg={4}>
              <div className="finebody">
                <div className="fineHeading">
                  <Typography variant="h6">{lawyer.full_name}</Typography>
                </div>

                <div className="fineContainer">
                  <div className="fineImg" style={{ height: "200px", overflow: "hidden" }}>
                    <img src={lawyer.profile_picture ? lawyer.profile_picture : law1} alt="fine img" style={{ width: "100%", height: "auto" }} />
                  </div>
                  <Typography variant="h6">Area : {lawyer.catName.categoryName}</Typography>
                  <Typography variant="h6">Qualification : {lawyer.qualification}</Typography>
                  <Typography variant="subtitle1">ID : {lawyer.userId}</Typography>
                  {/* <Link to={`../lawyers/${lawyer.id}`}>
                    <Typography variant="subtitle1">View Profile</Typography>
                  </Link> */}
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      )}

      <div className="add-lawyer-button">
        <Link to="../AllLawyersPage">
          <Button variant="contained" color="primary">
            Add Lawyers
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MyLawyersPage;
