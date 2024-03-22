import "./dashboard.css";
import bgp1 from "../../assets/images/policebg.mp4";
import ser1 from "../../assets/icon/alert-em.png";
import ser2 from "../../assets/icon/fine.png";
import ser4 from "../../assets/icon/searchUser.png";
import ser5 from "../../assets/icon/message.png";

import ser6 from "../../assets/icon/missing.png";
import ser7 from "../../assets/icon/permit.png";
import ser8 from "../../assets/icon/calender.png";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="hero">
        <div className="left">
          <div className="PheroText">
            <Typography variant="h4">STREAMLINE</Typography>
            <Typography variant="h1">LEGAL</Typography>
            <Typography variant="h5">COLLABRATION</Typography>
          </div>
        </div>
        <div className="right">
          <video
            src={bgp1}
            type="video/mp4"
            playsInline="playsinline"
            autoPlay
            muted
            loop
            style={{}}
          ></video>
        </div>
      </div>
      <main>
        <div className="services">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Link to="./CaseDashboard" className="service">
                <div class="card-client">
                  <div class="Service-picture">
                    <img src={ser6} alt="img" />
                  </div>
                  <Typography variant="subtitle1" class="name-client">
                    CASE DASHBOARD
                  </Typography>
                </div>
              </Link>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Link to="./PermitApprovalPage" className="service">
                <div class="card-client">
                  <div class="Service-picture">
                    <img src={ser7} alt="img" />
                  </div>
                  <Typography variant="subtitle1" class="name-client">
                    Permit Request
                  </Typography>
                </div>
              </Link>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Link to="./MessageUser">
                <div className="service">
                  <div class="card-client">
                    <div class="Service-picture">
                      <img src={ser5} alt="img" />
                    </div>
                    <Typography variant="subtitle1" class="name-client">
                      Notify User
                    </Typography>
                  </div>
                </div>
              </Link>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Link to="./FineUser"className="service" >
                <div class="card-client">
                  <div class="Service-picture">
                    <img src={ser2} alt="img" />
                  </div>
                  <Typography variant="subtitle1" class="name-client">
                    Fine{" "}
                  </Typography>
                </div>
              </Link>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <div className="service">
                <Link to="./SearchUserPage">

              
                <div class="card-client">
                  <div class="Service-picture">
                    <img src={ser4} alt="img" />
                  </div>
                  <Typography variant="subtitle1" class="name-client">
                    Search User
                  </Typography>
                </div>
                </Link>
              </div>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Link to="./PoliceEmergencyRequestsPage" className="service">
                <div class="card-client">
                  <div class="Service-picture">
                    <img src={ser1} alt="img" />
                  </div>
                  <Typography variant="subtitle1" class="name-client">
                    Emergency Request
                  </Typography>
                </div>
              </Link>
            </Grid>
            {/* <Grid item xs={12} md={12} lg={12}>
            <Link to="./UpcomingEventsPage" >

              <div className="service">
                <div class="card-client">
                  <div class="Service-picture">
                    <img src={ser8} alt="img" />
                  </div>
                  <Typography variant="subtitle1" class="name-client">
                    Events
                  </Typography>
                </div>
              </div>
              </Link>
            </Grid> */}
          </Grid>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
