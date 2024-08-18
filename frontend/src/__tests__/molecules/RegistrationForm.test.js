import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import axiosConfig from '../../config/axiosConfig';
import RegistrationForm from '../../component/molecules/RegistrationForm';

jest.mock('../../config/axiosConfig'); 

describe('Composant RegistrationForm', () => {

  // Test pour vérifier que tous les champs du formulaire sont affichés
  test('affiche tous les champs du formulaire', () => {
    act(() => {
      render(<RegistrationForm />);
    });

    expect(screen.getByPlaceholderText(/Prénom/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nom/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Sélectionnez un événement/i)).toBeInTheDocument();
  });

  // Test pour vérifier le fonctionnement du select de type
  test('change les événements disponibles en fonction du type sélectionné', async () => {
    axiosConfig.get.mockResolvedValueOnce({ data: [{ id: '1', name: 'Event 1' }] });
    
    act(() => {
      render(<RegistrationForm />);
    });

    fireEvent.change(screen.getByRole('combobox', { name: /type/i }), { target: { value: 'concerts' } });

    await waitFor(() => {
      expect(screen.getByText(/Event 1/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier l'affichage du message de succès après soumission
  test('affiche un message de succès après une soumission réussie', async () => {
    axiosConfig.post.mockResolvedValueOnce({});

    act(() => {
      render(<RegistrationForm />);
    });

    fireEvent.change(screen.getByPlaceholderText(/Prénom/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Nom/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByRole('combobox', { name: /type/i }), { target: { value: 'concerts' } });
    fireEvent.change(screen.getByRole('combobox', { name: /Sélectionnez un événement/i }), { target: { value: '1' } });

    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    await waitFor(() => {
      expect(screen.getByText(/Inscription réussie ! Merci de vous être inscrit./i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier l'affichage du message d'erreur en cas d'échec de soumission
  test('affiche un message d\'erreur en cas d\'échec de soumission', async () => {
    axiosConfig.post.mockRejectedValueOnce({ response: { data: 'Erreur' } });

    act(() => {
      render(<RegistrationForm />);
    });

    fireEvent.change(screen.getByPlaceholderText(/Prénom/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Nom/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByRole('combobox', { name: /type/i }), { target: { value: 'concerts' } });
    fireEvent.change(screen.getByRole('combobox', { name: /Sélectionnez un événement/i }), { target: { value: '1' } });

    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    await waitFor(() => {
      expect(screen.getByText(/Erreur lors de l'inscription. Veuillez réessayer./i)).toBeInTheDocument();
    });
  });
});
