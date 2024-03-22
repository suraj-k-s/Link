import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import {
  Typography,
  Grid,
  CircularProgress,
  Select,
  MenuItem,
  TextField
} from "@mui/material";
import { db } from "../../../config/Firebase";
import './PoliceStationSearch.css';
import img from "../../assets/icon/policeStation.png";

const PoliceStationSearch = () => {
  const [station, setStation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const queryDistricts = await getDocs(collection(db, "districts"));
      const districtList = queryDistricts.docs.map((district) => ({
        ...district.data(),
        did: district.id,
      }));
      setDistricts(districtList);

      const queryPolice = await getDocs(collection(db, "police_station_collection"));
      const stationList = queryPolice.docs.map((station, key) => ({
        ...station.data(),
        sid: station.id,
      }));
      setStation(stationList);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStations = station.filter((item) => {
    if (!selectedDistrict || selectedDistrict === '') return true;
    return item.districtId === selectedDistrict;
  }).filter((item) => {
    if (!searchQuery || searchQuery === '') return true;
    return item.stationName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="maincontainer">
      <Typography variant="h4">Police Stations</Typography>
      <div className="searchFilters">
        <Select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          displayEmpty
          fullWidth
          variant="outlined"
        >
          <MenuItem value="">All Districts</MenuItem>
          {districts.map((district) => (
            <MenuItem key={district.did} value={district.did}>{district.district}</MenuItem>
          ))}
        </Select>
        <TextField
          label="Search by station name"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {loading ? (
  <CircularProgress />
) : (
  <Grid container spacing={2}>
    {filteredStations.map((stationData, key) => (
      <Grid item key={key} md={12} lg={6}>
        <div className="policeStationItem">
          <div className="pimg">
            <img src={img} alt="policestation" />
          </div>
          <div className="pdetail">
            <Typography variant="h6">{stationData.stationName}</Typography>
            <Typography>{stationData.address}</Typography>
            <Typography>HouseOfficer: {stationData.houseOfficer}</Typography>
            <Typography>Phone: {stationData.phone}</Typography>
            <Typography>Email: {stationData.email}</Typography>
            {stationData.placeName && (
              <Typography>Place: {stationData.placeName.Place}</Typography>
            )}
            {stationData.districtName && (
              <Typography>District: {stationData.districtName.district}</Typography>
            )}
          </div>
        </div>
      </Grid>
    ))}
  </Grid>
)}

    </div>
  );
};

export default PoliceStationSearch;
