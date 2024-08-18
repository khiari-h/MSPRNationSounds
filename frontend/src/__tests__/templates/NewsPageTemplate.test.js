import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsPageTemplate from '../../component/templates/NewsPageTemplate';

describe('Composant NewsPageTemplate', () => {

  // Test pour vérifier que le header et le footer sont présents
  test('affiche le header et le footer', () => {
    render(
      <NewsPageTemplate
        title="Actualités"
        filters={<div>Filtres</div>}
        newsItems={<div>News Items</div>}
        pagination={<div>Pagination</div>}
      />
    );

    expect(screen.getByRole('banner')).toBeInTheDocument(); // Vérifie le header
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Vérifie le footer
  });

  // Test pour vérifier que le contenu principal est affiché
  test('affiche les filtres, les actualités et la pagination', () => {
    render(
      <NewsPageTemplate
        title="Actualités"
        filters={<div>Filtres</div>}
        newsItems={<div>News Items</div>}
        pagination={<div>Pagination</div>}
      />
    );

    expect(screen.getByText(/Filtres/i)).toBeInTheDocument();
    expect(screen.getByText(/News Items/i)).toBeInTheDocument();
    expect(screen.getByText(/Pagination/i)).toBeInTheDocument();
  });

  // Test pour vérifier que le titre principal est affiché
  test('affiche le titre principal de la page', () => {
    render(
      <NewsPageTemplate
        title="Actualités"
        filters={<div>Filtres</div>}
        newsItems={<div>News Items</div>}
        pagination={<div>Pagination</div>}
      />
    );

    expect(screen.getByText(/Actualités/i)).toBeInTheDocument();
  });
});
