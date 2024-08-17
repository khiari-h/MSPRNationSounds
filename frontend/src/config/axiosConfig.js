// src/config/axiosConfig.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // URL de base de votre backend Laravel
  timeout: 10000, // Timeout de 10 secondes
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});


// Intercepteur de requêtes
instance.interceptors.request.use(
  config => {
    // Ajoutez toute logique ou en-tête personnalisé ici
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponses
instance.interceptors.response.use(
  response => response,
  error => {
    // Gérer les erreurs globales
    console.error('Erreur Axios:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default instance;
