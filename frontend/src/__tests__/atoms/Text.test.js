import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import Text from '../../component/atoms/Text';

describe('Composant Text', () => {

  // Test pour vérifier que le texte est rendu avec le bon type (tag HTML) et le bon contenu
  test('rend le texte avec le bon tag HTML et contenu', () => {
    const testContent = 'Titre de test';
    const testType = 'h1';

    act(() => {
      render(<Text content={testContent} type={testType} />);
    });

    const textElement = screen.getByText(testContent);
    expect(textElement.tagName.toLowerCase()).toBe(testType);
    expect(textElement).toBeInTheDocument();
  });

  // Test pour vérifier que les classes CSS de base sont appliquées correctement
  test('applique les classes CSS de base correctement', () => {
    const testContent = 'Sous-titre de test';
    const testType = 'h2';

    act(() => {
      render(<Text content={testContent} type={testType} />);
    });

    const textElement = screen.getByText(testContent);
    expect(textElement).toHaveClass('font-concert-subtitle text-black text-xl font-bold');
  });

  // Test pour vérifier que les classes CSS personnalisées sont appliquées en plus des classes de base
  test('applique les classes CSS personnalisées', () => {
    const testContent = 'Texte de test avec classe personnalisée';
    const testType = 'p';
    const customClass = 'text-center';

    act(() => {
      render(<Text content={testContent} type={testType} className={customClass} />);
    });

    const textElement = screen.getByText(testContent);
    expect(textElement).toHaveClass('font-concert-description text-black text-center');
  });

});
