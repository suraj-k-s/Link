import React, { useEffect, useState } from "react";
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

const Register = () => {
  const [cleared, setCleared] = React.useState(false);
  const [showdistrict, setShowDistrict] = useState([]);
  const [showplace, setShowPlace] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [adharpic, setAdharpic] = useState([]);

  const [gender, setGender] = useState("");
  const [district, setDistrict] = useState("");
  const [place, setPlace] = useState("");
  const [dob, setDob] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState(""); // State for UserId

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlePlaceChange = (event) => {
    setPlace(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
    fetchPlace(event.target.value);
  };

  const fetchPlace = async (Id) => {
    const placeRef = collection(db, "Place");

    // Create a query against the collection.
    const q = query(placeRef, where("District", "==", Id));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc, key) => ({
      id: key + 1,
      placeId: doc.id,
      ...doc.data(),
    }));
    setShowPlace(data);
    console.log(data);
  };

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "districts"));
    const data = querySnapshot.docs.map((doc, key) => ({
      id: key + 1,
      districtId: doc.id,
      ...doc.data(),
    }));
    setShowDistrict(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateUserId = () => {
    // Generate random 10-digit number
    const min = 1000000000; // Minimum 10-digit number
    const max = 9999999999; // Maximum 10-digit number
    const randomUserId = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomUserId.toString(); // Convert to string
  };

  const handleSubmit = async () => {
    try {
      // Check if password and confirm password are equal
      if (password !== confirmPassword) {
        alert("Password and confirm password do not match.");
        return;
      }

      // Generate UserId
      let newUserId;
      let isUnique = false;
      while (!isUnique) {
        newUserId = generateUserId();
        const userIdExists = await checkUserIdExists(newUserId);
        if (!userIdExists) {
          isUnique = true;
        }
      }

      console.log(email);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user.uid;
      console.log(user);
      console.log(userCredential);

      const photometadata = {
        contentType: photo.type,
      };
      const adhatMeatdata = {
        contentType: adharpic.type,
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "images/" + photo.name);
      await uploadBytesResumable(storageRef, photo, photometadata); //ref,file varialbe,file type

      const url = await getDownloadURL(storageRef); //creating url for image

      const AdharStorageRef = ref(storage, "Adhar/" + adharpic.name);
      await uploadBytesResumable(AdharStorageRef, adharpic, adhatMeatdata);
      const adharUrl = await getDownloadURL(AdharStorageRef);

      await setDoc(doc(db, "collection_user", user), {
        user_Id: newUserId,
        user_photo: url,
        user_adhar: adharUrl,
        user_name: fname + " " + lname,
        user_email: email,
        user_mobile: mobile,
        user_address: address,
        user_gender: gender,
        user_place: place,
        user_dob: dob,
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert(errorCode);
    }
  };

  const checkUserIdExists = async (userId) => {
    const userQuery = query(
      collection(db, "collection_user"),
      where("UserId", "==", userId)
    );
    const querySnapshot = await getDocs(userQuery);
    return !querySnapshot.empty;
  };

  return (
    <div className="reg">
      <div className="RegisteContent">
        <div className="heading">
          <Typography variant="h2">Register</Typography>
        </div>
        <div className="inputName">
          <TextField
            id="standard-basic"
            label="First name "
            onChange={(event) => setFname(event.target.value)}
            variant="standard"
            type="text"
            className="name"
            style={{
              paddingRight: "10px",
              width: "45%",
              justifyContent: "flex-end",
            }}
          />

          <TextField
            className="name"
            id="standard-basic"
            onChange={(event) => setLname(event.target.value)}
            label="Last name "
            style={{
              width: "50%",
            }}
            variant="standard"
            type="text"
          />
        </div>
        <div className="input">
          <TextField
            id="standard-basic"
            label="Phone number .... "
            onChange={(e) => setMobile(e.target.value)}
            variant="standard"
            type="number"
            style={{ width: "100%" }}
          />
        </div>
        <div className="input">
          <TextField
            id="standard-basic"
            label="Eamil address .... "
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
            type="email"
            style={{ width: "100%" }}
          />
        </div>
        <div className="input">
          <TextField
            id="standard-multiline-static"
            label="Addresss"
            multiline
            rows={4}
            placeholder="Your Address...."
            onChange={(e) => setAddress(e.target.value)}
            variant="standard"
            style={{ width: "100%" }}
          />
        </div>
        <div className="input">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Gender
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={gender}
              onChange={handleGenderChange}
              label="Gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="standard-multiline-static"
            label="."
            type="date"
            onChange={(e) => setDob(e.target.value)}
            variant="standard"
            style={{ width: "100%" }}
          />
        </div>

        <div className="input">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
            <InputLabel id="demo-simple-select-standard-label">
              District
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={district}
              onChange={handleDistrictChange}
              label="district"
            >
              {showdistrict.map((dist, key) => (
                <MenuItem value={dist.districtId}>{dist.district}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Place
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={place}
              onChange={handlePlaceChange}
              label="Place"
            >
              {showplace.map((pla, key) => (
                <MenuItem value={pla.placeId}>{pla.Place}</MenuItem>
              ))}{" "}
            </Select>
          </FormControl>
        </div>

        <div className="input">
          <Button
            sx={{ m: 1, Width: " 80%" }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload your Photo
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => setPhoto(event.target.files[0])}
            />
          </Button>
          <Button
            component="label"
            variant="contained"
            onChange={(event) => setAdharpic(event.target.files[0])}
            startIcon={<CloudUploadIcon />}
          >
            Upload ID proof
            <VisuallyHiddenInput type="file" />
          </Button>
        </div>
        <div className="input">
          <TextField
            id="standard-basic"
            label="password...."
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
            type="password"
            style={{ width: "100%" }}
          />
        </div>
        <div className="input">
          <TextField
            id="standard-basic"
            label="Confirm password...."
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="standard"
            type="password"
            style={{ width: "100%" }}
          />
        </div>

        <div className="otherLogin"></div>
        <div className="button">
          <Button variant="outlined" onClick={handleSubmit}>
            Register
          </Button>
        </div>
      </div>
      <div className="linkContainer">
        <div className="link">
          <Typography variant="subtitle2">Already have an account</Typography>
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

export default Register;
