import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import "./LawyerSearchUserPage.css";

const LawyerSearchUserPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Assume you have a function to search users based on the query
  const searchUsers = async () => {
    // Your logic to search for users based on the query
    // Example: const results = await searchUsersFromPolice(searchQuery);
    // Set the searchResults state with the fetched data
    // setSearchResults(results);
  };

  const handleSearch = () => {
    // Perform the search when the user clicks the search button
    searchUsers();
  };

  const handleRequestBackgroundCheck = (userId) => {
    // Your logic to handle the request for a background check
    // Example: requestBackgroundCheck(userId);
  };

  const handleRequestCaseDetails = (userId) => {
    // Your logic to handle the request for case details
    // Example: requestCaseDetails(userId);
  };

  return (
    <div className="LawyerSearchUserPage" style={{ padding: "10px 220px" }}>
      <Typography variant="h4">Search Users</Typography>

      <TextField
        label="Search Query"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      {searchResults.length > 0 && (
        <div>
          <Typography variant="h5">Search Results</Typography>
          <List>
            {searchResults.map((user) => (
              <ListItem key={user.userId}>
                <ListItemText primary={user.fullName} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleRequestBackgroundCheck(user.userId)}
                >
                  Request Background Check
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRequestCaseDetails(user.userId)}
                >
                  Request Case Details
                </Button>
              </ListItem>
            ))}
          </List>
        </div>
      )}
      <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
          <div className="user-container">
            <div className="user-detail">
              <Typography variant="h4">User Details</Typography>
              <Typography variant="subtitle1">Full Name : </Typography>
              <Typography variant="subtitle1">Email : </Typography>
              <Typography variant="subtitle1">
                Phone : +91 9876543210
              </Typography>
              <Typography variant="subtitle1">Address : </Typography>
              <Typography variant="subtitle1">City : </Typography>

              <Typography variant="subtitle1">State : </Typography>
              <Typography variant="subtitle1">Country : </Typography>
              <Typography variant="subtitle1">Pincode : </Typography>
              <Typography variant="subtitle1">Gender : </Typography>
              <Typography variant="subtitle1">Date of Birth : </Typography>
              <Typography variant="subtitle1">Nationality : </Typography>
              <Typography variant="subtitle1">Marital Status : </Typography>
              <Typography variant="subtitle1">Religion : </Typography>
              <Typography variant="subtitle1">Education : </Typography>
            </div>
          </div>
        </Grid><Grid item xs={12} md={6}>
          <div className="user-container">
            <div className="user-detail">
              <Typography variant="h4">User Details</Typography>
              <Typography variant="subtitle1">Full Name : </Typography>
              <Typography variant="subtitle1">Email : </Typography>
              <Typography variant="subtitle1">
                Phone : +91 9876543210
              </Typography>
              <Typography variant="subtitle1">Address : </Typography>
              <Typography variant="subtitle1">City : </Typography>

              <Typography variant="subtitle1">State : </Typography>
              <Typography variant="subtitle1">Country : </Typography>
              <Typography variant="subtitle1">Pincode : </Typography>
              <Typography variant="subtitle1">Gender : </Typography>
              <Typography variant="subtitle1">Date of Birth : </Typography>
              <Typography variant="subtitle1">Nationality : </Typography>
              <Typography variant="subtitle1">Marital Status : </Typography>
              <Typography variant="subtitle1">Religion : </Typography>
              <Typography variant="subtitle1">Education : </Typography>
            </div>
          </div>
        </Grid><Grid item xs={12} md={6}>
          <div className="user-container">
            <div className="user-detail">
              <Typography variant="h4">User Details</Typography>
              <Typography variant="subtitle1">Full Name : </Typography>
              <Typography variant="subtitle1">Email : </Typography>
              <Typography variant="subtitle1">
                Phone : +91 9876543210
              </Typography>
              <Typography variant="subtitle1">Address : </Typography>
              <Typography variant="subtitle1">City : </Typography>

              <Typography variant="subtitle1">State : </Typography>
              <Typography variant="subtitle1">Country : </Typography>
              <Typography variant="subtitle1">Pincode : </Typography>
              <Typography variant="subtitle1">Gender : </Typography>
              <Typography variant="subtitle1">Date of Birth : </Typography>
              <Typography variant="subtitle1">Nationality : </Typography>
              <Typography variant="subtitle1">Marital Status : </Typography>
              <Typography variant="subtitle1">Religion : </Typography>
              <Typography variant="subtitle1">Education : </Typography>
            </div>
          </div>
        </Grid><Grid item xs={12} md={6}>
          <div className="user-container">
            <div className="user-detail">
              <Typography variant="h4">User Details</Typography>
              <Typography variant="subtitle1">Full Name : </Typography>
              <Typography variant="subtitle1">Email : </Typography>
              <Typography variant="subtitle1">
                Phone : +91 9876543210
              </Typography>
              <Typography variant="subtitle1">Address : </Typography>
              <Typography variant="subtitle1">City : </Typography>

              <Typography variant="subtitle1">State : </Typography>
              <Typography variant="subtitle1">Country : </Typography>
              <Typography variant="subtitle1">Pincode : </Typography>
              <Typography variant="subtitle1">Gender : </Typography>
              <Typography variant="subtitle1">Date of Birth : </Typography>
              <Typography variant="subtitle1">Nationality : </Typography>
              <Typography variant="subtitle1">Marital Status : </Typography>
              <Typography variant="subtitle1">Religion : </Typography>
              <Typography variant="subtitle1">Education : </Typography>
            </div>
          </div>
        </Grid><Grid item xs={12} md={6}>
          <div className="user-container">
            <div className="user-detail">
              <Typography variant="h4">User Details</Typography>
              <Typography variant="subtitle1">Full Name : </Typography>
              <Typography variant="subtitle1">Email : </Typography>
              <Typography variant="subtitle1">
                Phone : +91 9876543210
              </Typography>
              <Typography variant="subtitle1">Address : </Typography>
              <Typography variant="subtitle1">City : </Typography>

              <Typography variant="subtitle1">State : </Typography>
              <Typography variant="subtitle1">Country : </Typography>
              <Typography variant="subtitle1">Pincode : </Typography>
              <Typography variant="subtitle1">Gender : </Typography>
              <Typography variant="subtitle1">Date of Birth : </Typography>
              <Typography variant="subtitle1">Nationality : </Typography>
              <Typography variant="subtitle1">Marital Status : </Typography>
              <Typography variant="subtitle1">Religion : </Typography>
              <Typography variant="subtitle1">Education : </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LawyerSearchUserPage;
