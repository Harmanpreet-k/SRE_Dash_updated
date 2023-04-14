import "./App.css";
// import BarChart from './components/BarChart'
import React from "react";
// import FailedReq from "./components/FailedReq";
import Letancy from "./components/Letancy";
import ServerReq from "./components/ServerReq";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home";
import FailedReq from "./components/FailedReq";
import ConnectData from "./components/ConnectApp";
import Signup from "./components/SignUP";
// import Login from "./components/login";
import Login from "./components/Login";
function App() {
  return (
    <>
      <div>
        <Router>
          <div>
            <Routes>
              <Route path="/Home" element={<HomePage />} />
              <Route path="/failed" element={<FailedReq />} />
              <Route path="/Server" element={<ServerReq />} />
              <Route path="/Connect" element={<ConnectData />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} />

              <Route path="/Letancy" element={<Letancy />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
