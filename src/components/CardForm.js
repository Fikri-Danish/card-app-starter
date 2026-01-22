import { useState } from "react";

export default function CardForm({ card, onSubmit, onCancel, busy }) {
  const [formData, setFormData] = useState({
    card_name: card?.card_name || "",
    card_pic: card?.card_pic || ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    // Validation
    if (!formData.card_name.trim()) {
      alert("Please enter a card name");
      return;
    }
    if (!formData.card_pic.trim()) {
      alert("Please enter an image URL");
      return;
    }

    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <div className="form-group">
        <label className="form-label">
          Card Name *
        </label>
        <input
          type="text"
          name="card_name"
          value={formData.card_name}
          onChange={handleChange}
          disabled={busy}
          placeholder="e.g., Lightning Bolt"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Image URL *
        </label>
        <input
          type="url"
          name="card_pic"
          value={formData.card_pic}
          onChange={handleChange}
          disabled={busy}
          placeholder="https://example.com/card.jpg"
          className="form-input"
        />
      </div>

      {formData.card_pic && (
        <div className="form-preview">
          <label className="form-label">
            Preview
          </label>
          <img
            src={formData.card_pic}
            alt="Card preview"
            onError={(e) => {
              e.target.style.display = "none";
            }}
            className="form-preview-image"
          />
        </div>
      )}

      <div className="form-actions">
        <button
          type="submit"
          disabled={busy}
          className="form-submit-button"
        >
          {busy ? "Saving..." : card ? "Update Card" : "Add Card"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="form-cancel-button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}