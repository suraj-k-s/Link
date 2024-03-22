import React, { useEffect, useState } from "react";
import logo from "../../../Assets/Images/Logo/LinkLogo2.svg";
import { storage, auth, db } from "../../../config/Firebase";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "styled-components";
import "./register.css";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const PoliceStationRegister = () => {
  const [cleared, setCleared] = React.useState(false);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [placeOptions, setPlaceOptions] = useState([]);
  const [file, setFile] = useState([]);

  const [district, setDistrict] = useState("");
  const [place, setPlace] = useState("");
  const [stationName, setStationName] = useState("");
  const [houseOfficer, setHouseOfficer] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
    fetchPlaceOptions(event.target.value);
  };

  const handlePlaceChange = (event) => {
    setPlace(event.target.value);
  };

  const fetchDistrictOptions = async () => {
    const querySnapshot = await getDocs(collection(db, "districts"));
    const data = querySnapshot.docs.map((doc, key) => ({
      id: key + 1,
      districtId: doc.id,
      ...doc.data(),
    }));
    setDistrictOptions(data);
    console.log(data);
  };

  const fetchPlaceOptions = async (districtId) => {
    const placeRef = collection(db, "Place");

    // Create a query against the collection.
    const q = query(placeRef, where("District", "==", districtId));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc, key) => ({
      id: key + 1,
      placeId: doc.id,
      ...doc.data(),
    }));
    setPlaceOptions(data);
    console.log(data);
  };

  useEffect(() => {
    fetchDistrictOptions();
  }, []);

  const handleSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userId = userCredential.user.uid;
      console.log(userId);
      console.log(userCredential);

      const fileMetadata = {
        contentType: file.type,
      };

      const fileStorageRef = ref(storage, "houseOfficerID/" + file.name);
      await uploadBytesResumable(fileStorageRef, file, fileMetadata);

      const fileUrl = await getDownloadURL(fileStorageRef);

      await setDoc(doc(db, "police_station_collection", userId), {
        place: place,
        station_name: stationName,
        house_officer: houseOfficer,
        address: address,
        phone: phone,
        email: email,
        password: password,
        house_officer_id: fileUrl,
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert(errorCode);
    }
  };

  return (
    <div className="reg">
      <div className="RegisteContent">
        <div className="heading">
          <Typography variant="h2">Police Station Registration</Typography>
        </div>
        <div className="input">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
            <InputLabel id="district-label">District</InputLabel>
            <Select
              labelId="district-label"
              id="district-select"
              value={district}
              onChange={handleDistrictChange}
              label="District"
            >
              {districtOptions.map((dist, key) => (
                <MenuItem key={key} value={dist.districtId}>
                  {dist.district}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="input">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
            <InputLabel id="place-label">Place</InputLabel>
            <Select
              labelId="place-label"
              id="place-select"
              value={place}
              onChange={handlePlaceChange}
              label="Place"
            >
              {placeOptions.map((pla, key) => (
                <MenuItem key={key} value={pla.placeId}>
                  {pla.Place}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="input">
          <TextField
            id="standard-basic"
            label="Station Name"
            onChange={(e) => setStationName(e.target.value)}
            variant="standard"
            type="text"
            style={{ width: "100%" }}
          />
        </div>
        <div className="input">
          <TextField
            id="standard-basic"
            label="House Officer"
            onChange={(e) => setHouseOfficer(e.target.value)}
            variant="standard"
            type="text"
            style={{ width: "100%" }}
          />
        </div>
        <div className="input">
          <TextField
            id="standard-multiline-static"
            label="Address"
            multiline
            rows={4}
            placeholder="Station Address...."
            onChange={(e) => setAddress(e.target.value)}
            variant="standard"
            style={{ width: "100%" }}
          />
        </div>
        <div className="input">
          <TextField
            id="standard-basic"
            label="Phone number .... "
            onChange={(e) => setPhone(e.target.value)}
            variant="standard"
            type="number"
            style={{ width: "100%" }}
          />
        </div>
        <div className="input">
          <TextField
            id="standard-basic"
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
            type="email"
            style={{ width: "100%" }}
          />
        </div>
        <div className="input">
          <TextField
            id="standard-basic"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
            type="password"
            style={{ width: "100%" }}
          />
        </div>
        <div className="input">
          <TextField
            id="standard-basic"
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="standard"
            type="password"
            style={{ width: "100%" }}
          />
        </div>
        <div className="input">
          <Button
            sx={{ m: 1, Width: " 80%" }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload House Officer's ID
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </Button>
        </div>
        <div className="button">
          <Button variant="outlined" onClick={handleSubmit}>
            Register
          </Button>
        </div>
      </div>
      <div className="linkContainer">
        <div className="link">
          <Typography variant="subtitle2">
            Already have an account
          </Typography>
          <div className="change">
            <span>
              <Link to="../">Login</Link>{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliceStationRegister;
