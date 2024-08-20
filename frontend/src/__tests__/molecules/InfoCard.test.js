import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import InfoCard from '../../component/molecules/InfoCard';

describe('Composant InfoCard', () => {

  // Test pour vérifier que le titre est correctement affiché
  test('affiche le titre fourni en props', () => {
    act(() => {
      render(<InfoCard title="Titre de Test" description="Description de Test" />);
    });

    const titleElement = screen.getByText(/Titre de Test/i);
    expect(titleElement).toBeInTheDocument();
  });

  // Test pour vérifier que la description est correctement affichée
  test('affiche la description fournie en props', () => {
    act(() => {
      render(<InfoCard title="Titre de Test" description="Description de Test" />);
    });

    const descriptionElement = screen.getByText(/Description de Test/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  // Test pour vérifier que l'image par défaut est affichée si aucune image n'est fournie
  test('affiche l\'image par défaut si aucune image n\'est fournie', () => {
    act(() => {
      render(<InfoCard title="Titre de Test" description="Description de Test" />);
    });

    const imageElement = screen.getByAltText(/Titre de Test/i);
    expect(imageElement).toHaveAttribute('src', '/Noimage.jpg');
  });



});
