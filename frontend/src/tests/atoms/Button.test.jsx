// Button.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Composant Button', () => {
  
  // Test pour vérifier que le bouton est rendu avec le label et les classes par défaut
  test('rend le bouton avec le label et les classes par défaut', () => {
    render(<Button label="Cliquez-moi" />);
    const buttonElement = screen.getByRole('button', { name: /Cliquez-moi/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-light-blue');
    expect(buttonElement).toHaveClass('text-white');
  });

  // Test pour vérifier que le bouton est rendu comme un lien lorsqu'une href est fournie
  test('rend un lien avec l\'attribut href lorsque href est fourni', () => {
    render(<Button label="Aller sur Google" href="https://www.google.com" />);
    const linkElement = screen.getByRole('link', { name: /Aller sur Google/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://www.google.com');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // Test pour vérifier que le bouton est rendu avec une className supplémentaire et l'état isSelected
  test('rend le bouton avec une className supplémentaire et l\'état isSelected', () => {
    render(<Button label="Bouton Sélectionné" className="class-supplementaire" isSelected={true} />);
    const buttonElement = screen.getByRole('button', { name: /Bouton Sélectionné/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('class-supplementaire');
    expect(buttonElement).toHaveClass('bg-light-blue');
  });

  // Test pour vérifier que la fonction onClick est appelée lorsque le bouton est cliqué
  test('appelle le gestionnaire onClick lorsque le bouton est cliqué', () => {
    const handleClick = jest.fn();
    render(<Button label="Bouton Cliquable" onClick={handleClick} />);
    const buttonElement = screen.getByRole('button', { name: /Bouton Cliquable/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test pour vérifier que la console affiche un avertissement lorsque le bouton est cliqué sans gestionnaire onClick
  test('affiche un avertissement lorsque le bouton est cliqué sans gestionnaire onClick', () => {
    console.warn = jest.fn(); // Mock console.warn
    render(<Button label="Bouton Sans Gestionnaire" />);
    const buttonElement = screen.getByRole('button', { name: /Bouton Sans Gestionnaire/i });
    fireEvent.click(buttonElement);
    expect(console.warn).toHaveBeenCalledWith('Button cliqué sans gestionnaire onClick');
  });
});
