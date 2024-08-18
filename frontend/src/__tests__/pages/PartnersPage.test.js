import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axiosConfig from '../../config/axiosConfig';
import PartnersPage from '../../component/pages/PartnersPage';

jest.mock('../../config/axiosConfig');

describe('Composant PartnersPage', () => {
  // Test pour vérifier que les partenaires sont chargés et affichés correctement
  test('charge les partenaires et les affiche correctement', async () => {
    const mockPartners = [
      {
        acf: {
          nom: 'Partenaire 1',
          description: 'Description 1',
          categorie: 'Category 1',
          logo: 'logo1.jpg',
          lien: 'http://partner1.com',
        }
      },
      {
        acf: {
          nom: 'Partenaire 2',
          description: 'Description 2',
          categorie: 'Category 2',
          logo: 'logo2.jpg',
          lien: 'http://partner2.com',
        }
      }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockPartners });

    render(<PartnersPage />);

    await waitFor(() => {
      expect(screen.getByText(/Partenaire 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Partenaire 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 2/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier le filtrage des partenaires par catégorie
  test('filtre les partenaires par catégorie', async () => {
    const mockPartners = [
      {
        acf: {
          nom: 'Partenaire 1',
          description: 'Description 1',
          categorie: 'Category 1',
          logo: 'logo1.jpg',
          lien: 'http://partner1.com',
        }
      },
      {
        acf: {
          nom: 'Partenaire 2',
          description: 'Description 2',
          categorie: 'Category 2',
          logo: 'logo2.jpg',
          lien: 'http://partner2.com',
        }
      }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockPartners });

    render(<PartnersPage />);

    await waitFor(() => {
      expect(screen.getByText(/Partenaire 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Partenaire 2/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Category 1/i }));

    expect(screen.getByText(/Partenaire 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Partenaire 2/i)).not.toBeInTheDocument();
  });

  // Test pour vérifier la pagination des partenaires
  test('pagine les partenaires correctement', async () => {
    const mockPartners = Array.from({ length: 12 }, (_, i) => ({
      acf: {
        nom: `Partenaire ${i + 1}`,
        description: `Description ${i + 1}`,
        categorie: 'Category 1',
        logo: `logo${i + 1}.jpg`,
        lien: `http://partner${i + 1}.com`,
      }
    }));

    axiosConfig.get.mockResolvedValueOnce({ data: mockPartners });

    render(<PartnersPage />);

    await waitFor(() => {
      expect(screen.getByText(/Partenaire 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Partenaire 6/i)).toBeInTheDocument();
      expect(screen.queryByText(/Partenaire 7/i)).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /2/i }));

    await waitFor(() => {
      expect(screen.getByText(/Partenaire 7/i)).toBeInTheDocument();
      expect(screen.getByText(/Partenaire 12/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier qu'un message d'erreur est affiché en cas de problème lors du chargement
  test('affiche un message d\'erreur en cas d\'échec de chargement', async () => {
    axiosConfig.get.mockRejectedValueOnce(new Error('Erreur lors de la récupération des données.'));

    render(<PartnersPage />);

    await waitFor(() => {
      expect(screen.getByText(/Erreur lors de la récupération des données./i)).toBeInTheDocument();
    });
  });
});
