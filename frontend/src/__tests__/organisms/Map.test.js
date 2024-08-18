import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { act } from 'react';
import axiosConfig from '../../config/axiosConfig';
import Map from '../../component/molecules/Map';

jest.mock('../../config/axiosConfig');

describe('Composant Map', () => {
  
  // Test pour vérifier que le titre est affiché
  test('affiche le titre de la carte', () => {
    act(() => {
      render(<Map />);
    });

    expect(screen.getByText(/Carte du Festival/i)).toBeInTheDocument();
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

    act(() => {
      render(<Map />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Food Point/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier que les concerts en cours sont filtrés correctement
  test('filtre les points d\'intérêt avec des concerts en cours', async () => {
    const mockPoints = [
      {
        acf: { nom: 'Concert Venue', Categorie: 'Venue', Latitude: 48.8566, Longitude: 2.3522, Description: 'Venue description' },
        title: { rendered: 'Concert Venue' }
      }
    ];
    const mockConcerts = [
      {
        acf: {
          nom: 'Concert 1',
          lieu: 'Concert Venue',
          date: '20230101',
          heuredebut: '10:00',
          heurefin: '12:00',
          startDateTime: new Date(),
          endDateTime: new Date(new Date().getTime() + 3600000),
          description: 'Concert description'
        },
        title: { rendered: 'Concert 1' }
      }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockPoints });
    axiosConfig.get.mockResolvedValueOnce({ data: mockConcerts });

    act(() => {
      render(<Map />);
    });

    fireEvent.click(screen.getByLabelText(/Afficher concerts en cours/i));

    await waitFor(() => {
      expect(screen.getByText(/Concert 1/i)).toBeInTheDocument();
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

    act(() => {
      render(<Map />);
    });

    fireEvent.click(screen.getByRole('button', { name: /Géolocalisation/i }));

    await waitFor(() => {
      expect(screen.getByText(/Votre position/i)).toBeInTheDocument();
    });
  });
});
