//import React from 'react';
import './ImageButton.css';

const ImageButton = ({ imageSrc, onClick, alt = "button" , tooltip, active}) => {
  const buttonClassName = `image-button ${active ? 'image-button-active' : ''}`;
  
  return (
    <div className="image-button-wrapper">
      <button className={buttonClassName} onClick={onClick}>
        <img src={imageSrc} alt={alt} className="button-image" />
      </button>
      {tooltip && <span className="tooltip-text">{tooltip}</span>}
    </div>
  );
};

export default ImageButton;
