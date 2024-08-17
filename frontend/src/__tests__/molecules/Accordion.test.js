import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Accordion from '../../../components/molecules/Accordion';

describe('Composant Accordion', () => {
  
  // Test pour vérifier que le titre de l'accordéon est correctement affiché
  test('affiche le titre de l\'accordéon', () => {
    // On rend le composant avec un titre et un contenu de test
    render(<Accordion title="Titre de Test">Contenu de Test</Accordion>);
    
    // On sélectionne l'élément qui contient le titre en utilisant le texte
    const titleElement = screen.getByText(/Titre de Test/i);
    
    // On s'assure que l'élément du titre est bien présent dans le document
    expect(titleElement).toBeInTheDocument();
  });

  // Test pour vérifier que le contenu de l'accordéon est masqué par défaut
  test('masque le contenu par défaut', () => {
    // On rend le composant sans interaction
    render(<Accordion title="Titre de Test">Contenu de Test</Accordion>);
    
    // On recherche le contenu du texte, qui ne doit pas être visible initialement
    const contentElement = screen.queryByText(/Contenu de Test/i);
    
    // On vérifie que le contenu n'est pas dans le document
    expect(contentElement).not.toBeInTheDocument();
  });

  // Test pour vérifier que le contenu de l'accordéon s'affiche lorsqu'on clique sur le titre
  test('affiche le contenu lorsque le titre est cliqué', () => {
    // On rend le composant
    render(<Accordion title="Titre de Test">Contenu de Test</Accordion>);
    
    // On sélectionne le bouton en utilisant son rôle
    const buttonElement = screen.getByRole('button');
    
    // On simule un clic sur le bouton (titre de l'accordéon)
    fireEvent.click(buttonElement);
    
    // On vérifie que le contenu est maintenant visible dans le document
    const contentElement = screen.getByText(/Contenu de Test/i);
    expect(contentElement).toBeInTheDocument();
  });

  // Test pour vérifier que le contenu de l'accordéon est masqué lorsqu'on reclique sur le titre
  test('masque le contenu lorsque le titre est recliqué', () => {
    // On rend le composant
    render(<Accordion title="Titre de Test">Contenu de Test</Accordion>);
    
    // On sélectionne le bouton
    const buttonElement = screen.getByRole('button');
    
    // On simule deux clics successifs sur le bouton pour ouvrir puis fermer l'accordéon
    fireEvent.click(buttonElement); // Ouvrir l'accordéon
    fireEvent.click(buttonElement); // Fermer l'accordéon
    
    // On vérifie que le contenu est de nouveau masqué
    const contentElement = screen.queryByText(/Contenu de Test/i);
    expect(contentElement).not.toBeInTheDocument();
  });
});
