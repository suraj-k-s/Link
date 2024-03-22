import React from "react";
import { Route, Routes } from "react-router-dom";
import Topbar from "./Components/Topbar/Topbar";
import EmergencyRequestPage from "./Pages/EmergencyRequestPage/EmergencyRequestPage";
import Footer from "../PoliceStation/Components/Footer/Footer";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PermitRequestForm from "./Pages/PermitRequestForm/PermitRequestForm";
import ReportMissingPersonPage from "./Pages/ReportMissingPersonPage/ReportMissingPersonPage";
import "./App.css";
import PoliceComplaintPage from "./Pages/PoliceComplaintPage/PoliceComplaintPage";
import FinePaymentPage from "./Pages/FinePaymentPage/FinePaymentPage";
import PassportVerificationDates from "./Pages/PassportVerificationDates/PassportVerificationDates";
import PoliceStationSearch from "./Pages/PoliceStationSearch/PoliceStationSearch";
import LawyerPage from "./Pages/LawyerPage/LawyerPage";
import AllLawyersPage from "./Pages/AllLawyersPage/AllLawyersPage";
import MyLawyersPage from "./Pages/myLawyersData/myLawyersData";
import MyCasesPage from "./Pages/MyCasesPage/MyCasesPage";
import PolicePage from "./Pages/PolicePage/PolicePage";
import UserRequestLawyerPage from "./Pages/UserRequestLawyer/UserRequestLawyerPage";
import UpcomingEventsPage from "./Pages/UpcomingEventsPage/UpcomingEventsPage";
import RequestOrCheck from "./Pages/PermitRequestForm/RequestOrCheck";
import PermitStatus from "./Pages/PermitRequestForm/PermitStatus";
import PaymentPage from "./Pages/FinePaymentPage/PaymentPage";
import CaseDetailsPage from "./Pages/MyCasesPage/CaseDetailsPage";
import FetchMessagesPage from "./Pages/FetchMessagesPage/FetchMessagesPage";
const App = () => {
  return (
    <div className="UniqPolice">
      <Topbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/permit" element={<PermitRequestForm />} />
        {/* <Route path="/EmergencyRequest" element={<EmergencyRequestPage />} /> */}
        <Route
          path="/ReportMissingPersonPage"
          element={<ReportMissingPersonPage />}
        />
        <Route path="/PermitRequestForm" element={<PermitRequestForm />} />
        <Route path="/PoliceComplaintPage" element={<PoliceComplaintPage />} />
        <Route path="/FinePaymentPage" element={<FinePaymentPage />} />
        <Route
          path="/PassportVerificationDates"
          element={<PassportVerificationDates />}
        />

        <Route path="/PermitStatus" element={<PermitStatus />} />
        <Route path="/RequestOrCheck" element={<RequestOrCheck />} />
        <Route path="/PoliceStationSearch" element={<PoliceStationSearch />} />
        <Route path="/LawyerPage" element={<LawyerPage />} />
        <Route path="/AllLawyersPage" element={<AllLawyersPage />} />
        <Route path="/MyLawyersPage" element={<MyLawyersPage />} />
        <Route path="/MyCasesPage" element={<MyCasesPage />} />
        <Route path="/PolicePage" element={<PolicePage />} />
        <Route
          path="/UserRequestLawyerPage"
          element={<UserRequestLawyerPage />}
        />
        <Route path="/UpcomingEvents" element={<UpcomingEventsPage />} />

        <Route path="/Topbar" element={<Topbar />} />
        <Route path="/PaymentPage/:id" element={<PaymentPage />} />
        <Route path="/details/:id" element={<CaseDetailsPage />} />
        <Route path="/FetchMessagesPage" element={<FetchMessagesPage />} />
        
        CaseDetailsPage
        
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
