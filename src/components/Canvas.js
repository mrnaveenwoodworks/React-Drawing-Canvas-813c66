import React, { useRef, useEffect, useState } from "react";
import {
  TOOL_TYPES,
  startDrawing,
  draw,
  drawShape,
  clearCanvas,
  getCoordinates,
  resizeCanvas,
  updateDrawingProperties
} from "../utils/drawingUtils";

const Canvas = ({ selectedTool, currentColor, brushSize, onSaveCanvas }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const context = canvas.getContext("2d");
    context.scale(1, 1);
    contextRef.current = context;
    
    updateDrawingProperties(context, currentColor, brushSize);
    
    const handleResize = () => {
      if (canvas && contextRef.current) {
        const imageData = contextRef.current.getImageData(0, 0, canvas.width, canvas.height);
        resizeCanvas(canvas, contextRef.current);
        contextRef.current.putImageData(imageData, 0, 0);
        updateDrawingProperties(contextRef.current, currentColor, brushSize);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentColor, brushSize]);
  
  useEffect(() => {
    if (contextRef.current) {
      updateDrawingProperties(contextRef.current, currentColor, brushSize);
    }
  }, [currentColor, brushSize]);
  
  const handleMouseDown = (event) => {
    const { x, y } = getCoordinates(event, canvasRef.current);
    setStartPoint({ x, y });
    
    if (selectedTool === TOOL_TYPES.PENCIL || selectedTool === TOOL_TYPES.ERASER) {
      setIsDrawing(true);
      startDrawing(contextRef.current, x, y);
    } else if (
      selectedTool === TOOL_TYPES.LINE ||
      selectedTool === TOOL_TYPES.RECTANGLE ||
      selectedTool === TOOL_TYPES.CIRCLE
    ) {
      setIsDrawing(true);
    }
  };
  
  const handleMouseMove = (event) => {
    if (!isDrawing) return;
    
    const { x, y } = getCoordinates(event, canvasRef.current);
    
    if (selectedTool === TOOL_TYPES.PENCIL || selectedTool === TOOL_TYPES.ERASER) {
      draw(
        contextRef.current,
        x,
        y,
        selectedTool === TOOL_TYPES.ERASER
      );
    }
  };
  
  const handleMouseUp = (event) => {
    if (!isDrawing) return;
    
    if (
      selectedTool === TOOL_TYPES.LINE ||
      selectedTool === TOOL_TYPES.RECTANGLE ||
      selectedTool === TOOL_TYPES.CIRCLE
    ) {
      const { x, y } = getCoordinates(event, canvasRef.current);
      drawShape(
        contextRef.current,
        startPoint.x,
        startPoint.y,
        x,
        y,
        selectedTool,
        currentColor
      );
    }
    
    setIsDrawing(false);
  };
  
  const handleMouseLeave = () => {
    if (isDrawing && (selectedTool === TOOL_TYPES.PENCIL || selectedTool === TOOL_TYPES.ERASER)) {
      setIsDrawing(false);
    }
  };
  
  const handleClearCanvas = () => {
    clearCanvas(canvasRef.current, contextRef.current);
  };
  
  const handleSaveCanvas = () => {
    if (canvasRef.current && onSaveCanvas) {
      const dataUrl = canvasRef.current.toDataURL("image/png");
      onSaveCanvas(dataUrl);
    }
  };
  
  const handleTouchStart = (event) => {
    event.preventDefault();
    handleMouseDown(event);
  };
  
  const handleTouchMove = (event) => {
    event.preventDefault();
    handleMouseMove(event);
  };
  
  const handleTouchEnd = (event) => {
    event.preventDefault();
    handleMouseUp(event);
  };

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        className="drawing-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <div className="canvas-actions">
        <button 
          className="action-btn danger"
          onClick={handleClearCanvas}
        >
          Clear Canvas
        </button>
        <button 
          className="action-btn"
          onClick={handleSaveCanvas}
        >
          Save Drawing
        </button>
      </div>
    </div>
  );
};

export default Canvas;