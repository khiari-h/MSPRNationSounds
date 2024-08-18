import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import axiosConfig from '../../config/axiosConfig';
import NewsAndUpdates from '../../component/molecules/NewsAndUpdates';

jest.mock('../../config/axiosConfig');

describe('Composant NewsAndUpdates', () => {

  // Test pour vérifier que le titre est affiché
  test('affiche le titre Actualités', () => {
    act(() => {
      render(<NewsAndUpdates />);
    });

    expect(screen.getByText(/Actualités/i)).toBeInTheDocument();
  });

  // Test pour vérifier que les articles d'actualité sont affichés après le chargement
  test('affiche les articles d\'actualité après le chargement', async () => {
    const mockNews = [
      { title: 'News 1', description: 'Description 1' },
      { title: 'News 2', description: 'Description 2' }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockNews });

    act(() => {
      render(<NewsAndUpdates />);
    });

    await waitFor(() => {
      expect(screen.getByText(/News 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
      expect(screen.getByText(/News 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 2/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier qu'un message d'erreur est affiché en cas de problème lors du chargement
  test('affiche un message d\'erreur en cas d\'échec de chargement', async () => {
    axiosConfig.get.mockRejectedValueOnce(new Error('Erreur lors de la récupération des données.'));

    act(() => {
      render(<NewsAndUpdates />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Erreur lors de la récupération des données./i)).toBeInTheDocument();
    });
  });
});
