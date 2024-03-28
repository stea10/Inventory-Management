import './App.css';
function Website() {

    return (<>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Inventory Management Achievement</title>
        <link rel="stylesheet" href="App.css" />
        <header>
          <nav>
            <ul>
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
              <li>
                <a href="#">Orders</a>
              </li>
              <li>
                <a href="#">Earnings</a>
              </li>
            </ul>
          </nav>
          <h1>Inventory Management Dashboard</h1>
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
    );      
    }
export default Website;