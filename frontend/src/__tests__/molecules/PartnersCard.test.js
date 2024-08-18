import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import PartnerCard from '../../component/molecules/PartnersCard';

describe('Composant PartnerCard', () => {

  // Test pour vérifier que le nom est correctement affiché
  test('affiche le nom fourni en props', () => {
    act(() => {
      render(<PartnerCard name="Nom de Test" description="Description de Test" link="#" />);
    });

    const nameElement = screen.getByText(/Nom de Test/i);
    expect(nameElement).toBeInTheDocument();
  });

  // Test pour vérifier que la description est correctement affichée
  test('affiche la description fournie en props', () => {
    act(() => {
      render(<PartnerCard name="Nom de Test" description="Description de Test" link="#" />);
    });

    const descriptionElement = screen.getByText(/Description de Test/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  // Test pour vérifier que l'image par défaut est affichée si aucun logo n'est fourni
  test('affiche l\'image par défaut si aucun logo n\'est fourni', () => {
    act(() => {
      render(<PartnerCard name="Nom de Test" description="Description de Test" link="#" />);
    });

    const imageElement = screen.getByAltText(/Nom de Test/i);
    expect(imageElement).toHaveAttribute('src', '/Noimage.jpg');
  });

  // Test pour vérifier que le lien est correctement appliqué
  test('affiche le lien correctement', () => {
    act(() => {
      render(<PartnerCard name="Nom de Test" description="Description de Test" link="https://example.com" />);
    });

    const linkElement = screen.getByText(/Visiter le site/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
  });
});
