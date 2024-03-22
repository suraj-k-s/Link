import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register/Register";
import LawyerRegister from "./Pages/LawyerRegister/LawyerRegister";
import LoginTemplate from "./Pages/Home/Template";
import Index from "./Pages/index/Index";




const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/*" element={<LoginTemplate />} />
        <Route path="/i" element={<Index />} />
        

      
        

       

      </Routes>
    </div>
  );
};

export default App;
