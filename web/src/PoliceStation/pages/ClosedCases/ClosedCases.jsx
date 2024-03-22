import React, { useState } from "react";
import { TextField, Typography, List, ListItem, ListItemText, ListItemIcon, InputAdornment, IconButton, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const ClosedCases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [closedCases, setClosedCases] = useState([
    { id: 1, caseNumber: "C123", description: "Lorem ipsum dolor sit amet." },
    { id: 2, caseNumber: "C124", description: "Consectetur adipiscing elit." },
    { id: 3, caseNumber: "C125", description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    // Add more closed cases as needed
  ]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Perform search logic here if needed
  };

  const clearSearch = () => {
    setSearchQuery("");
    // Clear search logic here if needed
  };

  return (
    <div className="closedCases" style={{padding : "20px 220px"}}>
      <Typography variant="h4">Closed Cases</Typography>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder="Search cases"
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {searchQuery && (
                <IconButton onClick={clearSearch}>
                  <CloseIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      <List>
        {closedCases.map((caseItem) => (
          <React.Fragment key={caseItem.id}>
            <ListItem>
              <ListItemText primary={caseItem.caseNumber} secondary={caseItem.description} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default ClosedCases;
