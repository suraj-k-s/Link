import "./dashboard.css";
import hbg1 from "../../assets/images/bgu1.mp4";

import ser1 from "../../assets/icon/alert-em.png";
import ser2 from "../../assets/icon/pasport.png";
import ser3 from "../../assets/icon/fileCase.png";
import ser4 from "../../assets/icon/fine.png";
import ser5 from "../../assets/icon/lawyer.png";
import ser6 from "../../assets/icon/missing.png";
import ser7 from "../../assets/icon/permit.png";
import ser8 from "../../assets/icon/calender.png";
import ser9 from "../../assets/icon/policeStation.png";
import { Typography } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import EmergencyRequestPage from "../EmergencyRequestPage/EmergencyRequestPage"; 

const Dashboard = () => {
 
  return (
    <div className="Dashboard">
      <div className="hero">
        <div className="left">
          <div className="heroText">
            <h3>COMPLETE </h3>
            <h1>LEGAL</h1>
            <h2>Service</h2>
          </div>
        </div>
        <div className="right">
          <video src={hbg1} autoplay="autoplay" muted="muted" loop="loop"  ></video>
        </div>
      </div>
      <main>
        <div className="services">
          
          <Link to ="./ReportMissingPersonPage">

          <div className="service">
            <div class="card-client">
              <div class="Service-picture">
                <img src={ser6} alt="img" />
              </div>
              <p class="name-client"> Missing person</p>
            </div>
          </div>
          </Link>
          <div className="service">
            <Link to= "./PoliceComplaintPage">

            <div className="sTitle"></div>
            <div class="card-client">
              <div class="Service-picture">
                <img src={ser3} alt="img" />
              </div>
              <p class="name-client"> Submit a complaint</p>
            </div>
            </Link>
          </div>
          <div className="service">
            <Link to = "./FinePaymentPage">

            <div class="card-client">
              <div class="Service-picture">
                <img src={ser4} alt="img" />
              </div>
              <p class="name-client"> fine</p>
            </div>
            </Link>
          </div>
          <div className="service">
            <Link to="./LawyerPage">

            <div class="card-client">
              <div class="Service-picture">
                <img src={ser5} alt="img" />
              </div>
              <p class="name-client"> Lawyer</p>
            </div>
            </Link>
          </div>
          {/* <div className="service">
          <Link to="./PassportVerificationDates">


            <div class="card-client">
              <div class="Service-picture">
                <img src={ser2} alt="img" />
              </div>
              <p class="name-client"> Pasport verification</p>
            </div>
          </Link>
          </div> */}
          <div className="service">
            <Link to ="./RequestOrCheck">

            <div class="card-client">
              <div class="Service-picture">
                <img src={ser7} alt="img" />
              </div>
              <p class="name-client"> Permit </p>
            </div>
            </Link>
          </div>
          {/* <div className="service">
          <Link to ="./UpcomingEvents">

            <div class="card-client">
              <div class="Service-picture">
                <img src={ser8} alt="img" />
              </div>
              
              <p class="name-client"> Upcoming events</p>
            </div>
            </Link>

          </div> */}
          <div className="service">
          <Link to ="./PoliceStationSearch">

            <div class="card-client">
              <div class="Service-picture">
                <img src={ser9} alt="img" />
              </div>
              <p class="name-client"> Nearest Station </p>
            </div>
            </Link>
          </div>
          {/* <Link to ="./EmergencyRequest">

          <div className="service">
            <div class="card-client">
              <div class="Service-picture">
                <img src={ser1} alt="img" />  
              </div>
              <p class="name-client"> Emergency Request</p>
            </div>
          </div>
          </Link> */}
        </div>
      </main>
      <article>
        <div className="articleHeading">
          <Typography variant="h2">Empowering Legal Interactions: Navigating the Digital Frontier
</Typography>
        </div>
        <div className="articleContent">
          <p>
          In today's fast-paced world, the landscape of legal interactions is evolving at a rapid pace. From seeking legal advice to managing complex cases, individuals and businesses alike require efficient and accessible solutions to navigate the intricacies of the legal system. This is where the Comprehensive Legal Interaction Platform steps in, offering a revolutionary approach to legal services that bridges the gap between users, legal professionals, and law enforcement agencies.
          </p>
          <h4>Streamlined Access to Legal Services</h4>
          <p>
          Gone are the days of cumbersome paperwork and endless queues at legal offices. With our platform, users can access a wide range of legal services with just a few clicks. Whether it's consulting with experienced lawyers, filing legal documents, or tracking case statuses, our intuitive interface puts the power of legal assistance directly into the hands of our users.

          </p>
          <h4>Enhanced Collaboration and Communication
</h4>
          <p>
          Effective communication is the cornerstone of successful legal interactions. Our platform facilitates seamless collaboration between users, lawyers, and law enforcement agencies, ensuring that everyone involved in a case remains informed and engaged throughout the legal process. From real-time updates to secure messaging features, we prioritize transparency and efficiency in every aspect of legal communication.
          </p>
          <h4>Privacy, Security, and Compliance
</h4>
<p>

At the heart of our platform lies a commitment to safeguarding the privacy and security of our users' data. We adhere to strict industry standards and compliance regulations to ensure that sensitive information remains confidential and protected at all times. With robust encryption protocols and comprehensive privacy controls, users can trust that their legal affairs are in safe hands.
</p>
<h4>
Empowering Individuals and Businesses

</h4>
<p>Whether you're an individual seeking legal advice or a business navigating complex legal matters, the Comprehensive Legal Interaction Platform is here to empower you every step of the way. Our user-centric approach, combined with cutting-edge technology and expert legal guidance, ensures that you have the resources and support you need to achieve your legal objectives efficiently and effectively.</p>
<h4>
Join Us on the Legal Journey

</h4>
<p>Embark on a new era of legal interactions with the Comprehensive Legal Interaction Platform. Discover a world of possibilities where legal assistance is just a click away, and where navigating the complexities of the legal system is easier and more accessible than ever before. Join us on this transformative journey and experience the future of legal services today.
</p>
        </div>
      </article>
      
    </div>
  );
};

export default Dashboard;
