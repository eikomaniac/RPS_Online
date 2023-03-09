import { Outlet, Link } from "react-router-dom";
import rpsLogo from "./images/rps.png";

function Layout() {
  let css = `
    .navbar-logo {
      height: 1.5em;
      margin: 10px;
      vertical-align: middle;
    }
  `;
  return (
  <>
    <style>
      {css}
    </style>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand"> <img className="navbar-logo" src={rpsLogo} alt="Rock Paper Scissors logo" />RPS Online</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="active nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/stats" className="active nav-link">Stats</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Outlet />
  </>
  );
}

export default Layout;