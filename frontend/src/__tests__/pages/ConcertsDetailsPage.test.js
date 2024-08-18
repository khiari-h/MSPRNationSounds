import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from '../../config/axiosConfig';
import ConcertsDetailsPage from '../../component/pages/ConcertsDetailsPage';


jest.mock('../../config/axiosConfig');

describe('ConcertsDetailsPage', () => {
  // Mock des données de concerts pour les tests
  const mockConcerts = [
    {
      acf: {
        nom: 'Concert 1',
        description: 'Description 1',
        photo: 'photo-url-1',
        date: '2024-08-09',
        heuredebut: '18:00',
        heurefin: '20:00',
        lieu: 'Lieu 1',
        type: 'Type 1'
      }
    },
    {
      acf: {
        nom: 'Concert 2',
        description: 'Description 2',
        photo: 'photo-url-2',
        date: '2024-08-10',
        heuredebut: '19:00',
        heurefin: '21:00',
        lieu: 'Lieu 2',
        type: 'Type 2'
      }
    }
  ];

  // Avant chaque test, on simule la réponse de l'API avec les données mockées
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockConcerts });
  });

  // Test pour vérifier que les concerts sont bien récupérés et affichés au chargement de la page
  test('récupère et affiche les concerts au chargement', async () => {
    // On rend le composant ConcertsDetailsPage
    render(<ConcertsDetailsPage />);

    // On attend que les concerts soient affichés sur la page
    await waitFor(() => {
      // On vérifie que le titre du premier concert est bien affiché
      const concert1Heading = screen.getByRole('heading', { name: /Concert 1/i });
      // On vérifie que le titre du deuxième concert est bien affiché
      const concert2Heading = screen.getByRole('heading', { name: /Concert 2/i });

      // Les assertions pour confirmer que les éléments sont dans le document
      expect(concert1Heading).toBeInTheDocument();
      expect(concert2Heading).toBeInTheDocument();
    });
  });
});
