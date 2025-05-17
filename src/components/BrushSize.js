import React from "react";

const BrushSize = ({ brushSize, setBrushSize, currentColor }) => {
  const sizeOptions = [2, 4, 6, 8, 10, 12, 16, 20, 24, 30];

  const handleSizeChange = (event) => {
    setBrushSize(parseInt(event.target.value));
  };

  return (
    <div className="brush-size-container">
      <div className="brush-size-header">
        <h3 className="text-lg font-medium">Brush Size</h3>
        <div 
          className="size-preview rounded-full"
          style={{
            width: `${brushSize}px`,
            height: `${brushSize}px`,
            backgroundColor: currentColor,
            border: currentColor === "#FFFFFF" ? "1px solid #ddd" : "none"
          }}
        />
      </div>

      <div className="brush-size-controls">
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={handleSizeChange}
          className="size-slider w-full"
        />
        
        <div className="size-presets">
          {sizeOptions.map((size) => (
            <button
              key={size}
              className={`preset-btn ${brushSize === size ? "active" : ""}`}
              onClick={() => setBrushSize(size)}
              title={`${size}px`}
            >
              <div 
                className="preset-preview rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: currentColor,
                  border: currentColor === "#FFFFFF" ? "1px solid #ddd" : "none"
                }}
              />
            </button>
          ))}
        </div>

        <div className="size-value">
          <span className="text-sm font-medium">{brushSize}px</span>
        </div>
      </div>
    </div>
  );
};

export default BrushSize;