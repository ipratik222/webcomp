import ChatIcon from "./ChatIcon";
import Draggable from 'react-draggable';
import React, { useState } from 'react';

function popup(props) {
    return (
      <Draggable handle=".popup-header">
        <ChatIcon />
      </Draggable>
    );
  }

export default popup;