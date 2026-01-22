import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardForm from "../components/CardForm";
import { getCards, updateCard } from "../services/api";

export default function EditCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCard();
  }, [id]);

  async function fetchCard() {
    try {
      setLoading(true);
      setError(null);
      const cards = await getCards();
      const foundCard = cards.find(c => c.id === parseInt(id));
      
      if (!foundCard) {
        setError("Card not found");
      } else {
        setCard(foundCard);
      }
    } catch (err) {
      setError(err.message || "Failed to load card");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(cardData) {
    try {
      setBusy(true);
      setError(null);
      await updateCard(id, cardData);
      navigate("/cards");
    } catch (err) {
      setError(err.message || "Failed to update card");
      setBusy(false);
    }
  }

  function handleCancel() {
    navigate("/cards");
  }

  if (loading) {
    return (
      <main className="editcard-loading">
        <h1>Edit Card</h1>
        <p>Loading card...</p>
      </main>
    );
  }

  if (error && !card) {
    return (
      <main className="editcard-notfound">
        <h1>Edit Card</h1>
        <p className="cardlist-error-text">Error: {error}</p>
        <button 
          onClick={() => navigate("/cards")}
          className="editcard-back-button"
        >
          Back to Card List
        </button>
      </main>
    );
  }

  return (
    <main className="editcard-main">
      <h1 className="editcard-title">Edit Card</h1>
      
      {error && (
        <div className="editcard-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {card && (
        <CardForm 
          card={card}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          busy={busy}
        />
      )}
    </main>
  );
}