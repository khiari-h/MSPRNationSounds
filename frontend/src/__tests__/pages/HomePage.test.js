import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../../component/pages/HomePage';

describe('Composant HomePage', () => {

  // Test pour vérifier que tous les composants principaux sont affichés
  test('affiche tous les composants principaux de la page d\'accueil', () => {
    render(<HomePage />);

    // Vérifier que chaque section de la page est présente
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Vérifie le header
    expect(screen.getByRole('heading', { name: /Bienvenue au Festival Nation Sounds/i })).toBeInTheDocument(); // Vérifie la HeroSection
    expect(screen.getByRole('heading', { name: /Actualités/i })).toBeInTheDocument(); // Vérifie les actualités
    expect(screen.getByRole('heading', { name: /Programmation/i })).toBeInTheDocument(); // Vérifie la programmation
    expect(screen.getByRole('heading', { name: /Infos Pratiques et FAQ/i })).toBeInTheDocument(); // Vérifie les infos pratiques
    expect(screen.getByRole('heading', { name: /Carte du Festival/i })).toBeInTheDocument(); // Vérifie la carte
    expect(screen.getByRole('link', { name: /Nos Partenaires/i })).toBeInTheDocument(); // Vérifie le CTA après la carte
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Vérifie le footer
  });

  // Test pour vérifier que le bouton CTA "Acheter des billets" est affiché
  test('affiche le bouton CTA "Acheter des billets"', () => {
    render(<HomePage />);

    const buyTicketLinks = screen.getAllByRole('link', { name: /Acheter des billets/i });
    expect(buyTicketLinks[0]).toBeInTheDocument(); // Vérifie le premier bouton "Acheter des billets"
  });

  // Test pour vérifier que la carte est affichée
  test('affiche la carte', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: /Carte du Festival/i })).toBeInTheDocument();
  });
});
