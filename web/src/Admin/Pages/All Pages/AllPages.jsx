import React from 'react';
import { Link } from 'react-router-dom';

const AllPages = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>All Pages</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        <Link to="./Category" style={cardStyle}>Category</Link>
        <Link to="./CaseType" style={cardStyle}>Case Type</Link>
        <Link to="./District" style={cardStyle}>District</Link>
        <Link to="./Jurisdiction" style={cardStyle}>Jurisdiction</Link>
        <Link to="./Place" style={cardStyle}>Place</Link>
        <Link to="./Subcategory" style={cardStyle}>Subcategory</Link>
        <Link to="./Subjr" style={cardStyle}>Sub Jurisdiction</Link>
        <Link to="./File" style={cardStyle}>File Upload</Link>
        <Link to="./Permit" style={cardStyle}>Permit</Link>
        <Link to="./SubCaseType" style={cardStyle}>Sub Case Type</Link>
        <Link to="./UpdatePoliceLocation" style={cardStyle}>Update Police Location</Link>
        <Link to="./UserList" style={cardStyle}>User List</Link>
        <Link to="./FineType" style={cardStyle}>Fine Type</Link>  
        <Link to="https://console.firebase.google.com/u/0/project/possible-bee-405407/firestore/data/~2FCaseType~2F5yiTnQRJmdgpUK4N6Xhm" style={cardStyle}>Firebase DB</Link>  
        <Link to="https://console.firebase.google.com/u/0/project/possible-bee-405407/authentication/users" style={cardStyle}>Firebase-Uer</Link>

      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#f0f0f0',
  padding: '20px',
  textAlign: 'center',
  textDecoration: 'none',
  color: '#333',
  borderRadius: '8px',
  width: '300px', // Adjust width as needed
};

export default AllPages;
