import { Link } from "react-router-dom";

export default function Card({ card, onDelete, busy }) {
  return (
    <div className="card-container">
      <img 
        src={card.card_pic} 
        alt={card.card_name}
        className="card-image"
      />
      
      <div className="card-body">
        <h3 className="card-title">
          {card.card_name}
        </h3>
        
        <p className="card-id">
          ID: {card.id}
        </p>

        <div className="card-actions">
          <Link
            to={`/cards/${card.id}/edit`}
            className="card-edit-button"
          >
            Edit
          </Link>
          
          {onDelete && (
            <button
              onClick={() => onDelete(card)}
              disabled={busy}
              className="card-delete-button"
            >
              {busy ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}