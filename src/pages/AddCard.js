import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { addCard } from "../services/api";

export default function AddCard() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate])

  async function handleSubmit(cardData) {
    try {
      setBusy(true);
      setError(null);
      await addCard(cardData);
      navigate("/cards");
    } catch (err) {
      setError(err.message || "Failed to add card");
      setBusy(false);
    }
  }

  function handleCancel() {
    navigate("/cards");
  }

  return (
    <main className="addcard-main">
      <h1 className="addcard-title">Add New Card</h1>

      {error && (
        <div className="addcard-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      <CardForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        busy={busy}
      />
    </main>
  );
}