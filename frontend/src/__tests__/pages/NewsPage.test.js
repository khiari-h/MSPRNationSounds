import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axiosConfig from '../../config/axiosConfig';
import NewsPage from '../../component/pages/NewsPage';

jest.mock('../../config/axiosConfig');

describe('Composant NewsPage', () => {

  // Test pour vérifier que les actualités sont affichées après le chargement
  test('affiche les actualités après le chargement', async () => {
    const mockNews = [
      { title: 'News 1', description: 'Description 1', category: 'Category 1', importance: 1 },
      { title: 'News 2', description: 'Description 2', category: 'Category 2', importance: 2 }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockNews });

    render(<NewsPage />);

    await waitFor(() => {
      expect(screen.getByText(/News 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
      expect(screen.getByText(/News 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 2/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier le filtrage des actualités
  test('filtre les actualités par catégorie', async () => {
    const mockNews = [
      { title: 'News 1', description: 'Description 1', category: 'Category 1', importance: 1 },
      { title: 'News 2', description: 'Description 2', category: 'Category 2', importance: 2 }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockNews });

    render(<NewsPage />);

    await waitFor(() => {
      expect(screen.getByText(/News 1/i)).toBeInTheDocument();
      expect(screen.getByText(/News 2/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Category 1/i }));

    expect(screen.getByText(/News 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/News 2/i)).not.toBeInTheDocument();
  });

  // Test pour vérifier la pagination des actualités
  test('pagine les actualités correctement', async () => {
    const mockNews = Array.from({ length: 10 }, (_, i) => ({
      title: `News ${i + 1}`,
      description: `Description ${i + 1}`,
      category: 'Category 1',
      importance: i + 1
    }));

    axiosConfig.get.mockResolvedValueOnce({ data: mockNews });

    render(<NewsPage />);

    await waitFor(() => {
      expect(screen.getByText(/News 1/i)).toBeInTheDocument();
      expect(screen.getByText(/News 6/i)).toBeInTheDocument();
      expect(screen.queryByText(/News 7/i)).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /2/i }));

    await waitFor(() => {
      expect(screen.getByText(/News 7/i)).toBeInTheDocument();
      expect(screen.getByText(/News 10/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier qu'un message d'erreur est affiché en cas de problème lors du chargement
  test('affiche un message d\'erreur en cas d\'échec de chargement', async () => {
    axiosConfig.get.mockRejectedValueOnce(new Error('Erreur lors de la récupération des actualités!'));

    render(<NewsPage />);

    await waitFor(() => {
      expect(screen.getByText(/Erreur lors de la récupération des actualités!/i)).toBeInTheDocument();
    });
  });
});
