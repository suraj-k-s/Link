import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin/App";
import Guest from "./Guest/App";
import User from "./User/App";
import Police from "./PoliceStation/App";
import Lawyer from "./Lawyer/App";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/Admin/*" element={<Admin />} />
        <Route path="/*" element={<Guest />} />
        <Route path="/User/*" element={<User />} />
        <Route path="/police/*" element={<Police />} />
        <Route path="/Lawyer/*" element={<Lawyer />} />
      </Routes>
    </div>
  );
};

export default App;
