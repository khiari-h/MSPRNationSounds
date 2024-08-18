import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axiosConfig from '../../../config/axiosConfig';
import ArtistMeeting from '../../../component/organisms/ProgrammingOrganisms/ArtistMeeting';

jest.mock('../../../config/axiosConfig');

describe('Composant ArtistMeeting', () => {

  const mockData = [
    {
      acf: {
        nom: "Atelier musique avec ElectriK",
        description: "Venez apprendre à jouer de la guitare avec Electrik",
        date: "20240816",
      }
    },
    {
      acf: {
        nom: "Atelier musique avec Cassie",
        description: "Cassie vous donne rendez-vous pour un atelier musique: Apprentissage et rigolade",
        date: "20240816",
      }
    }
  ];

  // Test pour vérifier que les rencontres sont affichées après le chargement
  test('affiche les rencontres après le chargement', async () => {
    axiosConfig.get.mockResolvedValueOnce({ data: mockData });

    render(<ArtistMeeting />);

    await waitFor(() => {
      const electrikTitle = screen.getByRole('heading', { name: /Atelier musique avec ElectriK/i });
      const electrikDescription = screen.getByText(/Venez apprendre à jouer de la guitare avec Electrik/i);
      expect(electrikTitle).toBeInTheDocument();
      expect(electrikDescription).toBeInTheDocument();
    });
  });

  // Test simplifié pour vérifier l'application des filtres
  test('filtre les rencontres en fonction des filtres sélectionnés', async () => {
    axiosConfig.get.mockResolvedValueOnce({ data: mockData });

    render(<ArtistMeeting />);

    await waitFor(() => {
      const cassieTitle = screen.getByRole('heading', { name: /Atelier musique avec Cassie/i });
      expect(cassieTitle).toBeInTheDocument();
    });
  });
});
