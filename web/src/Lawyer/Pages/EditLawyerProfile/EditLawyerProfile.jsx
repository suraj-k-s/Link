import React, { useEffect, useState } from "react";
import { Button, TextField, Typography, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { db, storage } from "../../../config/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const EditLawyerProfile = () => {
  const [userId, setUserId] = useState("");
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [place, setPlace] = useState("");
  const [error, setError] = useState("");
  const [idPhoto, setIdPhoto] = useState(null);
  const [licensePhoto, setLicensePhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    // Get user ID from session storage
    const storedUserId = sessionStorage.getItem("lid");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User ID not found in session storage");
    }
  }, []); // Fetch user ID from session storage when component mounts

  useEffect(() => {
    // Fetch user data based on user ID (userId) from Firestore
    const fetchUserData = async () => {
      try {
        // Fetch user document from Firestore using user ID
        const userRef = doc(db, "lawyer_collection", userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Set user data to state variables
          setFullname(userData.full_name);
          setMobile(userData.mobile);
          setAddress(userData.address);
          setDistrict(userData.district);
          setPlace(userData.place);
          // Set other fields similarly
        } else {
          console.error("No such document exists!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]); // Fetch user data when user ID is set or changes

  const handleIDUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `idPhotos/${file.name}`);
    try {
      await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setIdPhoto(downloadURL);
      alert("ID photo uploaded successfully!");
    } catch (error) {
      console.error("Error uploading ID photo:", error);
      alert("Error uploading ID photo. Please try again.");
    }
  };

  const handleLicenseUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `licensePhotos/${file.name}`);
    try {
      await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setLicensePhoto(downloadURL);
      alert("License photo uploaded successfully!");
    } catch (error) {
      console.error("Error uploading license photo:", error);
      alert("Error uploading license photo. Please try again.");
    }
  };

  const handleProfilePhotoUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `profilePhotos/${file.name}`);
    try {
      await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setProfilePhoto(downloadURL);
      alert("Profile photo uploaded successfully!");
    } catch (error) {
      console.error("Error uploading profile photo:", error);
      alert("Error uploading profile photo. Please try again.");
    }
  };

  const handleSubmit = async () => {
    // Update user profile logic
    try {
      // Update user document in Firestore with new data
      const userRef = doc(db, "lawyer_collection", userId);
      await updateDoc(userRef, {
        full_name: fullname,
        mobile: mobile,
        address: address,
        district: district,
        place: place,
        id_photo: idPhoto,
        license_photo: licensePhoto,
        profile_photo: profilePhoto,
        // Update other fields if needed
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="edit-profile">
      <Typography variant="h2">Edit Lawyer Profile</Typography>
      <div className="input">
        <TextField
          id="standard-basic"
          label="Full Name"
          value={fullname}
          onChange={(event) => setFullname(event.target.value)}
          variant="standard"
          type="text"
          className="name"
          style={{ width: "100%" }}
          required
        />
      </div>
      <div className="input">
        <TextField
          id="standard-basic"
          label="Mobile number"
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
          variant="standard"
          type="text"
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
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          variant="standard"
          style={{ width: "100%" }}
          required
        />
      </div>
      <div className="input">
        <FormControl style={{ width: "100%" }}>
          <InputLabel id="district-label">District</InputLabel>
          <Select
            labelId="district-label"
            id="district-select"
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            variant="standard"
            required
          >
            {/* Dropdown options for district */}
            <MenuItem value={"District 1"}>District 1</MenuItem>
            <MenuItem value={"District 2"}>District 2</MenuItem>
            {/* Add more options if needed */}
          </Select>
        </FormControl>
      </div>
      <div className="input">
        <FormControl style={{ width: "100%" }}>
          <InputLabel id="place-label">Place</InputLabel>
          <Select
            labelId="place-label"
            id="place-select"
            value={place}
            onChange={(event) => setPlace(event.target.value)}
            variant="standard"
            required
          >
            {/* Dropdown options for place */}
            <MenuItem value={"Place 1"}>Place 1</MenuItem>
            <MenuItem value={"Place 2"}>Place 2</MenuItem>
            {/* Add more options if needed */}
          </Select>
        </FormControl>
      </div>
      <div className="input">
        <label htmlFor="ID">id</label>
        <input type="file"  onChange={handleIDUpload} />
        <label htmlFor="ID">license</label>
        <input type="file" onChange={handleLicenseUpload} />

        <label htmlFor="ID">profilr</label>
        <input type="file" onChange={handleProfilePhotoUpload} />

      </div>
      <div className="button">
        <Button variant="outlined" onClick={handleSubmit}>
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default EditLawyerProfile;
