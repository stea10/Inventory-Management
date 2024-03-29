import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

function Achievement() {
    return <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Inventory Management Achievement</title>
        <link rel="stylesheet" href="App.css" />
        <header>
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/earnings">Earnings</Link></li>
          </ul>
        </nav>
            <h1>Inventory Management Achievement</h1>
        </header>
        <div className="container">
            <div className="achievements">
                <div className="achievement">
                    <img src="badge1.png" alt="Achievement Badge" />
                    <h2>Inventory Guru</h2>
                    <p>Successfully manage items to inventory.</p>
                    <span className="progress">1/10</span>
                </div>
                <div className="achievement">
                    <img src="badge2.png" alt="Achievement Badge" />
                    <h2>Inventory control</h2>
                    <p> Implement an inventory control system that reduces excess stock.</p>
                    <span className="progress">5/20</span>
                </div>
                <div className="achievement">
                    <img src="badge3.png" alt="Achievement Badge" />
                    <h2>Restocking Masestro</h2>
                    <p>
                        Successfully restock inventory items within 24 hours of reaching the
                        reorder point
                    </p>
                    <span className="progress">40%</span>
                </div>
            </div>
        </div>
    </>
}



export default Achievement;
