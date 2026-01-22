import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home-main">
      <div className="home-container">
        <h1 className="home-title">
          📇 Card Manager
        </h1>
        
        <p className="home-description">
          Welcome to your online card management system! 
          Create, view, edit, and organize your cards all in one place.
        </p>

        <div className="home-instructions">
          <h2>Getting Started:</h2>
          <ul>
            <li>View all your cards in the Card List</li>
            <li>Add new cards with custom information</li>
            <li>Edit existing cards to update details</li>
            <li>Delete cards you no longer need</li>
          </ul>
        </div>

        <Link to="/cards" className="home-cta-button">
          View My Cards →
        </Link>

        <p className="home-footer-text">
          Your cards are securely stored and always accessible
        </p>
      </div>
    </main>
  );
}