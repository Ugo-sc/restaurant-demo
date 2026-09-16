import { useState } from "react";
import { BAG_OPTIONS } from "../data";

export default function BagChoiceModal({ onConfirm, onCancel }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-step">
          <h2 className="modal-title">Choose your delivery bag</h2>
          <div className="bag-option-list">
            {BAG_OPTIONS.map((option) => (
              <button
                type="button"
                key={option.id}
                className={`bag-option-card${selected === option.id ? " bag-option-card--selected" : ""}`}
                onClick={() => setSelected(option.id)}
              >
                <img
                  className="bag-option-image"
                  src={`${import.meta.env.BASE_URL}${option.image}`}
                  alt={option.label}
                />
                <div className="bag-option-info">
                  <span className="bag-option-name">{option.label}</span>
                  <span className="bag-option-desc">{option.description}</span>
                  <span className="bag-option-price">
                    {option.price > 0 ? `+€${option.price.toFixed(2)}` : "Free"}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="modal-actions">
            <button className="modal-btn-secondary" onClick={onCancel}>Cancel</button>
            <button
              className="modal-btn-primary"
              disabled={selected === null}
              onClick={() => onConfirm(selected)}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
