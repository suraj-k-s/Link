import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
} from "@mui/material";
import styled from "styled-components";

const SearchContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CaseList = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SearchCases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Placeholder data for registered cases
  const registeredCases = [
    { id: 1, caseNumber: "C001", description: "Description for Case C001" },
    { id: 2, caseNumber: "C002", description: "Description for Case C002" },
    // Add more cases as needed
  ];

  const handleSearch = () => {

    const results = registeredCases.filter(
      (caseItem) =>
        caseItem.caseNumber.toLowerCase() === searchTerm.toLowerCase()
    );

    setSearchResults(results);
  };

  return (
    <div style={{ padding: "10px 220px" }}>
      <SearchContainer>
        <Typography variant="h4">Search Registered Cases</Typography>

        <TextField
          label="Enter Case Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </SearchContainer>

      <CaseList>
        <Typography variant="h5">Search Results</Typography>

        {searchResults.length === 0 ? (
          <Typography>No results found.</Typography>
        ) : (
          searchResults.map((caseItem) => (
            <div key={caseItem.id}>
              <Typography variant="subtitle1">{caseItem.caseNumber}</Typography>
              <Typography variant="body2">{caseItem.description}</Typography>
            
              <hr style={{ margin: "10px 0" }} />
            </div>
          ))
        )}
      </CaseList>
    </div>
  );
};

export default SearchCases;
