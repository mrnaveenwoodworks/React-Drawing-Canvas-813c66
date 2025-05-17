import React, { useState, useCallback } from "react";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import ColorPalette from "./components/ColorPalette";
import { TOOL_TYPES } from "./utils/drawingUtils";

function App() {
  const [drawingProperties, setDrawingProperties] = useState({
    tool: TOOL_TYPES.PENCIL,
    color: "#000000",
    brushSize: 2
  });

  // Memoized callback functions to prevent unnecessary re-renders
  const handleToolChange = useCallback((tool) => {
    setDrawingProperties(prev => ({
      ...prev,
      tool
    }));
  }, []);

  const handleColorChange = useCallback((color) => {
    setDrawingProperties(prev => ({
      ...prev,
      color
    }));
  }, []);

  const handleBrushSizeChange = useCallback((size) => {
    setDrawingProperties(prev => ({
      ...prev,
      brushSize: parseInt(size)
    }));
  }, []);

  const handleSaveCanvas = useCallback((dataUrl) => {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = dataUrl;
    link.click();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="text-3xl font-bold mb-4">React Drawing Canvas</h1>
      </header>

      <div className="controls-container">
        <Toolbar 
          selectedTool={drawingProperties.tool} 
          setSelectedTool={handleToolChange} 
        />
        
        <ColorPalette 
          currentColor={drawingProperties.color} 
          setCurrentColor={handleColorChange} 
        />

        <div className="brush-size">
          <label htmlFor="brush-size">Brush Size:</label>
          <input
            id="brush-size"
            type="range"
            min="1"
            max="50"
            value={drawingProperties.brushSize}
            onChange={(e) => handleBrushSizeChange(e.target.value)}
          />
          <span>{drawingProperties.brushSize}px</span>
          <div 
            className="brush-size-preview"
            style={{
              width: `${drawingProperties.brushSize}px`,
              height: `${drawingProperties.brushSize}px`,
              backgroundColor: drawingProperties.color
            }}
          />
        </div>
      </div>

      <Canvas
        selectedTool={drawingProperties.tool}
        currentColor={drawingProperties.color}
        brushSize={drawingProperties.brushSize}
        onSaveCanvas={handleSaveCanvas}
      />

      <footer className="app-footer mt-4 text-center text-gray-600">
        <p>Draw something amazing! Click "Save Drawing" to download your artwork.</p>
      </footer>
    </div>
  );
}

export default App;