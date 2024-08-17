import React from 'react';
import PropTypes from 'prop-types';
import Text from '../atoms/Text';

// Chemin vers l'image de remplacement dans le dossier public
const placeholderImage = '/Noimage.jpg'; // Assurez-vous que le chemin correspond à l'emplacement de votre image dans le dossier public

const PartnerCard = ({ name, logo, link, description }) => {
  return (
    <div className="partner-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-6 text-center">
      <img
        src={logo || placeholderImage}
        alt={name}
        className="mx-auto mb-4 h-24 object-cover"
        loading="lazy"
      />
      <Text type="h3" content={name} className="text-xl font-semibold h3-class" />
      <Text type="p" content={description} className="mt-2 p-class" />
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 mt-2 block">
        Visiter le site
      </a>
    </div>
  );
};

PartnerCard.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string,
  link: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default PartnerCard;
