import React, { useState } from "react";
import './ChatIcon.css';

function ResizableDiv() {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startWidth, setStartWidth] = useState(width);
  const [startHeight, setStartHeight] = useState(height);

  function handleMouseDown(e) {
    setStartX(e.clientX);
    setStartY(e.clientY);
    setStartWidth(width);
    setStartHeight(height);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(e) {
    setWidth(startWidth + e.clientX - startX);
    setHeight(startHeight + e.clientY - startY);
  }

  function handleMouseUp() {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  return (
    <div
      className="resizable-div"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
         <iframe id="inlineFrameExample"
    title="Inline Frame Example"
    width="400"
    height="300"
    src="https://reactjs.org/docs/faq-styling.html">
</iframe>
      <div className="resize-arrow top-left" onMouseDown={handleMouseDown} />
      <div className="resize-arrow bottom-right" onMouseDown={handleMouseDown} />
      <div className="resize-arrow top-right" onMouseDown={handleMouseDown} />
      <div className="resize-arrow bottom-left" onMouseDown={handleMouseDown} />
    </div>
  );
}

export default ResizableDiv;