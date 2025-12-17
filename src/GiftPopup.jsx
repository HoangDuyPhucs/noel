import React from "react";
import "./SantaAnimation.css";

export default function GiftPopup({ onClose }) {
  return (
    <div className="popup-bg" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <img
          src="https://i.imgur.com/CMYQ6ZC.jpeg"
          alt="Merry Christmas"
          className="popup-img"
        />
        <h2>🎁 Merry Christmas 🎄</h2>
        <p>Chúc bạn một mùa giáng sinh an lành, hạnh phúc và tràn đầy yêu thương! 💖</p>
        <button className="close-btn" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}
