import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import "./pay&card.css";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const [finedType, setFineType] = useState("");
  const [finedDetail, setFineDetail] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getFine();
  }, [id]);

  const getFine = async () => {
    const fineRef = doc(db, "collection_UserFine", id);
    const fineData = await getDoc(fineRef);
    if (fineData.exists()) {
      const finecat = doc(db, "fine_types", fineData.data().category);
      const fineDocSnapshot = await getDoc(finecat);
      setFineType(fineDocSnapshot.data().fineType);
      setFineDetail(fineData.data());
    } else {
      console.log("No such document!");
    }
  };
  
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payFine =  doc(db, "collection_UserFine", id);
      await updateDoc(payFine, {
        paid: 1,
        paidDate: serverTimestamp(),
        paymentDetails: {
          cardNumber: state.number,
          expiryDate: state.expiry,
          cvc: state.cvc,
          name: state.name,
        },
      });
      setState({
        number: "",
        expiry: "",
        cvc: "",
        name: "",
        focus: "",  
      });
      navigate("../FinePaymentPage");
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  
  
  return (
    <div className="payment">
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Payment Details</Typography>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <div className="bill">
            <div className="bill-top">
              <Typography variant="h4">{finedType}</Typography>
            </div>
            <div className="bill-body">
              {finedDetail && (
                <>
                  <Typography variant="h6">Amount : {finedDetail.fineAmount}</Typography>
                  <Typography variant="h6">Time Stamp :{finedDetail.timestamp.toDate().toLocaleString()}</Typography>
                </>
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={4} container justifyContent="center">
          <div className="card">
            <div className="display">
              <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
              />
            </div>
            <div className="inputCardFiles">
              <form onSubmit={handleSubmit}>
                <div className="input">
                  <input
                    name="number"
                    placeholder="Card Number"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    maxLength={16}
                    pattern="[0-9]{16}"
                    title="Please enter a 16-digit card number"
                    required
                  />
                </div>
                <div className="input">
                  <input
                    type="text"
                    name="name"
                    placeholder="Cardholder Name"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    pattern="[A-Za-z\s]{3,}"
                    maxLength={20}
                    title="Please enter a valid cardholder name"
                    required
                  />
                </div>
                <div className="inputcvv">
                  <div className="inp">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="mm/yy"
                      value={state.expiry}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                      maxLength={5}
                      title="Please enter a valid expiry date in MM/YY format"
                      required
                    />
                  </div>
                  <div className="inp">
                    <input
                      type="password"
                      name="cvc"
                      placeholder="CVV"
                      value={state.cvc}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      pattern="[0-9]{3}"
                      maxLength={3}
                      title="Please enter a 3-digit CVV number"
                      required
                    />
                  </div>
                </div>
                <div className="button">
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PaymentPage;
