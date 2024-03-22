import React from "react";
import { Link } from "react-router-dom";
import law1 from "../../assets/icon/mylawyer.png";
import law2 from "../../assets/icon/sesarchlawyer.png";
import law3 from "../../assets/icon/mycase.png";
import "./LawyerPage.css"
const LawyerPage = () => {
  return (
    <div className="LawyerPage">
      <div className="services">
        <Link to="/User/MyLawyersPage">
          <div className="service">
            <div class="card-client">
              <div class="Service-picture">
                <img src={law1} alt="img" />
              </div>
              <p class="name-client">My Lawyer</p>
            </div>
          </div>
        </Link>

        <Link to="/user/AllLawyersPage">
          <div className="service">
            <div class="card-client">
              <div class="Service-picture">
                <img src={law2} alt="img" />
              </div>
              <p class="name-client">New Lawyer</p>
            </div>
          </div>
        </Link>

        <Link to="/user/MyCasesPage">
          <div className="service">
            <div class="card-client">
              <div class="Service-picture">
                <img src={law3} alt="img" />
              </div>
              <p class="name-client">My Cases</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LawyerPage;
