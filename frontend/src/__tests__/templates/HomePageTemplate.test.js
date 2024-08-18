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
        programmingOverview={<div>Programming Overview</div>}
        ctaBeforeMap={<div>CTA Before Map</div>}
        registerForm={<div>Registration Form</div>}
        practicalInfo={<div>Practical Info</div>}
        map={<div aria-label="festival-map">Map</div>}
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
        programmingOverview={<div>Programming Overview</div>}
        ctaBeforeMap={<div>CTA Before Map</div>}
        registerForm={<div>Registration Form</div>}
        practicalInfo={<div>Practical Info</div>}
        map={<div aria-label="festival-map">Map</div>}
        ctaAfterMap={<div>CTA After Map</div>}
      />
    );

    expect(screen.getByText('Hero Section')).toBeInTheDocument();
    expect(screen.getByText('News and Updates')).toBeInTheDocument();
    expect(screen.getByText('Concerts Overview')).toBeInTheDocument();
    expect(screen.getByText('Programming Overview')).toBeInTheDocument();
    expect(screen.getByText('CTA Before Map')).toBeInTheDocument();
    expect(screen.getByText('Registration Form')).toBeInTheDocument();
    expect(screen.getByText('Practical Info')).toBeInTheDocument();
    expect(screen.getByLabelText('festival-map')).toBeInTheDocument();
    expect(screen.getByText('CTA After Map')).toBeInTheDocument();
  });
});
