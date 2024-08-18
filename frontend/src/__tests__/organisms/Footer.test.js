import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import axiosConfig from '../../config/axiosConfig';
import Footer from '../../component/molecules/Footer';

jest.mock('../../config/axiosConfig');

describe('Composant Footer', () => {

  // Test pour vérifier que tous les éléments statiques sont affichés
  test('affiche les informations statiques du footer', () => {
    act(() => {
      render(<Footer />);
    });

    expect(screen.getByText(/À Propos de Nation Sounds/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Newsletter/i)).toBeInTheDocument();
    expect(screen.getByText(/Informations légales/i)).toBeInTheDocument();
    expect(screen.getByText(/Réseaux sociaux/i)).toBeInTheDocument();
  });

  // Test pour vérifier l'envoi du formulaire de la newsletter
  test('envoie le formulaire de la newsletter avec succès', async () => {
    axiosConfig.post.mockResolvedValueOnce({});

    act(() => {
      render(<Footer />);
    });

    fireEvent.change(screen.getByPlaceholderText(/Votre prénom/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre nom/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre email/i), { target: { value: 'john.doe@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    await waitFor(() => {
      expect(screen.getByText(/Inscription réussie!/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier l'affichage d'un message d'erreur en cas d'échec de l'inscription
  test('affiche un message d\'erreur en cas d\'échec de l\'inscription', async () => {
    axiosConfig.post.mockRejectedValueOnce({});

    act(() => {
      render(<Footer />);
    });

    fireEvent.change(screen.getByPlaceholderText(/Votre prénom/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre nom/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre email/i), { target: { value: 'john.doe@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    await waitFor(() => {
      expect(screen.getByText(/Erreur lors de l'inscription./i)).toBeInTheDocument();
    });
  });
});
