import React from 'react';
import { render, screen } from '@testing-library/react';
import ConcertsDetailsPageTemplate from '../../component/templates/ConcertsDetailsPageTemplate';

describe('Composant ConcertsDetailsPageTemplate', () => {

  // Test pour vérifier que le header et le footer sont présents
  test('affiche le header et le footer', () => {
    render(
      <ConcertsDetailsPageTemplate
        filters={<div>Filtres</div>}
        concerts={<div>Concerts</div>}
      />
    );

    expect(screen.getByRole('banner')).toBeInTheDocument(); // Vérifie la présence du Header
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Vérifie la présence du Footer
  });

  // Test pour vérifier que le contenu principal est affiché
  test('affiche les filtres et les concerts', () => {
    render(
      <ConcertsDetailsPageTemplate
        filters={<div>Filtres</div>}
        concerts={<div>Concerts</div>}
      />
    );

    expect(screen.getByText(/Filtres/i)).toBeInTheDocument();
    expect(screen.getByText(/Concerts/i)).toBeInTheDocument();
  });

  // Test pour vérifier que le titre principal est affiché
  test('affiche le titre principal de la page', () => {
    render(
      <ConcertsDetailsPageTemplate
        filters={<div>Filtres</div>}
        concerts={<div>Concerts</div>}
      />
    );

    expect(screen.getByText(/Tous les Concerts et leur Planning/i)).toBeInTheDocument();
  });
});
