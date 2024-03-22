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
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../District/District.css";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/Firebase";

const Place = () => {
  const palcedb = collection(db, "Place");
  const [showdistrict, setShowDistrict] = useState([]);
  const [district, setDistrict] = useState("");
  const [placevalue, setPlacevalue] = useState("");
  const [dispalayData, setDispayData] = useState([]);

  useEffect(() => {
    fetchData();
    showPlace();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "districts"));
    const data = querySnapshot.docs.map((doc, key) => ({
      id: key + 1,
      districtId: doc.id,
      ...doc.data(),
    }));
    setShowDistrict(data);
    
  };

  const showPlace = async () => {
    try {
      const districtQuerySnapshot = await getDocs(collection(db, "districts"));
      const districtData = districtQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      const placesnapshot = await getDocs(collection(db, "Place"));
      const placeData = placesnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      const joinData = placeData
        .map((place) => ({
          ...place,
          DistrictInfo: districtData.find(
            (district) => district.id === place.District
          ),
        }))
        .filter(
          (place) => place.DistrictInfo && place.DistrictInfo.district
        )
        .sort((a, b) => {
          const districtA = a.DistrictInfo.district.toUpperCase();
          const districtB = b.DistrictInfo.district.toUpperCase();
          if (districtA < districtB) {
            return -1;
          }
          if (districtA > districtB) {
            return 1;
          }
          return 0;
        });
  
      setDispayData(joinData);
      console.log(joinData);
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }
  


//Ading data
  const insPlace = async () => {
    try {
      await addDoc(palcedb, {
        District: district,
        Place: placevalue,
      });
      alert(`${placevalue} inserted`);
      setPlacevalue("");
      showPlace();

    } catch (error) {
      console.error(error);
    }
  };

 

  return (
    <div className="Place">
      <div className="wrapper">
        <Typography variant="h3" className="h1">
          Place
        </Typography>
        <div className="form">
          <div className="formWrapper">
            <div className="input"></div>
            <div className="input">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">District </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={district}
                  label="District"
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  {showdistrict.map((doc, key) => (
                    <MenuItem value={doc.districtId}>{doc.district}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="input">
              <TextField
                id="outlined-basic"
                label="Place name"
                required
                value={placevalue}
                onChange={(e) => setPlacevalue(e.target.value)}
              />
            </div>

            <div className="btn">
              <Button
                variant="outlined"
                type="submit"
                onClick={insPlace}
                className="btn"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sl.No</TableCell>
                  <TableCell align="center">Place</TableCell>
                  <TableCell align="center">District</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                
                }
                {dispalayData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="center">{row.Place}</TableCell>
                    <TableCell align="center">{row.DistrictInfo.district}</TableCell>
                    <TableCell align="center">Update</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Place;
