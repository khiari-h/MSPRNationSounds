import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import Header from '../../component/organisms/Header';

describe('Composant Header', () => {

  // Test pour vérifier que le logo est affiché
  test('affiche le logo du festival', () => {
    act(() => {
      render(<Header />);
    });

    expect(screen.getByAltText(/Festival Logo/i)).toBeInTheDocument();
  });

  // Test pour vérifier que le menu mobile s'ouvre et se ferme correctement
  test('ouvre et ferme le menu mobile', () => {
    act(() => {
      render(<Header />);
    });

    const button = screen.getByRole('button', { name: /Ouvrir le menu/i });
    fireEvent.click(button);

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByLabelText(/Fermer le menu/i)).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  // Test pour vérifier que les éléments du menu sont affichés
  test('affiche les éléments du menu', () => {
    act(() => {
      render(<Header />);
    });

    expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
    expect(screen.getByText(/Actualités/i)).toBeInTheDocument();
    expect(screen.getByText(/Concerts/i)).toBeInTheDocument();
    expect(screen.getByText(/Programmation/i)).toBeInTheDocument();
    expect(screen.getByText(/Partenaires/i)).toBeInTheDocument();
  });
});
