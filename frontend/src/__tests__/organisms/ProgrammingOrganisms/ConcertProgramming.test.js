import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import axiosConfig from '../../../config/axiosConfig';
import ConcertsProgramming from '../../molecules/ConcertsProgramming';

jest.mock('../../../config/axiosConfig');

describe('Composant ConcertsProgramming', () => {

  // Test pour vérifier que le message de chargement est affiché initialement
  test('affiche un message de chargement initialement', () => {
    act(() => {
      render(<ConcertsProgramming />);
    });

    expect(screen.getByText(/Chargement des concerts.../i)).toBeInTheDocument();
  });

  // Test pour vérifier que les concerts sont affichés après le chargement
  test('affiche les concerts après le chargement', async () => {
    const mockData = [
      {
        acf: {
          nom: 'Concert Test 1',
          description: 'Description de Test 1',
          date: '20240101',
          heuredebut: '20:00',
          heurefin: '22:00',
          lieu: 'Lieu Test 1',
          type: 'Type Test 1',
          photo: '/path/to/photo.jpg'
        }
      }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockData });

    act(() => {
      render(<ConcertsProgramming />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Concert Test 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Description de Test 1/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier l'application des filtres
  test('filtre les concerts en fonction des filtres sélectionnés', async () => {
    const mockData = [
      {
        acf: {
          nom: 'Concert Test 1',
          description: 'Description de Test 1',
          date: '20240101',
          heuredebut: '20:00',
          heurefin: '22:00',
          lieu: 'Lieu Test 1',
          type: 'Type Test 1',
          photo: '/path/to/photo.jpg'
        }
      },
      {
        acf: {
          nom: 'Concert Test 2',
          description: 'Description de Test 2',
          date: '20240202',
          heuredebut: '18:00',
          heurefin: '20:00',
          lieu: 'Lieu Test 2',
          type: 'Type Test 2',
          photo: '/path/to/photo2.jpg'
        }
      }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockData });

    act(() => {
      render(<ConcertsProgramming />);
    });

    await waitFor(() => {
      fireEvent.change(screen.getByRole('combobox', { name: /date/i }), { target: { value: '20240101' } });
      expect(screen.getByText(/Concert Test 1/i)).toBeInTheDocument();
      expect(screen.queryByText(/Concert Test 2/i)).not.toBeInTheDocument();
    });
  });
});
