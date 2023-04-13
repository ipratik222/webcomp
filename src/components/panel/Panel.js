import React, { useRef,useState,useEffect } from 'react';
import PanelHeader from './components/PanelHeader';
import Resizer from './components/Resizer';

import { Direction } from './components/Resizer/constants';
import { ReactComponent as Logo } from '../../logo.svg';

import './Panel.css';
import Draggable from 'react-draggable';

const Panel = ({onDrag}) => {
  const panelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const nodeRef = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.addEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const ratio = window.devicePixelRatio

    const handleMouseMove = (e) => onDrag(e.movementX / ratio, e.movementY / ratio);

    if (mouseDown) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseDown, onDrag]);

  const handleMouseDown = () => setMouseDown(true);

  const togglePopup = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };


  const handleDrag = (movementX, movementY) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { x, y } = panel.getBoundingClientRect();

    panel.style.left = `${x + movementX}px`;
    panel.style.top = `${y + movementY}px`;
  };

  const handleResize = (direction, movementX, movementY) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { width, height, x, y } = panel.getBoundingClientRect();

    const resizeTop = () => {
      panel.style.height = `${height - movementY}px`;
      panel.style.top = `${y + movementY}px`;
    };

    const resizeRight = () => {
      panel.style.width = `${width + movementX}px`;
    };

    const resizeBottom = () => {
      panel.style.height = `${height + movementY}px`;
      
    };

    const resizeLeft = () => {
      panel.style.width = `${width - movementX}px`;
      panel.style.left = `${x + movementX}px`;
    };

    switch (direction) {
      case Direction.TopLeft:
        resizeTop();
        resizeLeft();
        break;

      case Direction.Top:
        resizeTop();
        break;

      case Direction.TopRight:
        resizeTop();
        resizeRight();
        break;

      case Direction.Right:
        resizeRight();
        break;

      case Direction.BottomRight:
        resizeBottom();
        resizeRight();
        break;

      case Direction.Bottom:
        resizeBottom();
        break;

      case Direction.BottomLeft:
        resizeBottom();
        resizeLeft();
        break;

      case Direction.Left:
        resizeLeft();
        break;

      default:
        break;
      }
  };

  return (
    <div className="chat-icon-container">
    <div className="chat-icon" onClick={togglePopup}>
      <Logo />
    </div>
    {isOpen && (
      
      
        <div className="panel" ref={panelRef}>
         
        
            
         
      <div className="panel__container">
        
      <div className="chat-popup-header">
              <button className="chat-popup-close" onClick={handleClose}>
                x
              </button>
              <button className="chat-popup-minimize" onClick={handleClose}>
                -
              </button>
            </div>
            
            <div className="resizer">
              <iframe sandbox='allow-forms alow-modals'
                className='resized'
                id="inlineFrameExample"
                title="Inline Frame Example"
                src='https://google.com/'
              ></iframe>
            </div>
      <div className="panel__content">
      
            
        <Resizer onResize={handleResize} />
        
        
        

        
        
      

         
        </div>
      </div>
      
    </div>
    
   
   
     
    )}
  </div>
 
  
  );
};

export default Panel;


