import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import Filter from '../../component/atoms/Filter';

describe('Composant Filter', () => {
  const mockData = [
    { date: '2024-09-01', heuredebut: '20:00', lieu: 'Stade de France', type: 'Concert', group: 'Coldplay' },
    { date: '2024-09-02', heuredebut: '21:00', lieu: 'Bercy', type: 'Concert', group: 'U2' },
  ];

  const filterKeys = ['group', 'date', 'heuredebut', 'lieu', 'type'];
  const mockHandleFilterChange = jest.fn();
  const mockResetFilters = jest.fn();

  const displayLabels = {
    group: 'Groupes',
    date: 'Dates',
    heuredebut: 'Heures',
    lieu: 'Lieux',
    type: 'Types',
  };

  beforeEach(() => {
    render(
      <Filter
        data={mockData}
        filters={{}}
        filterKeys={filterKeys}
        handleFilterChange={mockHandleFilterChange}
        resetFilters={mockResetFilters}
      />
    );
  });

  // Test pour vérifier que le composant rend correctement les options de filtre
  test('Rend correctement les options de filtre', () => {
    expect(screen.getByText(/Dates/i)).toBeInTheDocument();
    expect(screen.getByText(/Heures/i)).toBeInTheDocument();
    expect(screen.getByText(/Lieux/i)).toBeInTheDocument();
    expect(screen.getByText(/Types/i)).toBeInTheDocument();
    expect(screen.getByText(/Groupes/i)).toBeInTheDocument();

    expect(screen.getByText('2024-09-01')).toBeInTheDocument();
    expect(screen.getByText('20:00')).toBeInTheDocument();
    expect(screen.getByText('Stade de France')).toBeInTheDocument();
    expect(screen.getByText('Coldplay')).toBeInTheDocument();
  });

  // Test pour vérifier que la fonction de réinitialisation des filtres est appelée lors du clic sur le bouton
  test('Appelle resetFilters et remet les filtres à zéro lors du clic', () => {
    act(() => {
      fireEvent.click(screen.getByText('Réinitialiser les filtres'));
    });

    expect(mockResetFilters).toHaveBeenCalled();

    const selectElements = screen.getAllByRole('combobox');
    selectElements.forEach(selectElement => {
      expect(selectElement.value).toBe('');
    });
  });
});
