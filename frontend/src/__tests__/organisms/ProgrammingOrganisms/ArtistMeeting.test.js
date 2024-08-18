import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import axiosConfig from '../../../config/axiosConfig';
import ArtistMeeting from '../../molecules/ArtistMeeting';

jest.mock('../../../config/axiosConfig');

describe('Composant ArtistMeeting', () => {

  // Test pour vérifier que le message de chargement est affiché initialement
  test('affiche un message de chargement initialement', () => {
    act(() => {
      render(<ArtistMeeting />);
    });

    expect(screen.getByText(/Chargement des rencontres.../i)).toBeInTheDocument();
  });

  // Test pour vérifier que les rencontres sont affichées après le chargement
  test('affiche les rencontres après le chargement', async () => {
    const mockData = [
      {
        acf: {
          nom: 'Rencontre Test 1',
          description: 'Description de Test 1',
          date: '20240101',
          heuredebut: '10:00',
          heurefin: '11:00',
          lieu: 'Lieu Test 1',
          type: 'Type Test 1',
          photo: '/path/to/photo.jpg'
        }
      }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockData });

    act(() => {
      render(<ArtistMeeting />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Rencontre Test 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Description de Test 1/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier l'application des filtres
  test('filtre les rencontres en fonction des filtres sélectionnés', async () => {
    const mockData = [
      {
        acf: {
          nom: 'Rencontre Test 1',
          description: 'Description de Test 1',
          date: '20240101',
          heuredebut: '10:00',
          heurefin: '11:00',
          lieu: 'Lieu Test 1',
          type: 'Type Test 1',
          photo: '/path/to/photo.jpg'
        }
      },
      {
        acf: {
          nom: 'Rencontre Test 2',
          description: 'Description de Test 2',
          date: '20240202',
          heuredebut: '14:00',
          heurefin: '15:00',
          lieu: 'Lieu Test 2',
          type: 'Type Test 2',
          photo: '/path/to/photo2.jpg'
        }
      }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockData });

    act(() => {
      render(<ArtistMeeting />);
    });

    await waitFor(() => {
      fireEvent.change(screen.getByRole('combobox', { name: /date/i }), { target: { value: '20240101' } });
      expect(screen.getByText(/Rencontre Test 1/i)).toBeInTheDocument();
      expect(screen.queryByText(/Rencontre Test 2/i)).not.toBeInTheDocument();
    });
  });
});
