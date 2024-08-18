import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProgrammingPageTemplate from '../../component/templates/ProgrammingPageTemplate';

describe('Composant ProgrammingPageTemplate', () => {
  const mockOnSectionChange = jest.fn();

  // Test pour vérifier que le header et le footer sont présents
  test('affiche le header et le footer', () => {
    render(
      <ProgrammingPageTemplate
        currentSection="concerts"
        onSectionChange={mockOnSectionChange}
      >
        <div>Contenu de la section</div>
      </ProgrammingPageTemplate>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument(); // Vérifie le header
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Vérifie le footer
  });

  // Test pour vérifier que les boutons de section sont affichés et fonctionnent
  test('affiche les boutons de section et change de section lorsqu\'on clique dessus', () => {
    render(
      <ProgrammingPageTemplate
        currentSection="concerts"
        onSectionChange={mockOnSectionChange}
      >
        <div>Contenu de la section</div>
      </ProgrammingPageTemplate>
    );

    // Cible spécifiquement le bouton de la section "Concerts"
    const concertsButton = screen.getByRole('button', { name: /Concerts/i });
    const artistMeetingsButton = screen.getByRole('button', { name: /Rencontres avec les Artistes/i });

    expect(concertsButton).toBeInTheDocument();
    expect(artistMeetingsButton).toBeInTheDocument();

    fireEvent.click(artistMeetingsButton);

    expect(mockOnSectionChange).toHaveBeenCalledWith('artistMeetings');
  });

  // Test pour vérifier que le contenu enfant est affiché
  test('affiche le contenu enfant', () => {
    render(
      <ProgrammingPageTemplate
        currentSection="concerts"
        onSectionChange={mockOnSectionChange}
      >
        <div>Contenu de la section</div>
      </ProgrammingPageTemplate>
    );

    expect(screen.getByText(/Contenu de la section/i)).toBeInTheDocument();
  });
});
