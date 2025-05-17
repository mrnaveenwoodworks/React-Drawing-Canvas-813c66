import React from "react";

const ColorPalette = ({ currentColor, setCurrentColor }) => {
  const colors = [
    "#000000", // Black
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#FFA500", // Orange
    "#800080", // Purple
    "#008000", // Dark Green
    "#A52A2A", // Brown
    "#808080", // Gray
    "#FFFFFF"  // White
  ];

  const handleColorSelect = (color) => {
    setCurrentColor(color);
  };

  return (
    <div className="color-palette-container">
      <div className="color-palette-title">Colors</div>
      <div className="color-palette">
        {colors.map((color) => (
          <button
            key={color}
            className={`color-option ${currentColor === color ? "active" : ""}`}
            style={{
              backgroundColor: color,
              border: color === "#FFFFFF" ? "1px solid #ddd" : "none"
            }}
            onClick={() => handleColorSelect(color)}
            title={color}
            aria-label={`Select ${color} color`}
          />
        ))}
        <input
          type="color"
          value={currentColor}
          onChange={(e) => handleColorSelect(e.target.value)}
          className="custom-color-picker"
          title="Custom color"
          aria-label="Select custom color"
        />
      </div>
      <div className="current-color-display">
        <span className="current-color-label">Selected Color:</span>
        <div
          className="current-color-preview"
          style={{
            backgroundColor: currentColor,
            border: currentColor === "#FFFFFF" ? "1px solid #ddd" : "none"
          }}
        />
        <span className="current-color-value">{currentColor}</span>
      </div>
    </div>
  );
};

export default ColorPalette;