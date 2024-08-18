import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axiosConfig from '../../../config/axiosConfig';
import ConcertsProgramming from '../../../component/organisms/ProgrammingOrganisms/ConcertProgramming';

jest.mock('../../../config/axiosConfig');

describe('Composant ConcertsProgramming', () => {

  // Test pour vérifier que le message de chargement est affiché initialement
  test('affiche un message de chargement initialement', () => {
    render(<ConcertsProgramming />);
    expect(screen.getByText(/Chargement des concerts.../i)).toBeInTheDocument();
  });

  // Test pour vérifier que les concerts sont affichés après le chargement
  test('affiche les concerts après le chargement', async () => {
    const mockData = [
      {
        acf: {
          nom: 'Concert 1',
          description: 'Description 1',
          date: '20240101',
          heuredebut: '20:00',
          lieu: 'Lieu 1',
        }
      }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockData });

    render(<ConcertsProgramming />);

    await waitFor(() => {
      expect(screen.getByText(/Concert 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
    });
  });

});
