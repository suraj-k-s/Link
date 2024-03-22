import React from "react";
import img1 from "../../assets/icon/newcase.png";
import img2 from "../../assets/icon/openCase.png";
import img3 from "../../assets/icon/closedCase.png";
import "./CaseDashboard.css";
import { Link } from "react-router-dom";

const CaseDashboard = () => {
  return (
    <div className="CaseDashboard" >
      <div class="dashboard">
        <div class="service">
          <Link to= "../NewCase">

          <div class="card-client">
            <div class="service-picture">
              <img src= {img1} alt="Service 1" />
            </div>
            <p class="name-client">New Case</p>
          </div>
          </Link>
        </div>

        <div class="service">
        <Link to= "../ExistingCase">
          <div class="card-client">
            <div class="service-picture">
              <img src={img2} alt="Service 2" />
            </div>
            <p class="name-client">Existing Case</p>
          </div>
        </ Link>
        </div>

        <div class="service">
        <Link to= "../ClosedCases">

          <div class="card-client">
            <div class="service-picture">
              <img src={img3} alt="Service 3" />
            </div>
            <p class="name-client">Closed case</p>
          </div>
          </ Link>

        </div>
      </div>
    </div>
  );
};

export default CaseDashboard;
