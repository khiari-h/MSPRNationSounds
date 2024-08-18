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

  // Test pour vérifier que le lien est affiché si fourni
  test('affiche le lien "En savoir plus" si le lien est fourni', () => {
    act(() => {
      render(
        <InfoCard
          title="Titre de Test"
          description="Description de Test"
          link="https://example.com"
        />
      );
    });

    const linkElement = screen.getByText(/En savoir plus/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
  });

  // Test pour vérifier que la classe border-custom-blue-500 est appliquée si le type est 'schedule'
  test('applique la classe "border-custom-blue-500" si le type est "schedule"', () => {
    act(() => {
      render(
        <InfoCard
          title="Titre de Test"
          description="Description de Test"
          type="schedule"
        />
      );
    });

    const cardElement = screen.getByText(/Titre de Test/i).closest('div');
    expect(cardElement).toHaveClass('border-custom-blue-500');
  });
});
