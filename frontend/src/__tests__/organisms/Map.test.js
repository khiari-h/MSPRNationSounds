import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axiosConfig from '../../config/axiosConfig';
import Map from '../../component/organisms/Map';

jest.mock('../../config/axiosConfig');

describe('Composant Map', () => {

  // Test pour vérifier que le titre est affiché
  test('affiche le titre de la carte', () => {
    render(<Map />);
    expect(screen.getByRole('heading', { name: /Carte du Festival/i })).toBeInTheDocument();
  });

  // Test pour vérifier que la carte se charge avec les points d'intérêt
  test('charge les points d\'intérêt sur la carte', async () => {
    const mockPoints = [
      {
        acf: { Categorie: 'Food', Latitude: 48.8584, Longitude: 2.2945, Description: 'Food description' },
        title: { rendered: 'Food Point' }
      }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockPoints });

    render(<Map />);

    await waitFor(() => {
      const foodPoints = screen.getAllByText(/Food Point/i);
      expect(foodPoints[0]).toBeInTheDocument(); // Vérification simple pour s'assurer que le point est affiché
    });
  });


  // Test pour vérifier la fonctionnalité de géolocalisation
  test('détecte la position de l\'utilisateur avec la géolocalisation', async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
        success({ coords: { latitude: 48.8584, longitude: 2.2945 } })
      )
    };

    global.navigator.geolocation = mockGeolocation;

    render(<Map />);

    fireEvent.click(screen.getByRole('button', { name: /Localiser ma position/i }));

    await waitFor(() => {
      expect(screen.getByText(/Votre position/i)).toBeInTheDocument();
    });
  });
});
