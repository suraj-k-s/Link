import Typography from "@mui/material/Typography";
import "./Template.css";

import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import LawyerRegister from "../LawyerRegister/LawyerRegister";
import PoliceStationRegister from "../StationRegister/StationRegister";
// import RegisterPoliceStations from "../policeStations/policeStationspoliceStationsArray ";

const LoginTemplate = () => {
  // Add your state and other logic here if needed

  return (
    <div className="tRegister">
      <div className="tcontainer">
        <div className="tRegisterCard">
          <div className="tregisterLeft">
            <div className="tregisterText">
              <Typography variant="h3">Welcome to</Typography>
              <Typography variant="h1">Link</Typography>
              <Typography variant="subtitle1">
                Great to see you .......{" "}
              </Typography>
            </div>
          </div>
          <div className="registerRight">
            <Routes>
              <Route path="/*" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/LawyerRegister" element={<LawyerRegister />} />
              <Route path="/PoliceStationRegister" element={<PoliceStationRegister />} />
              {/* <Route path="/RegisterPoliceStations" element={<RegisterPoliceStations />} /> */}
              
              
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTemplate;
