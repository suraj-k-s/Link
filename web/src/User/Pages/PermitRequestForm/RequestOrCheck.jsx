import React from 'react'
import { Link } from 'react-router-dom'
import ser3 from "../../assets/icon/Permit/request.png"
import ser6 from "../../assets/icon/Permit/status.png"

const RequestOrCheck = () => {
  return (
    <div >
        <div className="services">
          
          <Link to ="../PermitRequestForm">

          <div className="service">
            <div class="card-client">
              <div class="Service-picture">
                <img src={ser3} alt="img" />
              </div>
              <p class="name-client"> Request</p>
            </div>
          </div>
          </Link>
          <div className="service">
            <Link to= "../PermitStatus">

            <div className="sTitle"></div>
            <div class="card-client">
              <div class="Service-picture">
                <img src={ser6} alt="img" />
              </div>
              <p class="name-client"> Check Status</p>
            </div>
            </Link>
          </div>
          </div>
    </div>
  )
}

export default RequestOrCheck