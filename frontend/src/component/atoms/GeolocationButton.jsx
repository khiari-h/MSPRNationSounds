import React from 'react';
import PropTypes from 'prop-types';

const GeolocationButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="geolocation-button" 
      aria-label="Localiser ma position" 
    >
      📍
    </button>
  );
};

GeolocationButton.propTypes = {
  onClick: PropTypes.func.isRequired, 
};

export default GeolocationButton;
