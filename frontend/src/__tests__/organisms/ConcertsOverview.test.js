import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import axiosConfig from '../../config/axiosConfig';
import ConcertsOverview from '../../component/organisms/ConcertsOverview';

jest.mock('../../config/axiosConfig');

describe('Composant ConcertsOverview', () => {

  // Test pour vérifier que le composant affiche un message de chargement initialement
  test('affiche un message de chargement initialement', () => {
    act(() => {
      render(<ConcertsOverview />);
    });

    expect(screen.getByText(/Chargement.../i)).toBeInTheDocument();
  });

  // Test pour vérifier que les concerts sont affichés après le chargement
  test('affiche les concerts après le chargement', async () => {
    const mockData = [
      {
        acf: {
          nom: 'Concert Test 1',
          description: 'Description de Test 1',
          photo_url: '/path/to/photo.jpg'
        }
      }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockData });

    act(() => {
      render(<ConcertsOverview />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Concert Test 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Description de Test 1/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier l'affichage du bouton Voir Plus
  test('affiche le bouton Voir Plus de Concerts si showMoreButton est true', async () => {
    axiosConfig.get.mockResolvedValueOnce({ data: [] });

    act(() => {
      render(<ConcertsOverview showMoreButton={true} />);
    });

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /Voir Plus de Concerts/i })).toBeInTheDocument();
    });
  });
});
