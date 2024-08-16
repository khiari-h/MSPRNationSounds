import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../../component/atoms/Button';

describe('Composant Button', () => {
  
  // Test pour vérifier que le bouton s'affiche correctement avec le texte fourni
  test('affiche correctement le label', () => {
    const { getByText } = render(<Button label="Cliquer ici" />);
    // Vérifie que le texte "Cliquer ici" est affiché dans le bouton
    expect(getByText('Cliquer ici')).toBeInTheDocument();
  });

  // Test pour vérifier le clic du bouton
  test('appelle la fonction onClick lorsqu\'il est cliqué', () => {
    const handleClick = jest.fn(); // Mock de la fonction onClick
    const { getByText } = render(<Button label="Cliquer ici" onClick={handleClick} />);
    
    // Simule un clic sur le bouton
    fireEvent.click(getByText('Cliquer ici'));
    
    // Vérifie que la fonction onClick a été appelée une fois
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test pour vérifier que le composant peut être un lien
  test('rendu en tant que lien lorsqu\'un href est fourni', () => {
    const { getByText } = render(<Button label="Aller ici" href="https://exemple.com" />);
    
    // Vérifie que l'élément rendu est un lien (<a>) et qu'il a l'attribut href correct
    const linkElement = getByText('Aller ici');
    expect(linkElement).toHaveAttribute('href', 'https://exemple.com');
    expect(linkElement.tagName).toBe('A');
  });

  // Test pour vérifier que le composant applique les classes CSS appropriées
  test('applique les classes par défaut correctement', () => {
    const { getByText } = render(<Button label="Cliquer ici" />);
    
    // Vérifie que l'élément a les classes CSS par défaut
    const buttonElement = getByText('Cliquer ici');
    expect(buttonElement).toHaveClass('bg-light-blue');
    expect(buttonElement).toHaveClass('text-white');
  });

  // Test pour vérifier que le composant applique les classes pour l'état sélectionné
  test('applique les classes pour l\'état sélectionné', () => {
    const { getByText } = render(<Button label="Sélectionné" isSelected />);
    
    // Vérifie que l'élément a les classes CSS pour l'état sélectionné
    const buttonElement = getByText('Sélectionné');
    expect(buttonElement).toHaveClass('bg-light-blue');
  });
});
