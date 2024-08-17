import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import Accordion from '../../component/molecules/Accordion';

describe('Composant Accordion', () => {

  // Test pour vérifier que le titre de l'accordéon est correctement affiché
  test('affiche le titre de l\'accordéon', () => {
    act(() => {
      render(<Accordion title="Titre de Test">Contenu de Test</Accordion>);
    });
    
    const titleElement = screen.getByText(/Titre de Test/i);
    expect(titleElement).toBeInTheDocument();
  });

  // Test pour vérifier que le contenu de l'accordéon est masqué par défaut
  test('masque le contenu par défaut', () => {
    act(() => {
      render(<Accordion title="Titre de Test">Contenu de Test</Accordion>);
    });
    
    const contentElement = screen.queryByText(/Contenu de Test/i);
    expect(contentElement).not.toBeInTheDocument();
  });

  // Test pour vérifier que le contenu de l'accordéon s'affiche lorsqu'on clique sur le titre
  test('affiche le contenu lorsque le titre est cliqué', () => {
    act(() => {
      render(<Accordion title="Titre de Test">Contenu de Test</Accordion>);
    });

    const buttonElement = screen.getByRole('button');
    
    act(() => {
      fireEvent.click(buttonElement);
    });
    
    const contentElement = screen.getByText(/Contenu de Test/i);
    expect(contentElement).toBeInTheDocument();
  });

  // Test pour vérifier que le contenu de l'accordéon est masqué lorsqu'on reclique sur le titre
  test('masque le contenu lorsque le titre est recliqué', async () => {
    act(() => {
      render(<Accordion title="Titre de Test">Contenu de Test</Accordion>);
    });
    
    const buttonElement = screen.getByRole('button');
    
    act(() => {
      fireEvent.click(buttonElement); // Ouvrir l'accordéon
      fireEvent.click(buttonElement); // Fermer l'accordéon
    });

    // Utilisation de waitFor pour attendre que le contenu soit masqué
    await waitFor(() => {
      const contentElement = screen.queryByText(/Contenu de Test/i);
      expect(contentElement).not.toBeInTheDocument();
    });
  });
});
