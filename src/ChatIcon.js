import React, { useState } from 'react';
import './ChatIcon.css';
import Draggable from 'react-draggable';
import { ReactComponent as Logo } from './logo.svg';
import ReactDOMServer from 'react-dom/server';



function ChatIcon() {
  const [isOpen, setIsOpen] = useState(false);
  
  

 

  const togglePopup = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  

  return (
    
    <div className="chat-icon-container">
      <div className="chat-icon" onClick={togglePopup}>
        <Logo />
      </div>
      {isOpen && (
        <Draggable>
          <div className='chat-popup'>
            <div className="chat-popup-header">
              <button className="chat-popup-close" onClick={handleClose}>
                x
              </button>
              <button className="chat-popup-minimize" onClick={handleClose}>
                -
              </button>
            </div>

            
            <div className="resizer  ">
              <iframe className='resized'
                id="inlineFrameExample"
                title="Inline Frame Example"
                
                src='https://www.wikipedia.org/'
                
                
              ></iframe>
            </div>
            </div>
          
        </Draggable>
         
      )}
     
    </div>
    
  );

}

export default ChatIcon;
