import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { db } from '../firebase';

function Product(){

    const [products, setProducts] = useState([]);

    

    return (
        <div>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Inventory Management Products</title>
            <link rel="stylesheet" href="App.css" />
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/achievements">Achievements</Link></li>
                        <li><Link to="/orders">Orders</Link></li>
                        <li><Link to="/earnings">Earnings</Link></li>
                    </ul>
                </nav>
                <h1>Products</h1>
            </header>
            <div className="container">
                <div className="Product List">  
                   <h1>Product List</h1>
                   
                </div>

            </div>
        </div>
    );
}

export default Product;
