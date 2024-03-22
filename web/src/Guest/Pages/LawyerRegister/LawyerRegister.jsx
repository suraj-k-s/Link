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
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import PhoneInput from "react-phone-number-input";

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

const LawyerRegister = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [licensePhoto, setLicensePhoto] = useState(null);
  const [idProofPhoto, setIdProofPhoto] = useState(null);
  const [cleared, setCleared] = useState(false);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [placeOptions, setPlaceOptions] = useState([]);
  const [gender, setGender] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [dob, setDob] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualification, setQualification] = useState("");
  const [specializationOptions, setSpecializationOptions] = useState([]);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  const generateRandomId = () => {
    const randomId = Math.floor(10000000 + Math.random() * 90000000);
    return randomId.toString();
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlePlaceChange = (event) => {
    setSelectedPlace(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    fetchPlaceOptions(event.target.value);
  };

  const fetchPlaceOptions = async (districtId) => {
    const placeRef = collection(db, "Place");
    const q = query(placeRef, where("District", "==", districtId));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc, key) => ({
      id: key + 1,
      placeId: doc.id,
      ...doc.data(),
    }));
    setPlaceOptions(data);
  };

  const fetchDistrictOptions = async () => {
    const querySnapshot = await getDocs(collection(db, "districts"));
    const data = querySnapshot.docs.map((doc, key) => ({
      id: key + 1,
      districtId: doc.id,
      ...doc.data(),
    }));
    setDistrictOptions(data);
  };

  const fetchSpecializationOptions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Lawyer_Category"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        categoryName: doc.data().categoryName,
      }));
      setSpecializationOptions(data);
    } catch (error) {
      console.error("Error fetching specialization options:", error);
    }
  };

  useEffect(() => {
    fetchDistrictOptions();
    fetchSpecializationOptions();
  }, []);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check if any required field is empty
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !mobile ||
      !address ||
      !gender ||
      !selectedPlace ||
      !dob ||
      !licensePhoto ||
      !idProofPhoto ||
      !specialization ||
      !qualification
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const randomId = generateRandomId();

      // Check if the generated ID already exists in the database
      let userRef = doc(db, "lawyer_collection", randomId);
      let userSnapshot = await getDoc(userRef);

      // If the generated ID already exists, generate a new one until it's unique
      while (userSnapshot.exists()) {
        const newRandomId = generateRandomId();
        userRef = doc(db, "lawyer_collection", newRandomId);
        userSnapshot = await getDoc(userRef);
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      let profilePictureUrl = "";
      if (profilePicture) {
        const profilePictureMetadata = {
          contentType: profilePicture.type,
        };
        const profilePictureStorageRef = ref(
          storage,
          "profilePictures/" + profilePicture.name
        );
        await uploadBytesResumable(
          profilePictureStorageRef,
          profilePicture,
          profilePictureMetadata
        );
        profilePictureUrl = await getDownloadURL(profilePictureStorageRef);
      }

      const licensePhotoMetadata = {
        contentType: licensePhoto.type,
      };
      const licenseStorageRef = ref(storage, "license/" + licensePhoto.name);
      await uploadBytesResumable(
        licenseStorageRef,
        licensePhoto,
        licensePhotoMetadata
      );
      const licensePhotoUrl = await getDownloadURL(licenseStorageRef);

      const idProofPhotoMetadata = {
        contentType: idProofPhoto.type,
      };
      const idProofStorageRef = ref(storage, "idProof/" + idProofPhoto.name);
      await uploadBytesResumable(
        idProofStorageRef,
        idProofPhoto,
        idProofPhotoMetadata
      );
      const idProofPhotoUrl = await getDownloadURL(idProofStorageRef);

      await setDoc(doc(db, "lawyer_collection", userId), {
        userId: randomId,
        license_photo: licensePhotoUrl,
        id_proof: idProofPhotoUrl,
        profile_picture: profilePictureUrl,
        full_name: firstName + " " + lastName,
        email: email,
        mobile: mobile,
        address: address,
        gender: gender,
        place: selectedPlace,
        dob: dob,
        specialization: specialization,
        qualification: qualification,
      });

      alert("Registration successful!");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setMobile("");
      setAddress("");
      setGender("");
      setSelectedDistrict("");
      setSelectedPlace("");
      setDob("");
      setProfilePicture(null);
      setLicensePhoto(null);
      setIdProofPhoto(null);
      setSpecialization("");
      setQualification("");
      setError("");
      setCleared(true);

      window.location.href = "../login";
    } catch (error) {
      console.error("Error registering:", error);
      alert("Error registering. Please try again.");
    }
  };

  const handleSpecializationChange = (event) => {
    setSpecialization(event.target.value);
  };

  return (
    <div className="reg">
      <div className="RegisteContent">
        <div className="heading">
          <Typography variant="h2">Lawyer Registration</Typography>
        </div>
        <div className="inputName">
          <TextField
            id="standard-basic"
            label="First name"
            onChange={(event) => setFirstName(event.target.value)}
            variant="standard"
            type="text"
            className="name"
            style={{
              paddingRight: "10px",
              width: "45%",
              justifyContent: "flex-end",
            }}
            required
          />

          <TextField
            className="name"
            id="standard-basic"
            onChange={(event) => setLastName(event.target.value)}
            label="Last name"
            style={{
              width: "50%",
            }}
            variant="standard"
            type="text"
            required
          />
        </div>
        <div className="input">
          <PhoneInput
            placeholder="enter phone number"
            required
            defaultCountry="IN"
            value={mobile}
            onChange={setMobile}
          />
        </div>
        <div className="input">
          <TextField
            id="standard-basic"
            label="Email address"
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
            type="email"
            style={{ width: "100%" }}
            required
          />
        </div>
        <div className="input">
          <TextField
            id="standard-multiline-static"
            label="Address"
            multiline
            rows={4}
            placeholder="Your Address"
            onChange={(e) => setAddress(e.target.value)}
            variant="standard"
            style={{ width: "100%" }}
            required
          />
        </div>
        <div className="input">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }} required>
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
            label="Date of Birth"
            type="date"
            onChange={(e) => setDob(e.target.value)}
            variant="standard"
            style={{ width: "100%" }}
            required
          />
        </div>

        <div className="input">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }} required>
            <InputLabel id="demo-simple-select-standard-label">
              District
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedDistrict}
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
          <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }} required>
            <InputLabel id="demo-simple-select-standard-label">
              Place
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedPlace}
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
          <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }} required>
            <InputLabel id="specialization-label">Specialization</InputLabel>
            <Select
              labelId="specialization-label"
              id="specialization-select"
              value={specialization}
              onChange={handleSpecializationChange}
              label="Specialization"
            >
              {specializationOptions.map((specialization) => (
                <MenuItem key={specialization.id} value={specialization.id}>
                  {specialization.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="standard-basic"
            label="Qualification"
            onChange={(e) => setQualification(e.target.value)}
            variant="standard"
            type="text"
            style={{ width: "100%" }}
            required
          />
        </div>

        <div className="input">
          <Button
            sx={{ m: 1, Width: " 80%" }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            style={{
              backgroundColor: profilePicture ? "#4caf50" : "",
              color: profilePicture ? "white" : "",
            }}
          >
            Upload your Profile Picture
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => setProfilePicture(event.target.files[0])}
            />
          </Button>
          <Button
            sx={{ m: 1, Width: " 80%" }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            style={{
              backgroundColor: licensePhoto ? "#4caf50" : "",
              color: licensePhoto ? "white" : "",
            }}
            required
          >
            Upload your License
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => setLicensePhoto(event.target.files[0])}
              required
            />
          </Button>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            style={{
              backgroundColor: idProofPhoto ? "#4caf50" : "",
              color: idProofPhoto ? "white" : "",
            }}
            required
          >
            Upload ID proof
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => setIdProofPhoto(event.target.files[0])}
              required
            />
          </Button>
        </div>
        <div className="input">
          <TextField
            id="standard-basic"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
            type="password"
            style={{ width: "100%" }}
            required
          />
        </div>
        <div className="input">
          <TextField
            id="standard-basic"
            label="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="standard"
            type="password"
            style={{ width: "100%" }}
            required
          />
        </div>
        {error && (
          <Typography variant="subtitle2" style={{ color: "red" }}>
            {error}
          </Typography>
        )}

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

export default LawyerRegister;
