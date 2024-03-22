import React from "react";
import "./Home.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { Route, Routes } from "react-router-dom";
import Test from "../Test/Test";
import Category from "../Category/Category";
import Casetype from "../CaseType/Casetype";
import District from "../District/District";
import Jurisdiction from "../Jurisdiction/Jurisdiction";
import SubJurisdiction from "../SubJurisdiction/SubJurisdiction";
import Place from "../Place/Place";
import Subcategory from "../Subcategory/Subcategory";
import FileUplaod from "../FileUpload/FileUplaod";

const Home = () => {
  return (
    <div className="Home">
      <div className="Container">
      
        <div className="content">
          <Routes>
            
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
