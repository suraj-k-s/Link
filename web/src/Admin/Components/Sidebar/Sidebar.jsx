import React from "react";
import "./Sidebar.css";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import { Typography } from "@mui/material";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div className="top">
        <div className="left">
          <NotificationsNoneOutlinedIcon className="notificatioIcon" />
          <span>1</span>
        </div>
        <div className="right">
          <div className="user">
            <div className="userName">
              <Typography variant="subtitle1">Usernamame</Typography>
              <Typography variant="subtitle2">Admin</Typography>
            </div>
            <div className="logo">
              <img src="https://source.unsplash.com/random" alt="logo" />
            </div>
          </div>
        </div>
      </div>

      <div className="middle">
      {/* <div className="card"> */}
          {/* <div className="cardcontent ">
            <div className="logo">
              <AcUnitOutlinedIcon />
            </div>
            <div className="title">
              <Typography variant="subtitle1">Title</Typography>
            </div>
          </div>
          <div className="cardExtend">
            <div className="icon">
              <NavigateNextOutlinedIcon />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="cardcontent ">
            <div className="logo">
              <AcUnitOutlinedIcon />
            </div>
            <div className="title">
              <Typography variant="subtitle1">Title</Typography>
            </div>
          </div>
          <div className="cardExtend">
            <div className="icon">
              <NavigateNextOutlinedIcon />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="cardcontent ">
            <div className="logo">
              <AcUnitOutlinedIcon />
            </div>
            <div className="title">
              <Typography variant="subtitle1">Title</Typography>
            </div>
          </div>
          <div className="cardExtend">
            <div className="icon">
              <NavigateNextOutlinedIcon />
            </div>
          </div>
        </div> */}
      </div>
      <div className="bottom">
        {/* <div className="card">
          <div className="cardTop">
            <img src="" alt="logo" />
          </div>
          <div className="cardMiddle">
            <Typography variant="subtitle1">
              Lorem ipsum <span className="pro">Blue Colour</span> dolor sit
              amet consectetur.
            </Typography>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
