import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import { Link } from "react-router-dom";

const SearchUserPage = () => {
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const searchUser = async () => {
    try {
      setLoading(true);
      const userDocRef = collection(db, "collection_user");
      const q = query(userDocRef, where("user_Id", "==", userId));
      const userDocSnapshot = await getDocs(q);

      const userDetail = userDocSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(userDetail);
      setUserDetails(userDetail);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId.length === 10) {
      searchUser();
    }
  }, [userId]);

  return (
    <div className="SearchUserPage" style={{ padding: "10px 220px" }}>
      <div className="heading">
        <Typography variant="h3">Search User</Typography>
      </div>
      <div className="search">
        <TextField
          label="User ID"
          variant="outlined"
          type="number"
          value={userId}
          onChange={handleUserIdChange}
        />
        
      </div>
      <div className="hr"></div>
      <div className="detail">
        {loading && <CircularProgress />}
        {!loading && userDetails.length === 0 && (
          <Typography variant="body1">User Details</Typography>
        )}
        {!loading &&
          userDetails.length > 0 &&
          userDetails.map((user) => (
            <div className="card" key={user.id}>
              <div className="user">
                <div className="details">
                <img src={user.user_photo} alt="Profile" style={{ height  : "3  00px"}} />

                  <Typography variant="h5">{user.user_name}</Typography>
                  <Typography variant="h6">{user.user_dob}</Typography>
                  <Typography variant="h6">{user.user_address}</Typography>
                  <Typography variant="h6">{user.user_mobile}</Typography>
                  <Typography variant="h6">{user.user_email}</Typography>
                  <Typography variant="h6">{user.user_gender}</Typography>
                  
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchUserPage;
