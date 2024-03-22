import React from "react";
import "./Footer.css";
import { Link, Route, Routes } from "react-router-dom";
import TC from "../../../Admin/Pages/T&C/T&C";
import Privacy from "../../../Admin/Pages/Privacy/Privacy";

const Footer = () => {
    
  return (

    <div>
        <Routes>

        <Route path="/Terms&Conditions" element={<TC />} />
                <Route path="/Privacy-Policy" element={<Privacy />} />

        </Routes>

      <footer>
        <div class="footer">
          <div class="row">
            <a href="#">
              <i class="fa fa-facebook"></i>
            </a>
            <a href="#">
              <i class="fa fa-instagram"></i>
            </a>
            <a href="#">
              <i class="fa fa-youtube"></i>
            </a>
            <a href="#">
              <i class="fa fa-twitter"></i>
            </a>
          </div>

          <div class="row">
            <ul>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Our Services</a>
              </li>
              <li>
              <Link to = "./Privacy-Policy">Privacy Policy </Link> 
              </li>
              <li>
                <Link to = "./Terms&Conditions">Terms & Conditions </Link> 
              </li>
              <li>
                <a href="#">Career</a>
              </li>
            </ul>
          </div>

          <div class="row">
            LINK Copyright © 2024 Link - All rights reserved || Designed
            By: Abhijith T P
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
