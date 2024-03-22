import React, { useEffect, useState } from "react";
import "./Topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/Firebase";

const Topbar = () => {
  const navigate = useNavigate();
  const [police, setPolice] = useState(null);

  useEffect(() => {
    const userData = async () => {
      const pid = sessionStorage.getItem("pid");
      if (!pid) {
        navigate("../login");
        return;
      }
      const docRef = doc(db, "police_station_collection", pid);
      const docSnapUser = await getDoc(docRef);
      const userData = {
        ...docSnapUser.data(),
        id: docSnapUser.id,
      };
      setPolice(userData);
      // console.log(userData);
    };

    userData();
  }, []);

  return (
    <div className="Topbar">
      <div className="container">
        <div className="items">
          <div className="logo">
          <Typography variant="h3" sx={{fontWeight:"900"}}>Link</Typography>

          </div>
          <div className="mid">
            <div className="containerBottom"></div>
          </div>
          <nav>
            
            <div className="nav">
              <Link to="/police">Home</Link>{" "}
            </div>

             <div className="nav">
              <Link to="/">logout</Link>{" "}
            </div>
          </nav>
        </div>
        <div className="UserContainer">
          <div className="User">
            <div className="Detail">
              <div className="userName">
                {police ? (
                  <>
                    <Typography variant="subtitle1">
                      {police.stationName}
                    </Typography>
                    <Typography variant="subtitle2">Police</Typography>
                  </>
                ) : null}
              </div>
            </div>
            <div className="logo">
              {police ? (
                <img src="https://source.unsplash.com/random" alt="logo" />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
