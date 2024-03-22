import {
    collection,
    getDocs,
    query,
    updateDoc,
    where,
  } from "firebase/firestore";
  import React, { useEffect, useState } from "react";
  import { db } from "../../../config/Firebase";
  import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
  } from "@mui/material";
  
  const UpdatePoliceLocation = () => {
    const [pdata, setPdata] = useState([]);
    const [district, setDistrict] = useState([]);
    const [districtName, setDistrictName] = useState("");
    const [place, setPlace] = useState([]);
    const [placeName, setPlaceName] = useState("");
    const [policeStation, setPoliceStation] = useState("");
    useEffect(() => {
      getStations();
    }, []);
  
    const getStations = async () => {
      try {
        const station = collection(db, "police_station_collection");
        const stationData = await getDocs(station);
        const filteredData = stationData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("ps:", filteredData);
        setPdata(filteredData);
  
        const placeData = collection(db, "Place");
        const placeSnapshot = await getDocs(placeData);
        const filteredPlaceData = placeSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("place:", filteredPlaceData);
  
        const joinData = filteredData
          .map((ps) => ({
            ...ps,
            place: filteredPlaceData.find((place) => place.id === ps.placeId),
          }))
          .filter((ps) => ps.place && ps.place.id);
        console.log(joinData);
        setPdata(joinData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const handleUpdate = async (id) => {
      await getDistrricts();
    //   await updatePs(id);
    
      console.log(id);
    };
  
    const getDistrricts = async () => {
      try {
        const district = collection(db, "districts");
        const districtSnapshot = await getDocs(district);
        const districtData = districtSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(districtData);
        setDistrict(districtData);
        await getPlaces(districtName); // Pass districtName here
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };
  
    const getPlaces = async (Id) => {
      try {
        const placeRef = collection(db, "Place");
        const placeSnapshot = await getDocs(
          query(placeRef, where("District", "==", Id))
        );
        const placeData = placeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("placeData:", placeData);
        setPlace(placeData);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
  
    const updatePs = async (id) => {
      try {
        const placeRef = collection(db, "police_station_collection",id); // Corrected syntax
        await updateDoc(placeRef, {
          placeId: placeName,
          districtId: districtName,
        });
        console.log("Updated");
      } catch (error) {
        console.error("Error updating police station data:", error);
      }
    };
  
    return (
      <div>
        <div className="updatebox">
          <div className="updatebox-header">
            <Typography variant="h6">Station Place</Typography>
          </div>
          {policeStation}
          <div className="updatebox-body">
            <FormControl fullWidth>
              <InputLabel>District</InputLabel>
              <Select
                value={districtName}
                label="District"
                onChange={(e) => {
                  setDistrictName(e.target.value);
                  getPlaces(e.target.value);
                }}
              >
                {district.map((doc) => (
                  <MenuItem key={doc.id} value={doc.id}>
                    {doc.district}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Place</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={placeName}
                label="place"
                onChange={(e) => setPlaceName(e.target.value)}
              >
                {place.map((doc) => (
                  <MenuItem key={doc.id} value={doc.id}>
                    {doc.Place}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="outlined" onClick={() => updatePs(policeStation)}>
              Submit
            </Button>
          </div>
        </div>
  
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell>Station Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>District</TableCell>
                <TableCell>Place</TableCell>
                <TableCell align="center">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pdata.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>{row.stationName}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.districtId}</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center">
                    <button
                      onClick={() => {
                        handleUpdate(row.id);
                        setPoliceStation(row.id);
                      }}
                    >
                      Update
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  
  export default UpdatePoliceLocation;
  