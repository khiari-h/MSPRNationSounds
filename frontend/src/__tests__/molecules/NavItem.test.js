import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import NavItem from '../../component/molecules/NavItem';

describe('Composant NavItem', () => {

  // Test pour vérifier que le label est correctement affiché
  test('affiche le label fourni en props', () => {
    act(() => {
      render(<NavItem label="Accueil" href="/" />);
    });

    const labelElement = screen.getByText(/Accueil/i);
    expect(labelElement).toBeInTheDocument();
  });

  // Test pour vérifier que l'élément a le bon href
  test('affiche le bon href fourni en props', () => {
    act(() => {
      render(<NavItem label="Accueil" href="/" />);
    });

    const linkElement = screen.getByRole('link', { name: /Accueil/i });
    expect(linkElement).toHaveAttribute('href', '/');
  });

  // Test pour vérifier que la classe supplémentaire est appliquée si fournie
  test('applique la classe supplémentaire fournie en props', () => {
    act(() => {
      render(<NavItem label="Accueil" href="/" className="custom-class" />);
    });

    const linkElement = screen.getByRole('link', { name: /Accueil/i });
    expect(linkElement).toHaveClass('custom-class');
  });

  // Test pour vérifier les classes par défaut
  test('applique les classes par défaut', () => {
    act(() => {
      render(<NavItem label="Accueil" href="/" />);
    });

    const linkElement = screen.getByRole('link', { name: /Accueil/i });
    expect(linkElement).toHaveClass('font-concert-subtitle text-concert-text');
  });
});
