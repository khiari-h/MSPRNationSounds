import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import PracticalInfo from '../../component/molecules/PracticalInfo';
import practicalInfoData from '../../data/practicalInfoData.json';

describe('Composant PracticalInfo', () => {

  // Test pour vérifier que le titre est affiché
  test('affiche le titre Infos Pratiques et FAQ', () => {
    act(() => {
      render(<PracticalInfo />);
    });

    expect(screen.getByText(/Infos Pratiques et FAQ/i)).toBeInTheDocument();
  });

  // Test pour vérifier que les sections d'information sont affichées
  test('affiche les sections d\'informations pratiques', () => {
    act(() => {
      render(<PracticalInfo />);
    });

    practicalInfoData.sections.forEach((section) => {
      expect(screen.getByText(section.title)).toBeInTheDocument();
      expect(screen.getByText(section.content)).toBeInTheDocument();
    });
  });

  // Test pour vérifier que les FAQ sont affichées sous chaque section
  test('affiche les FAQ sous les sections correspondantes', () => {
    act(() => {
      render(<PracticalInfo />);
    });

    practicalInfoData.sections.forEach((section) => {
      if (section.faqItems) {
        section.faqItems.forEach((faq) => {
          expect(screen.getByText(faq.question)).toBeInTheDocument();
          expect(screen.getByText(faq.answer)).toBeInTheDocument();
        });
      }
    });
  });
});
