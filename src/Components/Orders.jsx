import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

function Orders(){
    return (
        <div>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Inventory Management Orders</title>
            <link rel="stylesheet" href="App.css" />
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/achievements">Achievements</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/earnings">Earnings</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Orders;
