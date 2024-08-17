import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../component/atoms/Image';

describe('Composant Image', () => {
  
  // Test pour vérifier que l'image s'affiche correctement avec les bonnes propriétés
  test('affiche l\'image avec le src et alt corrects', () => {
    // Données de test pour le src et alt
    const testSrc = 'https://example.com/image.jpg';
    const testAlt = 'Exemple d\'image';

    // Rendu du composant Image avec les props src et alt
    render(<Image src={testSrc} alt={testAlt} />);
    
    // Vérifie que l'élément img avec le src et alt corrects est bien dans le document
    const imgElement = screen.getByAltText(testAlt);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', testSrc);
  });

  // Test pour vérifier que la classe CSS est appliquée correctement
  test('applique la classe CSS personnalisée', () => {
    // Données de test pour la classe CSS
    const customClass = 'custom-class';

    // Rendu du composant Image avec une classe CSS personnalisée
    render(<Image src="https://example.com/image.jpg" alt="Exemple d'image" className={customClass} />);
    
    // Vérifie que l'élément img contient la classe CSS personnalisée en plus de 'object-contain'
    const imgElement = screen.getByAltText('Exemple d\'image');
    expect(imgElement).toHaveClass(`object-contain ${customClass}`);
  });

});
