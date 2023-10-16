import React from 'react'
import { Route, Routes } from "react-router-dom";
import Map from './pages/Map';
import Login from './pages/Login';
import NavBar from './pages/NavBar';
import Admin from './pages/admin/Admin';
import Chart from './pages/admin/Chart';
import Footer from './pages/Footer';





export default function App() {
  return (
    <div>
      <NavBar ></NavBar>
<div>1234</div>

      <Routes>
      <Route path="/chart" element={<Chart />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<Map />} />
      <Route path="/login" element={<Login />} />
      </Routes>

      <Footer></Footer>
    </div>
  )
}
