import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../../component/atoms/Filter';


describe('Composant Filter', () => {
  const mockData = [
    { date: '2024-08-15', heuredebut: '10:00', lieu: 'Salle de Danse', type: 'Danse' },
    { date: '2024-08-16', heuredebut: '14:00', lieu: 'Atelier des Arts', type: 'Peinture' },
  ];
  const filterKeys = ['date', 'heuredebut', 'lieu', 'type'];
  const mockHandleFilterChange = jest.fn();
  const mockResetFilters = jest.fn();

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

  test('Rend correctement les options de filtre', () => {
    // Vérification que les labels des filtres sont bien affichés
    expect(screen.getByText(/Dates/i)).toBeInTheDocument();
    expect(screen.getByText(/Heures/i)).toBeInTheDocument();
    expect(screen.getByText(/Lieux/i)).toBeInTheDocument();
    expect(screen.getByText(/Types/i)).toBeInTheDocument();
    
    // Vérification que les options de filtre générées à partir des données sont présentes
    expect(screen.getByText('2024-08-15')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('Salle de Danse')).toBeInTheDocument();
    expect(screen.getByText('Danse')).toBeInTheDocument();
  });

  test('Appelle handleFilterChange lors de la modification d\'un filtre', () => {
    // Simule un changement dans le select 'Dates'
    fireEvent.change(screen.getByText(/Dates/i).closest('select'), { target: { value: '2024-08-15' } });
    
    // Vérifie que la fonction handleFilterChange est appelée avec les bons arguments
    expect(mockHandleFilterChange).toHaveBeenCalledWith('date', '2024-08-15');
  });

  test('Appelle resetFilters lors du clic sur le bouton de réinitialisation', () => {
    // Simule un clic sur le bouton de réinitialisation des filtres
    fireEvent.click(screen.getByText('Réinitialiser les filtres'));
    
    // Vérifie que la fonction resetFilters est bien appelée
    expect(mockResetFilters).toHaveBeenCalled();
  });
});
