import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import "./FineUser.css";

const FineUser = () => {
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [finedUserId, setFinedUserId] = useState("");
  const [fineAmount, setFineAmount] = useState(""); // State for fine amount

  const fetchUserDetails = async (id) => {
    try {
      setLoading(true);
      const userDocRef = collection(db, "collection_user");
      const uquery = query(userDocRef, where("user_Id", "==", id));
      const userDocSnapshot = await getDocs(uquery);

      const userDetail = userDocSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserDetails(userDetail);
      console.log(userDetail);

    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserIdChange = (e) => {
    const value = e.target.value;
    setUserId(value);
    setUserDetails([]); // Clear userDetails when the user ID is changed
    if (value.length === 10) {
      fetchUserDetails(value);
    }
  };
  

  const addFine = async (id) => {
    setFinedUserId(id);
    const fines = collection(db, "fine_types");
    const fineDetails = await getDocs(fines);
    const filteredFine = fineDetails.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setFines(filteredFine);
    console.log(filteredFine);
    setShowDropdown(true);
  };

  const SubmitFine = async () => {
    if (!selectedOption || !fineAmount) {
      alert("Please select Type and enter Fine Amount");
      return;
    }

    console.log(finedUserId);
    console.log(selectedOption);
    console.log(fineAmount);
    const pid = sessionStorage.getItem("pid");
    setUserDetails([]);
    const confirmed = window.confirm(
      "Are you sure you want to confirm this fine?"
    );
    if (confirmed) {
      const addFine = collection(db, "collection_UserFine");
      await addDoc(addFine, {
        UserID: finedUserId,
        category: selectedOption,
        fineAmount,
        pid,
        timestamp: serverTimestamp(),
      });

      console.log("submitted fine");
      setFineAmount("");
      setSelectedOption("");
      setUserId("");
      window.location.reload();
    } else {
      console.log("canceled fine");
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFineAmountChange = (event) => {
    setFineAmount(event.target.value);
  };

  return (
    <div className="FineUser" style={{ padding: "10px 220px" }}>
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
            <div className="card">
              <div key={user.id} className="user">
                <div className="image">
                  {user.user_photo && (
                    <img src={user.user_photo} alt="error loading profile" />
                  )}
                  {!user.user_photo && <div>No photo available</div>}
                </div>
                <div className="details">
                  <Typography variant="h5">{user.user_name}</Typography>
                  <Typography variant="h6">{user.user_dob}</Typography>
                  <Typography variant="h6">{user.user_address}</Typography>
                  <Typography variant="h6">{user.user_mobile}</Typography>
                  <Typography variant="h6">{user.user_email}</Typography>
                  <Typography variant="h6">{user.user_gender}</Typography>
                  <div className="fine_btn">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => addFine(user.id)}
                    >
                      Fine
                    </Button>
                  </div>
                  {showDropdown && (
                    <>
                      <div className="fields">
                        <FormControl fullWidth>
                          <InputLabel id="fineCat">Fine Category</InputLabel>
                          <Select
                            labelId="fineCat"
                            id="demo-simple-select"
                            value={selectedOption}
                            onChange={handleDropdownChange}
                            label="FineType"
                            required
                          >
                            {fines.map((doc, key) => (
                              <MenuItem value={doc.id}>{doc.fineType}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>

                      <div className="fields">
                        <TextField
                          fullWidth
                          label="Fine Amount"
                          required
                          className="Fineinput"
                          variant="outlined"
                          type="number"
                          value={fineAmount}
                          onChange={handleFineAmountChange}
                        />
                        <div className="fine_btn"></div>
                        <Button
                          variant="contained"
                          className="fine_btn"
                          color="success"
                          onClick={SubmitFine}
                        >
                          Confirm
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FineUser;
