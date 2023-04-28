import "./App.css";
// import BarChart from './components/BarChart'
import React from "react";
// import FailedReq from "./components/FailedReq";
import Letancy from "./components/Letancy";
import ServerReq from "./components/ServerReq";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import HomePage from "./components/Home";
import FailedReq from "./components/FailedReq";
import ConnectData from "./components/ConnectApp";
import Signup from "./components/SignUP";
// import Login from "./components/login";
import ReliabilityScore from "./components/ReliabilityScore";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import RegisterApp from "./components/RegisterApp";
function App() {
  return (
    <>
      <div>
        <BrowserRouter forceRefresh={true}>
          <div>
            <Routes>
              <Route path="/home/:email" element={<HomePage />} />
              <Route path="/register/:email" element={<RegisterApp />} />

              <Route path="/failed" element={<FailedReq />} />
              <Route path="/server" element={<ServerReq />} />
              <Route path="/connect/:email" element={<ConnectData />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} />
              <Route path="/reliability" element={<ReliabilityScore />} />
              <Route path="/letancy" element={<Letancy />} />
              <Route path="/404" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
