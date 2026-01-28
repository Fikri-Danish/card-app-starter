import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Check if user is logged in
  const token = localStorage.getItem("token");
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/"); // or /login
  }

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

          {token ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}