import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./PolicePage.css";
import img1 from "../../assets/icon/missing.png";
import img2 from "../../assets/icon/fileCase.png";
import img3 from "../../assets/icon/permit.png";
import img4 from "../../assets/icon/pasport.png";
import img5 from "../../assets/icon/policeStation.png";
import img6 from "../../assets/icon/alert-em.png";

const PolicePage = () => {
  return (
    <div className="PolicePage">
      <div className="PolicePageTitle">
        <Typography variant="h4">Police Services</Typography>
      </div>
      <div className="policePagecontent">
        <div className="service">
        <Link to ="../ReportMissingPersonPage">


          <div className="card-client">
            <div className="Service-picture">
              <img src={img1} alt="" />
            </div>
            <p className="name-client">Mising Person </p>
          </div>
        </Link>
        </div>

        <div className="service">
        <Link to ="../PoliceComplaintPage">
          <div className="card-client">
            <div className="Service-picture">
              <img src={img2} alt="" />

              <p className="name-client">File Complaint</p>
            </div>
          </div>
       </Link>
          </div>

          <div className="service">
          <Link to ="../PermitRequestForm">
            <div className="card-client">
              <div className="Service-picture">
                <img src={img3} alt="" />
              </div>
              <p className="name-client">Permit Request</p>
            </div>
</Link>
          </div>

          <div className="service">
          <Link to ="../PassportVerificationDates">

            <div className="card-client">
              <div className="Service-picture">
                <img src={img4} alt="" />
              </div>
              <p className="name-client">Pasport</p>
            </div>
            </Link>
          </div>

          <div className="service">
          <Link to ="../PoliceStationSearch">

            <div className="card-client">
              <div className="Service-picture">
                <img src={img5} alt="" />
              </div>
              <p className="name-client"> Nearest Station</p>
            </div>
            </Link>
          </div>

          <div className="service">
          <Link to ="../EmergencyRequest">

            <div className="card-client">
              <div className="Service-picture">
                <img src={img6} alt="" />
              </div>
              <p className="name-client">Emergency</p>
            </div>
        </Link>
          </div>
        
        </div>
      </div>
    
  );
};

export default PolicePage;
