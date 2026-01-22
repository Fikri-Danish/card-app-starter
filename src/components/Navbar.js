import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <strong className="navbar-brand">
          📇 Card App
        </strong>
        
        <nav className="navbar-nav">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/cards"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Card List
          </NavLink>
          
          <NavLink 
            to="/cards/new"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Add Card
          </NavLink>
        </nav>
      </div>
    </header>
  );
}