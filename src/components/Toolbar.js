import React from "react";
import { TOOL_TYPES } from "../utils/drawingUtils";

const Toolbar = ({ selectedTool, setSelectedTool }) => {
  const tools = [
    {
      id: TOOL_TYPES.PENCIL,
      name: "Pencil",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="152" y="40" width="64" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="152" y1="88" x2="180" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="152" y1="128" x2="180" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="152" y1="168" x2="180" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M40,64,72,32l32,32V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="104" y1="80" x2="40" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="104" y1="176" x2="40" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>,
      tooltip: "Free drawing"
    },
    {
      id: TOOL_TYPES.ERASER,
      name: "Eraser",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="96" y1="104" x2="160" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M112,216,219.31,108.69a16,16,0,0,0,0-22.63L177.94,44.69a16,16,0,0,0-22.63,0L36.69,163.31a16,16,0,0,0,0,22.63L66.75,216H216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>,
      tooltip: "Erase parts of your drawing"
    },
    {
      id: TOOL_TYPES.LINE,
      name: "Line",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="128" y1="24" x2="128" y2="232" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>,
      tooltip: "Draw straight lines"
    },
    {
      id: TOOL_TYPES.RECTANGLE,
      name: "Rectangle",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="32" y="48" width="192" height="160" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>,
      tooltip: "Draw rectangles"
    },
    {
      id: TOOL_TYPES.CIRCLE,
      name: "Circle",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="32" x2="128" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="176" y1="44.84" x2="176" y2="211.16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>,
      tooltip: "Draw circles"
    }
  ];

  return (
    <div className="toolbar">
      <div className="toolbar-title">Drawing Tools</div>
      <div className="toolbar-buttons">
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={`tool-btn ${selectedTool === tool.id ? "active" : ""}`}
            onClick={() => setSelectedTool(tool.id)}
            title={tool.tooltip}
          >
            <span className="tool-icon">{tool.icon}</span>
            <span className="tool-name">{tool.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;