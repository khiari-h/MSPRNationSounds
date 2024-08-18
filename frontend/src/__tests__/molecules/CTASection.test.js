import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import CTASection from '../../component/molecules/CTASection';

describe('Composant CTASection', () => {

  // Test pour vérifier que le titre est correctement affiché
  test('affiche le titre fourni en props', () => {
    act(() => {
      render(
        <CTASection 
          title="Titre de Test" 
          ctas={[{ label: 'Button', href: '#' }]} 
        />
      );
    });

    const titleElement = screen.getByText(/Titre de Test/i);
    expect(titleElement).toBeInTheDocument();
  });

  // Test pour vérifier que les boutons sont correctement affichés
  test('affiche les boutons fournis en props', () => {
    const ctas = [
      { label: 'Premier Bouton', href: '#premier', className: 'btn-prime' },
      { label: 'Deuxième Bouton', href: '#deuxieme', className: 'btn-secondaire' }
    ];

    act(() => {
      render(
        <CTASection 
          title="Titre de Test" 
          ctas={ctas} 
        />
      );
    });

    ctas.forEach(cta => {
      const buttonElement = screen.getByRole('link', { name: cta.label });
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveAttribute('href', cta.href);
      expect(buttonElement).toHaveClass(cta.className);
    });
  });

  // Test pour vérifier que la classe personnalisée est appliquée
  test('applique la classe personnalisée fournie en props', () => {
    act(() => {
      render(
        <CTASection 
          title="Titre de Test" 
          ctas={[{ label: 'Button', href: '#' }]} 
          customClass="classe-personnalisee" 
        />
      );
    });

    const sectionElement = screen.getByText(/Titre de Test/i).closest('section');
    expect(sectionElement).toHaveClass('classe-personnalisee');
  });

});
