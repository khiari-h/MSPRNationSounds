import React, { useState, useCallback } from 'react';
import axiosConfig from '../../config/axiosConfig'; 

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    type: '',
    eventName: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosConfig.post('/path-to-your-registration-endpoint', formData); // Remplacez par l'URL de votre API
      setSuccessMessage('Inscription réussie ! Merci de vous être inscrit.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
      setSuccessMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-global shadow-md rounded p-6 mb-6 grid grid-cols-1 md:grid-cols-5 gap-4 w-full max-w-4xl mx-auto"
      aria-label="Formulaire d'inscription"
    >
      <input
        type="text"
        id="firstName"
        name="firstName"
        placeholder="Prénom"
        value={formData.firstName}
        onChange={handleChange}
        required
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <input
        type="text"
        id="lastName"
        name="lastName"
        placeholder="Nom"
        value={formData.lastName}
        onChange={handleChange}
        required
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <select
        id="type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Type</option>
        <option value="concert">Concert</option>
        <option value="artistMeeting">Rencontre avec l'artiste</option>
      </select>
      <input
        type="text"
        id="eventName"
        name="eventName"
        placeholder="Nom de l'événement"
        value={formData.eventName}
        onChange={handleChange}
        required
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:col-span-4"
      />
      <button
        type="submit"
        className="bg-custom-blue-500 hover:bg-custom-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 md:col-span-1"
      >
        S'inscrire
      </button>
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </form>
  );
};

export default RegistrationForm;
