import React, { useEffect, useState } from "react";
import "./Topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/Firebase";

const Topbar = () => {
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState(null);

  useEffect(() => {
    const userData = async () => {
      const lid = sessionStorage.getItem("lid");
      if (!lid) {
        navigate("../login");
        return;
      }
      const docRef = doc(db, "lawyer_collection", lid);
      const docSnapUser = await getDoc(docRef);
      const userData = {
        ...docSnapUser.data(),
        id: docSnapUser.id,
      };
      setLawyer(userData);
    };

    userData();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("lid");
    navigate("/");
  };

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
              <Link to="./Lawyer">Home</Link>{" "}
            </div>
            <div className="nav">
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </nav>
        </div>
        <div className="UserContainer">
          <div className="User">
            <div className="Detail">
              <div className="userName">
                {lawyer ? (
                  <>
                    <Typography variant="subtitle1">{lawyer.full_name}</Typography>
                    <Typography variant="subtitle2">Lawyer</Typography>
                  </>
                ) : null}
              </div>
            </div>
            <div className="logo">
              {lawyer ? (
                <img src={lawyer.profile_picture ? lawyer.profile_picture : "https://source.unsplash.com/random"} alt="logo" />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
