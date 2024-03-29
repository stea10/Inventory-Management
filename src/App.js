import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { db } from './firebase.js';
import Dashboard from './Components/Dashboard.jsx';
import Achievement from './Components/Achievements.jsx';
import Product from './Components/Products.jsx';
import Earnings from './Components/Earnings.jsx';
import Orders from './Components/Orders.jsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/achievements" element={<Achievement />} />
        <Route path="/products" element={<Product />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
