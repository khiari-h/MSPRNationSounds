import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PracticalInfo from '../../component/organisms/PracticalInfo';

describe('Composant PracticalInfo', () => {

  // Test pour vérifier que la section FAQ peut être ouverte et fermée
  test('ouvre et ferme la section FAQ', () => {
    render(<PracticalInfo />);

    // Utiliser getByRole pour cibler un bouton ou un titre spécifique
    const faqTitle = screen.getByText(/FAQ/i, { selector: 'span' }); // Préciser le selector si c'est un span

    expect(faqTitle).toBeInTheDocument();

    // Ouvre la section FAQ
    fireEvent.click(faqTitle);

    // Vérifie que la FAQ est ouverte en cherchant un élément spécifique de la FAQ
    const firstQuestion = screen.getByText(/Quels sont les horaires d'ouverture ?/i);
    expect(firstQuestion).toBeInTheDocument();

    // Ferme la section FAQ
    fireEvent.click(faqTitle);

    // Vérifie que la FAQ est fermée en s'assurant que la question n'est plus visible
    expect(firstQuestion).not.toBeVisible();
  });
});
