import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../component/atoms/Text';

describe('Composant Text', () => {

  // Test pour vérifier que le texte est rendu avec le bon type (tag HTML) et le bon contenu
  test('rend le texte avec le bon tag HTML et contenu', () => {
    // Données de test pour le contenu et le type (par exemple, h1)
    const testContent = 'Titre de test';
    const testType = 'h1';

    // Rendu du composant Text avec les props content et type
    render(<Text content={testContent} type={testType} />);
    
    // Vérifie que l'élément avec le bon tag HTML (h1) et le bon contenu est dans le document
    const textElement = screen.getByText(testContent);
    expect(textElement.tagName.toLowerCase()).toBe(testType);
    expect(textElement).toBeInTheDocument();
  });

  // Test pour vérifier que les classes CSS de base sont appliquées correctement
  test('applique les classes CSS de base correctement', () => {
    // Données de test pour le contenu et le type
    const testContent = 'Sous-titre de test';
    const testType = 'h2';

    // Rendu du composant Text avec un type de texte
    render(<Text content={testContent} type={testType} />);
    
    // Vérifie que l'élément contient les classes CSS de base appropriées pour le type h2
    const textElement = screen.getByText(testContent);
    expect(textElement).toHaveClass('font-concert-subtitle text-black text-xl font-bold');
  });

  // Test pour vérifier que les classes CSS personnalisées sont appliquées en plus des classes de base
  test('applique les classes CSS personnalisées', () => {
    // Données de test pour le contenu, le type et la classe personnalisée
    const testContent = 'Texte de test avec classe personnalisée';
    const testType = 'p';
    const customClass = 'text-center';

    // Rendu du composant Text avec une classe CSS personnalisée
    render(<Text content={testContent} type={testType} className={customClass} />);
    
    // Vérifie que l'élément contient à la fois les classes CSS de base et la classe personnalisée
    const textElement = screen.getByText(testContent);
    expect(textElement).toHaveClass('font-concert-description text-black text-center');
  });

});
