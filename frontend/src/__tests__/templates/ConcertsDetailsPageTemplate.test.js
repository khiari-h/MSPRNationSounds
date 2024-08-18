import React from 'react';
import { render, screen, within } from '@testing-library/react';
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

    // Au lieu de chercher par texte "Concerts", on utilise un rôle ou un autre attribut spécifique
    const concertsContainer = screen.getByText('Concerts', { selector: 'div' });
    expect(concertsContainer).toBeInTheDocument();
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
