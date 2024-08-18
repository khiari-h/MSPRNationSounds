import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../../component/organisms/Footer';

describe('Composant Footer', () => {

  // Test pour vérifier que tous les éléments statiques sont affichés
  test('affiche les informations statiques du footer', () => {
    render(<Footer />);

    // Cibler spécifiquement le titre "Contact"
    const contactHeading = screen.getByRole('heading', { name: /Contact/i });
    expect(contactHeading).toBeInTheDocument();

    expect(screen.getByText(/À Propos de Nation Sounds/i)).toBeInTheDocument();
    expect(screen.getByText(/Newsletter/i)).toBeInTheDocument();
    expect(screen.getByText(/Informations légales/i)).toBeInTheDocument();
    expect(screen.getByText(/Réseaux sociaux/i)).toBeInTheDocument();
  });

  // Test pour vérifier l'envoi du formulaire de la newsletter
  test('envoie le formulaire de la newsletter', () => {
    render(<Footer />);

    fireEvent.change(screen.getByPlaceholderText(/Votre prénom/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre nom/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre email/i), { target: { value: 'john.doe@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));


  });

});
