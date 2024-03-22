import React from "react";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Test from "./Pages/Test/Test";


import District from "./Pages/District/District";
import Category from "./Pages/Category/Category";
import Jurisdiction from "./Pages/Jurisdiction/Jurisdiction";
import Subcategory from "./Pages/Subcategory/Subcategory";
import SubJurisdiction from "./Pages/SubJurisdiction/SubJurisdiction";
import FileUplaod from "./Pages/FileUpload/FileUplaod";
import Topbar from "./Components/Topbar/Topbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css"
import Casetype from "./Pages/CaseType/Casetype";
import Place from "./Pages/Place/Place";
import Permit from "./Pages/Permit/Permit";
import SubCaseType from "./Pages/SubCaseType/SubCaseType";
import UpdatePoliceLocation from "./Pages/UpdatePoliceLocation/UpdatePoliceLocation";
// import UserList from "./Pages/UserList/UserList";
import UserManagementPage from "./Pages/UserList/UserList";
import FineType from "./Pages/FineType/FineType";
import AllPages from "./Pages/All Pages/AllPages";


const App = () => {
  return (
    <div className="App">
    <div className="Container"> 

  
  <Topbar />
  <div className="content">
      <Routes>
  
        
     
            <Route path="/Category" element={<Category />} />
            <Route path="/CaseType" element={<Casetype />} />
            <Route path="/District" element={<District />} />
            <Route path="/Jurisdiction" element={<Jurisdiction />} />
            <Route path="/Place" element={<Place  />} />
            <Route path="/Subcategory" element={<Subcategory />} />
            <Route path="/Subjr" element={<SubJurisdiction />} />
            <Route path="/File" element={<FileUplaod />} />
            <Route path="/Permit" element={<Permit />} />
            <Route path="/SubCaseType" element={<SubCaseType />} />
            <Route path="/UpdatePoliceLocation" element={<UpdatePoliceLocation />} />
            <Route path="/UserList" element={<UserManagementPage />} />
            <Route path="/FineType" element={<FineType />} />
            <Route path="/" element={<AllPages />} />
            
            
      </Routes>
    </div>
    </div>

    <Sidebar />
  
    </div>
  );
};

export default App;
