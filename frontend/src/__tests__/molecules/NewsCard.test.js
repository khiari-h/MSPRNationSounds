import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import NewsCard from '../../component/molecules/NewsCard';

describe('Composant NewsCard', () => {

  // Test pour vérifier que le titre est correctement affiché
  test('affiche le titre fourni en props', () => {
    act(() => {
      render(<NewsCard title="Titre de Test" description="Description de Test" />);
    });

    const titleElement = screen.getByText(/Titre de Test/i);
    expect(titleElement).toBeInTheDocument();
  });

  // Test pour vérifier que la description est correctement affichée
  test('affiche la description fournie en props', () => {
    act(() => {
      render(<NewsCard title="Titre de Test" description="Description de Test" />);
    });

    const descriptionElement = screen.getByText(/Description de Test/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  // Test pour vérifier que la classe "hover:-translate-y-1" est appliquée

});
