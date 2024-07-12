import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import "./App.css"; // Import the CSS file

function App() {
  const url = "https://quickeat-backend.onrender.com";
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="app-content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main-content">
          <div className="main-content-inner">
            <Routes>
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} />} />
              <Route path="/orders" element={<Orders url={url} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
