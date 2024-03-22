import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Topbar from "./Components/Topbar/Topbar";
import Footer from "./Components/Footer/Footer";
import LawyerClientsPage from "./Pages/LawyerClientsPage/LawyerClientsPage";
import LawyerAcceptedCasesPage from "./Pages/LawyerAcceptedCasesPage/LawyerAcceptedCasesPage";
import LawyerAppointmentsPage from "./Pages/LawyerAppointmentsPage/LawyerAppointmentsPage";
import LawyerSearchUserPage from "./Pages/LawyerSearchUserPage/LawyerSearchUserPage";
import LawyerAcceptDeclineCasePage from "./Pages/LawyerAcceptDeclineCasePage/LawyerAcceptDeclineCasePage";
import LawyerProfile from "./Pages/LawyerProfile/LawyerProfile";
import EditLawyerProfile from "./Pages/EditLawyerProfile/EditLawyerProfile";
import ClientRequestsPage from "./Pages/ClientRequestsPage/ClientRequestsPage";

const App = () => {
  return (
    <div>
      <Topbar />
      <div>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
        
          <Route path="/clients" element={<LawyerClientsPage />} />
          <Route path="/MyCases" element={<LawyerAcceptedCasesPage />} />
          <Route path="/Appiontments" element={<LawyerAppointmentsPage />} />
          <Route path="/Search" element={<LawyerSearchUserPage />} />
          <Route path="/CaseRequests" element={<LawyerAcceptDeclineCasePage />} />
          <Route path="/LawyerProfile" element={<LawyerProfile />} />
          <Route path="/EditLawyerProfile" element={<EditLawyerProfile />} />
          <Route path="/ClientRequestsPage" element={<ClientRequestsPage />} />
          
          
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
