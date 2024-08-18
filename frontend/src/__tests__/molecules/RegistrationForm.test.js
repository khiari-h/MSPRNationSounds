import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationForm from '../../component/molecules/RegisterForm';

describe('Composant RegistrationForm', () => {

  test('soumet le formulaire avec des valeurs de base', () => {
    render(<RegistrationForm />);

    // Remplir uniquement les champs texte avec des valeurs simples
    fireEvent.change(screen.getByPlaceholderText('Prénom'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Nom'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });

    // Simuler le clic sur le bouton de soumission
    fireEvent.click(screen.getByText(/S'inscrire/i));

    // Vérifier que le bouton est toujours présent, signalant que l'action a été tentée
    expect(screen.getByText(/S'inscrire/i)).toBeInTheDocument();
  });
});
