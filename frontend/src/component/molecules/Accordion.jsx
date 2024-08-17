import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 transition-all duration-300">
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full px-4 py-2 text-lg font-bold text-left bg-custom-gray rounded-t-lg focus:outline-none transition-colors duration-300 hover:bg-gray-300"
        aria-expanded={isOpen}
      >
        <span className="font-concert-title text-black">{title}</span>
        <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
      </button>
      {isOpen && (
        <div className="px-4 py-4 bg-custom-gray border-t border-border-gray rounded-b-lg text-black">
          <div className="prose-sm w-full max-w-none">{children}</div>
        </div>
      )}
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Accordion;
