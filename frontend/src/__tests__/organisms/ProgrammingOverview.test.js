import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import axiosConfig from '../../config/axiosConfig';
import ProgrammingOverview from '../../component/organisms/ProgrammingOverview';

jest.mock('../../config/axiosConfig');

describe('Composant ProgrammingOverview', () => {

  // Test pour vérifier que le titre est affiché
  test('affiche le titre Programmation', () => {
    act(() => {
      render(<ProgrammingOverview />);
    });

    expect(screen.getByText(/Programmation/i)).toBeInTheDocument();
  });

  // Test pour vérifier que les concerts et réunions d'artistes sont affichés après le chargement
  test('affiche les concerts et réunions d\'artistes après le chargement', async () => {
    const mockData = {
      concert: {
        acf: { nom: 'Concert Test', description: 'Description de Concert', photo_url: '/path/to/photo.jpg', type: 'concert' }
      },
      artists_meetings: [
        { acf: { nom: 'Meeting Test 1', description: 'Description 1', photo_url: '/path/to/photo1.jpg', type: 'meeting' } },
        { acf: { nom: 'Meeting Test 2', description: 'Description 2', photo_url: '/path/to/photo2.jpg', type: 'meeting' } }
      ]
    };

    axiosConfig.get.mockResolvedValueOnce({ data: mockData });

    act(() => {
      render(<ProgrammingOverview />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Concert Test/i)).toBeInTheDocument();
      expect(screen.getByText(/Description de Concert/i)).toBeInTheDocument();
      expect(screen.getByText(/Meeting Test 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Meeting Test 2/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier l'affichage du bouton Voir Plus
  test('affiche le bouton Voir Plus', async () => {
    axiosConfig.get.mockResolvedValueOnce({ data: {} });

    act(() => {
      render(<ProgrammingOverview />);
    });

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /Voir Plus/i })).toBeInTheDocument();
    });
  });

  // Test pour vérifier qu'un message d'erreur est affiché en cas de problème lors du chargement
  test('affiche un message d\'erreur en cas d\'échec de chargement', async () => {
    axiosConfig.get.mockRejectedValueOnce(new Error('Erreur lors de la récupération des données.'));

    act(() => {
      render(<ProgrammingOverview />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Erreur lors de la récupération des données./i)).toBeInTheDocument();
    });
  });
});
