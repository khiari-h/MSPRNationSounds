import React from 'react';
import { render, screen, within } from '@testing-library/react';
import PartnersPageTemplate from '../../component/templates/PartnersPageTemplate';

describe('Composant PartnersPageTemplate', () => {

  // Test pour vérifier que le header et le footer sont présents
  test('affiche le header et le footer', () => {
    render(
      <PartnersPageTemplate
        filters={<div>Filtres</div>}
        partners={<div>Partenaires</div>}
        cta={<div>CTA Section</div>}
        message={<div>Message Section</div>}
      />
    );

    expect(screen.getByRole('banner')).toBeInTheDocument(); // Vérifie le header
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Vérifie le footer
  });

  // Test pour vérifier que le contenu principal est affiché
  test('affiche les filtres, les partenaires, le CTA et le message', () => {
    render(
      <PartnersPageTemplate
        filters={<div>Filtres</div>}
        partners={<div>Partenaires</div>}
        cta={<div>CTA Section</div>}
        message={<div>Message Section</div>}
      />
    );

    expect(screen.getByText(/Filtres/i)).toBeInTheDocument();

    // Cible l'élément "Partenaires" spécifique dans le conteneur "main"
    const mainContainer = screen.getByRole('main');
    
    // Cherche spécifiquement l'élément "Partenaires" en tant que div
    const partnersElement = within(mainContainer).getByText(/Partenaires/i, { selector: 'div' });
    expect(partnersElement).toBeInTheDocument();

    expect(screen.getByText(/CTA Section/i)).toBeInTheDocument();
    expect(screen.getByText(/Message Section/i)).toBeInTheDocument();
  });

  // Test pour vérifier que le titre principal est affiché
  test('affiche le titre principal de la page', () => {
    render(
      <PartnersPageTemplate
        filters={<div>Filtres</div>}
        partners={<div>Partenaires</div>}
        cta={<div>CTA Section</div>}
        message={<div>Message Section</div>}
      />
    );

    // Vérifie la présence du titre principal
    expect(screen.getByRole('heading', { name: /Nos Partenaires/i })).toBeInTheDocument();
  });
});
