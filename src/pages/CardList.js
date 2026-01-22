import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    try {
      setLoading(true);
      setError(null);
      const data = await getCards();
      setCards(data);
    } catch (err) {
      setError(err.message || "Failed to load cards");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(card) {
    const cardName = card.card_name || card.name || "this card";
    if (!window.confirm(`Delete "${cardName}"?`)) return;
    
    try {
      setDeletingId(card.id);
      await deleteCard(card.id);
      setCards(cards.filter(c => c.id !== card.id));
    } catch (err) {
      alert(`Failed to delete: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <main className="cardlist-loading">
        <h1>Card List</h1>
        <p>Loading cards...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="cardlist-error">
        <h1>Card List</h1>
        <p className="cardlist-error-text">Error: {error}</p>
        <button onClick={fetchCards} className="cardlist-retry-button">
          Retry
        </button>
      </main>
    );
  }

  return (
    <main className="cardlist-main">
      <div className="cardlist-header">
        <h1 className="cardlist-title">Card List</h1>
        <button
          onClick={() => navigate("/cards/new")}
          className="cardlist-add-button"
        >
          + Add New Card
        </button>
      </div>
      
      {cards.length === 0 ? (
        <p className="cardlist-empty">No cards found. Add your first card!</p>
      ) : (
        <div className="cardlist-grid">
          {cards.map(card => (
            <Card 
              key={card.id} 
              card={card} 
              onDelete={handleDelete}
              busy={deletingId === card.id}
            />
          ))}
        </div>
      )}
    </main>
  );
}