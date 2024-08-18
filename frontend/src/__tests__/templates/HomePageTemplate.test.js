import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePageTemplate from '../../component/templates/HomePageTemplate';

describe('Composant HomePageTemplate', () => {

  // Test pour vérifier que le header et le footer sont présents
  test('affiche le header et le footer', () => {
    render(
      <HomePageTemplate
        heroSection={<div>Hero Section</div>}
        newsAndUpdates={<div>News and Updates</div>}
        concertsOverview={<div>Concerts Overview</div>}
        ProgrammingOverview={<div>Programming Overview</div>}
        ctaBeforeMap={<div>CTA Before Map</div>}
        registerForm={<div>Registration Form</div>}
        practicalInfo={<div>Practical Info</div>}
        map={<div>Map</div>}
        ctaAfterMap={<div>CTA After Map</div>}
      />
    );

    expect(screen.getByRole('banner')).toBeInTheDocument(); // Vérifie le header
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Vérifie le footer
  });

  // Test pour vérifier que toutes les sections principales sont affichées
  test('affiche toutes les sections principales dans le template', () => {
    render(
      <HomePageTemplate
        heroSection={<div>Hero Section</div>}
        newsAndUpdates={<div>News and Updates</div>}
        concertsOverview={<div>Concerts Overview</div>}
        ProgrammingOverview={<div>Programming Overview</div>}
        ctaBeforeMap={<div>CTA Before Map</div>}
        registerForm={<div>Registration Form</div>}
        practicalInfo={<div>Practical Info</div>}
        map={<div>Map</div>}
        ctaAfterMap={<div>CTA After Map</div>}
      />
    );

    expect(screen.getByText(/Hero Section/i)).toBeInTheDocument();
    expect(screen.getByText(/News and Updates/i)).toBeInTheDocument();
    expect(screen.getByText(/Concerts Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Programming Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/CTA Before Map/i)).toBeInTheDocument();
    expect(screen.getByText(/Registration Form/i)).toBeInTheDocument();
    expect(screen.getByText(/Practical Info/i)).toBeInTheDocument();
    expect(screen.getByText(/Map/i)).toBeInTheDocument();
    expect(screen.getByText(/CTA After Map/i)).toBeInTheDocument();
  });
});
