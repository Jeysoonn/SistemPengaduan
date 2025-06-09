import React from "react";
import "./assets/tailwind.css"
import DashboardBsti from './pages/BSTI/Dashboard';
import { Route, Routes } from 'react-router-dom';
// import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardBsti />} />
      </Routes>
    </>
  )
}

export default App
