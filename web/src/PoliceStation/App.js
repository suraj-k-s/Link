import React from "react";
import { Route, Routes } from "react-router-dom";
import Topbar from "./Components/Topbar/Topbar";

import Footer from "./Components/Footer/Footer";
import TC from "../Admin/Pages/T&C/T&C";
import Privacy from "../Admin/Pages/Privacy/Privacy";
import CaseDashboard from "./pages/CaseDashboard/CaseDashboard";
import RegisterCaseForm from "./pages/RegisterCaseForm/RegisterCaseForm";
import SearchCases from "./pages/SearchCases/SearchCases";
import PermitApprovalPage from "./pages/PermitApprovalPage/PermitApprovalPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import PoliceEmergencyRequestsPage from "./pages/PoliceEmergencyRequestsPage/PoliceEmergencyRequestsPage";
import "./App.css";
import ExistingCase from "./pages/ExistingCase/ExistingCase";
import ViewCase from "./pages/ViewCase/ViewCase";
import NewCase from "./pages/NewCase/NewCase";
import ClosedCases from "./pages/ClosedCases/ClosedCases";
import MessageUser from "./pages/MessageUser/MessageUser";
import UpcomingEventsPage from "./pages/UpcomingEventsPage/UpcomingEventsPage";
import SearchUserPage from "./pages/UserSearchPage/UserSearchPage";
import FineUser from "./pages/FineUser/FineUser";
const App = () => {
  return (
    <div className="app">
      {" "}
      <Topbar />
      <div className="appcontent">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Topbar" element={<Topbar />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/Terms&Conditions" element={<TC />} />
          <Route path="/Privacy-Policy" element={<Privacy />} />
          <Route path="/CaseDashboard" element={<CaseDashboard />} />
          <Route path="/RegisterCaseForm" element={<RegisterCaseForm />} />
          <Route path="/SearchCases" element={<SearchCases />} />
          <Route path="/PermitApprovalPage" element={<PermitApprovalPage />} />
          <Route path="/PoliceEmergencyRequestsPage"element={<PoliceEmergencyRequestsPage />} />
          <Route path="/ExistingCase"element={<ExistingCase />} />
          <Route path="/ViewCase/:id"element={<ViewCase />} />
          <Route path="NewCase"element={<NewCase />} />
          <Route path="ClosedCases"element={<ClosedCases />} />
          <Route path="MessageUser"element={<MessageUser />} />
          <Route path="UpcomingEventsPage"element={<UpcomingEventsPage />} />
          <Route path="SearchUserPage"element={<SearchUserPage />} />
          <Route path="FineUser"element={<FineUser />} />
          
          
          
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
