import React, { useEffect, useState } from "react";
import { Button, Grid, Typography, CircularProgress } from "@mui/material";
import { db } from "../../../config/Firebase";
import { Link } from "react-router-dom";
import "./FinePayment.css";

import img1 from "../../assets/icon/Fine/redLight.png";
import img2 from "../../assets/icon/Fine/OverSpeed.png";
import img3 from "../../assets/icon/Fine/NoParking.png";
import img4 from "../../assets/icon/Fine/helmet.png";
import img5 from "../../assets/icon/Fine/WrecklessDriving.png";
import img6 from "../../assets/icon/Fine/Littering.png";
import img7 from "../../assets/icon/Fine/NoMask.png";
import img8 from "../../assets/icon/Fine/NoSmoking.png";
import img9 from "../../assets/icon/Fine/NoAlcohol.png";
import img10 from "../../assets/icon/Fine/Noise.png";
import { collection, getDocs, query, where } from "firebase/firestore";

const FinePaymentPage = () => {
  useEffect(() => {
    fineDetail();
  }, []);

  const [fineDetails, setFineDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fineDetail = async () => {
    const fines = collection(db, "collection_UserFine");
    const fQuery = query(
      fines,
      where("UserID", "==", sessionStorage.getItem("uid"))
    );
    const finetDetails = await getDocs(fQuery);
    const filteredFineDetails = finetDetails.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  
    setFineDetails(filteredFineDetails);
    setLoading(false);
  };

  const formatDate = (date) => {
    if (!date) {
      return ""; // Return an empty string if date is not defined
    }
  
    const jsDate = date.toDate();
  
    const day = jsDate.getDate();
    const month = jsDate.getMonth() + 1;
    const year = jsDate.getFullYear();
    // Get weekday
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekday = weekdays[jsDate.getDay()];
  
    const paddedDay = day < 10 ? `0${day}` : day;
    const paddedMonth = month < 10 ? `0${month}` : month;
  
    return `${paddedDay}/${paddedMonth}/${year} ${weekday}`;
  };
  

  return (
    <div className="payfinecontainer" style={{ padding: "10px 220px " }}>
      <div className="heading">
        <Typography variant="h4">Pay Fine</Typography>
      </div>
      <div className="fines">
        {loading ? (
          <div className="loadingContainer">
            <CircularProgress />
          </div>
        ) : fineDetails.length === 0 ? (
          <Typography variant="subtitle1">No fine</Typography>
        ) : (
          <Grid container spacing={2}>
            {fineDetails.map((detail) => (
              <Grid item xs={12} md={6} lg={4} key={detail.id}>
                <div className="finebody" id={detail.id}>
                  <div className="fineHeading">
                    <Typography variant="h6">
                      {getFineName(detail.category)}
                    </Typography>
                    <Typography variant="subtitle2">
                      {formatDate(detail.timestamp)}
                    </Typography>
                  </div>
                  <div className="circle">
                    <div className="leftCircle"></div>
                    <div className="rightCircle"></div>
                  </div>
                  <div className="fineContainer">
                    <div className="fineImg">{getImage(detail.category)}</div>
                    <Typography variant="h6">
                      {getFineName(detail.category)}
                    </Typography>
                    <Typography variant="subtitle1">
                      Amount :{detail.fineAmount}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`../PaymentPage/${detail.id}`}
                      disabled={detail.paid === 1} // Disable the button if paid is equal to 1
                    >
                      {detail.paid === 1 ? "Paid" : "Pay Fine"}{" "}
                      {/* Render "Paid" if paid is 1, otherwise render "Pay Fine" */}
                    </Button>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default FinePaymentPage;

const getImage = (id) => {
  switch (id) {
    case "gMgESzIBGFRybePL3Lle":
      return <img src={img1} alt="fine img" />;
    case "wHpwJJl8UFVIjORI5Mdd":
      return <img src={img2} alt="fine img" />;
    case "cCT0CeSxmwJYQj6TF2Fx":
      return <img src={img3} alt="fine img" />;
    case "fcIxcFKSLlGBMpobrJDF":
      return <img src={img4} alt="fine img" />;
    case "nv5CxAxnxG5dALZHLWkT":
      return <img src={img5} alt="fine img" />;
    case "xSG3L9WCCvmp1ToDLGFh":
      return <img src={img6} alt="fine img" />;
    case "rwu5A8UxERjm8UmclZhl":
      return <img src={img7} alt="fine img" />;
    case "ikTMQOlrYRaKLHxj0ofT":
      return <img src={img8} alt="fine img" />;
    case "jyCQHGEEIjw2YNCHotuL":
      return <img src={img9} alt="fine img" />;
    case "dPbhMn1ghlDxCho89l8t":
      return <img src={img10} alt="fine img" />;
    default:
      return null;
  }
};

const getFineName = (id) => {
  switch (id) {
    case "gMgESzIBGFRybePL3Lle":
      return "Red light";
    case "wHpwJJl8UFVIjORI5Mdd":
      return "Overspeed";
    case "cCT0CeSxmwJYQj6TF2Fx":
      return "Parking";
    case "fcIxcFKSLlGBMpobrJDF":
      return "No Helmet/Seatbelt";
    case "nv5CxAxnxG5dALZHLWkT":
      return "Reckless driving";
    case "xSG3L9WCCvmp1ToDLGFh":
      return "Littering";
    case "rwu5A8UxERjm8UmclZhl":
      return "No mask";
    case "ikTMQOlrYRaKLHxj0ofT":
      return "Smoking";
    case "jyCQHGEEIjw2YNCHotuL":
      return "Drinking";
    case "dPbhMn1ghlDxCho89l8t":
      return "Noise Pollution";
    default:
      return "";
  }
};
