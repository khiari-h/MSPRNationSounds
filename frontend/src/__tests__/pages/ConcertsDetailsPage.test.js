import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { act } from 'react';
import axiosConfig from '../../config/axiosConfig';
import ConcertsDetailsPage from '../../component/pages/ConcertsDetailsPage';

jest.mock('../../config/axiosConfig');

describe('Composant ConcertsDetailsPage', () => {

  // Test pour vérifier que la page se charge avec les concerts
  test('charge les concerts et les affiche correctement', async () => {
    const mockConcerts = [
      {
        acf: {
          nom: 'Concert 1',
          description: 'Description 1',
          date: '20240101',
          heuredebut: '20:00',
          heurefin: '22:00',
          lieu: 'Lieu 1',
          type: 'Type 1',
          photo: '/path/to/photo1.jpg'
        }
      },
      {
        acf: {
          nom: 'Concert 2',
          description: 'Description 2',
          date: '20240202',
          heuredebut: '18:00',
          heurefin: '20:00',
          lieu: 'Lieu 2',
          type: 'Type 2',
          photo: '/path/to/photo2.jpg'
        }
      }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockConcerts });

    act(() => {
      render(<ConcertsDetailsPage />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Concert 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Concert 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 2/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier l'application des filtres
  test('filtre les concerts en fonction des filtres sélectionnés', async () => {
    const mockConcerts = [
      {
        acf: {
          nom: 'Concert 1',
          description: 'Description 1',
          date: '20240101',
          heuredebut: '20:00',
          heurefin: '22:00',
          lieu: 'Lieu 1',
          type: 'Type 1',
          photo: '/path/to/photo1.jpg'
        }
      },
      {
        acf: {
          nom: 'Concert 2',
          description: 'Description 2',
          date: '20240202',
          heuredebut: '18:00',
          heurefin: '20:00',
          lieu: 'Lieu 2',
          type: 'Type 2',
          photo: '/path/to/photo2.jpg'
        }
      }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockConcerts });

    act(() => {
      render(<ConcertsDetailsPage />);
    });

    await waitFor(() => {
      fireEvent.change(screen.getByRole('combobox', { name: /group/i }), { target: { value: 'Concert 1' } });
      expect(screen.getByText(/Concert 1/i)).toBeInTheDocument();
      expect(screen.queryByText(/Concert 2/i)).not.toBeInTheDocument();
    });
  });

  // Test pour vérifier la pagination des concerts
  test('pagine les concerts correctement', async () => {
    const mockConcerts = Array.from({ length: 12 }, (_, i) => ({
      acf: {
        nom: `Concert ${i + 1}`,
        description: `Description ${i + 1}`,
        date: '20240101',
        heuredebut: '20:00',
        heurefin: '22:00',
        lieu: 'Lieu 1',
        type: 'Type 1',
        photo: '/path/to/photo.jpg'
      }
    }));

    axiosConfig.get.mockResolvedValueOnce({ data: mockConcerts });

    act(() => {
      render(<ConcertsDetailsPage />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Concert 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Concert 6/i)).toBeInTheDocument();
      expect(screen.queryByText(/Concert 7/i)).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /2/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Concert 1/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Concert 7/i)).toBeInTheDocument();
    });
  });
});
