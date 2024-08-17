import React, { useState, useEffect, useCallback } from 'react';
import axiosConfig from '../../config/axiosConfig'; 
import Button from '../atoms/Button'; 

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    type: '',
    eventId: '', // Changer eventName par eventId
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
          const endpoint = formData.type === 'concerts' 
            ? '/api/wordpress/concert-names'
            : '/api/wordpress/artist-meeting-names';
          const response = await axiosConfig.get(endpoint);
          if (Array.isArray(response.data)) {
            setEvents(response.data);
          } else {
            setEvents([]);
          }
          setFormData((prev) => ({ ...prev, eventId: '' })); // Réinitialiser eventId
        } catch (error) {
          console.error('Erreur lors du chargement des événements :', error);
          setErrorMessage('Erreur lors du chargement des événements.');
          setEvents([]);
        }
      }
    };
  
    fetchEvents();
  }, [formData.type]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axiosConfig.post('/register', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        event_id: formData.eventId, // Envoyer eventId au lieu de eventName
      });
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
        <option value="concerts">Concerts</option>
        <option value="artists">Artistes</option>
      </select>
      <select
        id="eventId" // Changer eventName par eventId
        name="eventId"
        value={formData.eventId}
        onChange={handleChange}
        required
        disabled={!formData.type || events.length === 0}
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:col-span-4"
      >
        <option value="">Sélectionnez un événement</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.name}
          </option>
        ))}
      </select>
      <Button
          label="S'inscrire"
          type="submit"
          disabled={isSubmitting}
      />

      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </form>
  );
};

export default RegistrationForm;
