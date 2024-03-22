import { Button } from "@mui/material";
import React, { useState } from "react";
import "./FileUplaod.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "styled-components";
import {  } from "firebase/firestore";
import {  } from "../../../config/Firebase";
import { storage } from "../../../config/Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const FileUplaod =  () => {
  const [file, setFile] = useState([]);
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

  const upload = async()=>{

      
      const filemeta = {
          contentType: file.type,
        };
        
        const fileStorageRef = ref(storage, "testFiles/" + file.name);
        await uploadBytesResumable(fileStorageRef, file, filemeta);
        const fileUrl = await getDownloadURL(fileStorageRef);
        console.log(fileUrl);
        
    }

  return (
    <div className="FileUplaod">
      <div className="fileContainer">
        <header>
          <h1>File Upload</h1>
        </header>
        <div className="Filecontent">
          <div className="input">
            <div>
              <Button
                component="label"
                variant="contained"
                onChange={(e) => setFile(e.target.files[0])}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
            </div>
            <div>
              <Button variant="outlined"
              onClick={upload}>Submit</Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUplaod;
