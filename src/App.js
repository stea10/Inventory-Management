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

import Website from './Components/Website.jsx';
import Achievement from './Components/Achievements.jsx';

  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Website />} />
        <Route path="/achievements" element={<Achievement />} />
        {/* Add more routes for other pages if needed */}
      </Routes>
    </Router>
  );
}

export default App;
