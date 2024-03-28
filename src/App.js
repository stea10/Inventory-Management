import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


  function Website() {
  

    return (
      <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Inventory Management Dashboard</title>
  <link rel="stylesheet" href="style.css" />
  <header>
    <nav>
      <ul>
        <li><a href="#">Dashboard</a></li>

        <li><a href="#">Products</a></li>

        <li><a href="#">Orders</a></li>

        <li><a href="#">Earnings</a></li>

        <li><a href="achievements.js">Achievements</a></li>
      </ul>
    </nav>
    <h1>Inventory Management Dashboard</h1>
  </header>
  <div className="container">
    <div className="dashboard">
      <div className="card">
        <h2>Total Inventory</h2>
        <p>1000</p>
      </div>
      <div className="card">
        <h2>Low Stock Items</h2>
        <p>50</p>
      </div>
      <div className="card">
        <h2>Orders Pending</h2>
        <p>10</p>
      </div>
      <div className="card">
        <h2>Revenue</h2>
        <p>$100,000</p>
      </div>
      <div className="achievements">
        <h2>Achievements</h2>
        <div className="badge">Top Seller</div>
        <div className="badge">Efficient Inventory Manager</div>
        <div className="badge">Customer Satisfaction</div>
      </div>
    </div>
  </div>
</>

    
    );
}

export default Website;