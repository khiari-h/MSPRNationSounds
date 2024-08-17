import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GeolocationButton from '../../component/atoms/GeolocationButton';

describe('Composant GeolocationButton', () => {
  
  // Test pour vérifier que le bouton s'affiche correctement avec le texte approprié
  test('affiche correctement le bouton de géolocalisation', () => {
    // Rendu du composant
    render(<GeolocationButton onClick={() => {}} />);
    
    // Vérifie que le bouton avec le texte "📍" est bien présent dans le document
    expect(screen.getByRole('button', { name: /Localiser ma position/i })).toBeInTheDocument();
  });

  // Test pour vérifier que la fonction onClick est appelée lors du clic sur le bouton
  test('appelle la fonction onClick lorsqu\'il est cliqué', () => {
    // Mock de la fonction onClick
    const mockOnClick = jest.fn();
    
    // Rendu du composant avec la fonction mockée
    render(<GeolocationButton onClick={mockOnClick} />);
    
    // Simule un clic sur le bouton
    fireEvent.click(screen.getByRole('button', { name: /Localiser ma position/i }));
    
    // Vérifie que la fonction onClick a été appelée une fois
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

});
