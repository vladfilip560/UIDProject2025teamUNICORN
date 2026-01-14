import React from 'react';
import './KeyboardShortcuts.css';

const KeyboardShortcuts = () => {
  return (
    <div className="keyboard-shortcuts">
      <h4>Keyboard Shortcuts:</h4>
      <ul>
        <li><span className="key">A</span> or <span className="key">←</span> Skip</li>
        <li><span className="key">D</span> or <span className="key">→</span> Like</li>
        <li><span className="key">Space</span> or <span className="key">I</span> Info</li>
      </ul>
    </div>
  );
};

export default KeyboardShortcuts;