import React, { useState, useEffect, useCallback } from 'react';
import axiosConfig from '../../config/axiosConfig'; 

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    type: '',
    eventName: '',
  });

  const [events, setEvents] = useState([]); // Pour stocker les événements récupérés
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      if (formData.type) {
        try {
          const endpoint = formData.type === 'concert' 
            ? '/api/wordpress/concerts'
            : '/api/wordpress/artists_meetings';
          const response = await axiosConfig.get(endpoint);
          console.log('Données reçues:', response.data); // Vérifiez les données ici
          if (Array.isArray(response.data)) {
            setEvents(response.data);
          } else {
            setEvents([]); // Si ce n'est pas un tableau, on vide la liste
          }
          setFormData((prev) => ({ ...prev, eventName: '' })); // Réinitialiser eventName lors du changement de type
        } catch (error) {
          console.error('Erreur lors du chargement des événements :', error);
          setErrorMessage('Erreur lors du chargement des événements.');
          setEvents([]); // Vider la liste en cas d'erreur
        }
      }
    };

    fetchEvents();
  }, [formData.type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axiosConfig.post('/path-to-your-registration-endpoint', formData);
      setSuccessMessage('Inscription réussie ! Merci de vous être inscrit.');
      setErrorMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
      setSuccessMessage('');
    } finally {
      setIsSubmitting(false);
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
      <select
        id="eventName"
        name="eventName"
        value={formData.eventName}
        onChange={handleChange}
        required
        disabled={!formData.type || events.length === 0}
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:col-span-4"
      >
        <option value="">Sélectionnez un événement</option>
        {events.map((event) => (
          <option key={event.id} value={event.name}>
            {event.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-custom-blue-500 hover:bg-custom-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 md:col-span-1"
      >
        {isSubmitting ? 'En cours...' : "S'inscrire"}
      </button>
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </form>
  );
};

export default RegistrationForm;
