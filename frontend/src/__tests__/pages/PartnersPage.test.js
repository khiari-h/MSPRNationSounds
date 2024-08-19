import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axiosConfig from '../../config/axiosConfig';
import PartnersPage from '../../component/pages/PartnersPage';
import { useResponsiveItemsPerPage } from '../../hooks/useResponsiveItemPerPage';

// Mock du hook `useResponsiveItemsPerPage`
jest.mock('../../hooks/useResponsiveItemPerPage', () => ({
  useResponsiveItemsPerPage: jest.fn(),
}));

jest.mock('../../config/axiosConfig');

describe('Composant PartnersPage', () => {
  beforeEach(() => {
    // Simule le retour du hook `useResponsiveItemsPerPage`
    useResponsiveItemsPerPage.mockReturnValue(6); // par défaut, retourne 6 items par page
  });

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
      },
      {
        acf: {
          nom: 'Partenaire 3',
          description: 'Description 3',
          categorie: 'Category 1',
          logo: 'logo3.jpg',
          lien: 'http://partner3.com',
        }
      },
      {
        acf: {
          nom: 'Partenaire 4',
          description: 'Description 4',
          categorie: 'Category 2',
          logo: 'logo4.jpg',
          lien: 'http://partner4.com',
        }
      },
      {
        acf: {
          nom: 'Partenaire 5',
          description: 'Description 5',
          categorie: 'Category 1',
          logo: 'logo5.jpg',
          lien: 'http://partner5.com',
        }
      },
      {
        acf: {
          nom: 'Partenaire 6',
          description: 'Description 6',
          categorie: 'Category 2',
          logo: 'logo6.jpg',
          lien: 'http://partner6.com',
        }
      },
      {
        acf: {
          nom: 'Partenaire 7',
          description: 'Description 7',
          categorie: 'Category 1',
          logo: 'logo7.jpg',
          lien: 'http://partner7.com',
        }
      }
    ];

    axiosConfig.get.mockResolvedValueOnce({ data: mockPartners });

    render(<PartnersPage />);

    await waitFor(() => {
      expect(screen.getByText(/Partenaire 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Partenaire 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Partenaire 6/i)).toBeInTheDocument();
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
      },
      {
        acf: {
          nom: 'Partenaire 3',
          description: 'Description 3',
          categorie: 'Category 1',
          logo: 'logo3.jpg',
          lien: 'http://partner3.com',
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
    const mockPartners = Array.from({ length: 7 }, (_, i) => ({
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

    // Attendez que les premiers partenaires apparaissent
    await waitFor(() => {
        expect(screen.getByText(/Partenaire 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Partenaire 6/i)).toBeInTheDocument();
    });

    // Vérifiez que le 7ème partenaire n'est pas encore affiché
    expect(screen.queryByText(/Partenaire 7/i)).not.toBeInTheDocument();

    // Simulez un clic pour changer de page
    const paginationButtons = screen.getAllByRole('button', { name: /2/i });
    fireEvent.click(paginationButtons[1]); // Sélectionne le deuxième bouton avec le label "2"

    // Attendez que le 7ème partenaire apparaisse
    await waitFor(() => {
        expect(screen.getByText(/Partenaire 7/i)).toBeInTheDocument();
    });
  });


});
