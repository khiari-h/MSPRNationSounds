import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import HeroSection from '../../component/molecules/HeroSection';

describe('Composant HeroSection', () => {

  // Test pour vérifier que le titre principal est affiché
  test('affiche le titre principal du hero section', () => {
    act(() => {
      render(<HeroSection />);
    });

    expect(screen.getByText(/Bienvenue au Festival Nation Sounds/i)).toBeInTheDocument();
  });

  // Test pour vérifier que le texte de sous-titre est affiché
  test('affiche le sous-titre du hero section', () => {
    act(() => {
      render(<HeroSection />);
    });

    expect(screen.getByText(/Rejoignez-nous pour une expérience inoubliable/i)).toBeInTheDocument();
  });

  // Test pour vérifier que le bouton d'achat de billets est affiché
  test('affiche le bouton Acheter des billets', () => {
    act(() => {
      render(<HeroSection />);
    });

    const button = screen.getByRole('link', { name: /Acheter des billets/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', 'https://www.site-de-billetterie.com');
  });
});
