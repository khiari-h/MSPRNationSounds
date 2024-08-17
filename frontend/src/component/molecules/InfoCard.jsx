import React from 'react';
import PropTypes from 'prop-types';
import Image from '../atoms/Image';

const placeholderImage = '/Noimage.jpg';

const InfoCard = ({ title, description, image, additionalInfo, link, type }) => {
  return (
    <div className={`bg-white border ${type === 'schedule' ? 'border-custom-blue-500' : 'border-gray-300'} rounded-lg shadow-lg overflow-hidden`}>
      <Image 
        src={image || placeholderImage} 
        alt={title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3 className="font-concert-title text-black text-xl font-bold mb-2">{title}</h3>
        <p className="font-concert-description text-gray-700 text-base mb-4">{description}</p>
        {additionalInfo && (
          <p className="font-concert-description text-gray-500 text-sm mb-2">{additionalInfo}</p>
        )}
        {link && (
          <a href={link} className="text-blue-500 hover:underline">
            En savoir plus
          </a>
        )}
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  additionalInfo: PropTypes.string,
  link: PropTypes.string,
  type: PropTypes.string,
};

export default InfoCard;
