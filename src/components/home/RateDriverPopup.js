import React, { useState } from "react";

const RateDriverPopup = ({ onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // Perform validation or other actions before submitting
    onSubmit({ rating, comment });
  };

  return (
    <div className="rate-driver-popup">
      <h3>Rate Driver</h3>
      <label>
        Rating:
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={handleRatingChange}
        />
      </label>
      <label>
        Comment:
        <textarea value={comment} onChange={handleCommentChange} />
      </label>
      <div className="popup-buttons">
        <button onClick={handleSubmit}>Rate</button>
        <button onClick={onClose}>Not Now</button>
      </div>
    </div>
  );
};

export default RateDriverPopup;
