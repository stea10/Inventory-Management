import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

function Earnings(){
    return (
        <div>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Inventory Management Earnings</title>
            <link rel="stylesheet" href="App.css" />
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/achievements">Achievements</Link></li>
                        <li><Link to="/orders">Orders</Link></li>
                        <li><Link to="/products">Products</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Earnings;
