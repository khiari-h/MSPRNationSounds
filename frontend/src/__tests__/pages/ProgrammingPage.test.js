import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProgrammingPage from '../../component/pages/ProgrammingPage';

jest.mock('../../component/organisms/ProgrammingOrganisms/ConcertProgramming', () => () => <div>Concerts Programming Component</div>);
jest.mock('../../component/organisms/ProgrammingOrganisms/ArtistMeeting', () => () => <div>Artist Meeting Component</div>);

describe('Composant ProgrammingPage', () => {
  // Test pour vérifier que le composant "ConcertsProgramming" est affiché par défaut
  test('affiche le composant ConcertsProgramming par défaut', async () => {
    render(<ProgrammingPage />);

    await waitFor(() => {
      expect(screen.getByText(/Concerts Programming Component/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier que le composant "ArtistMeeting" est affiché lorsqu'on clique sur le bouton correspondant
  test('affiche le composant ArtistMeeting lorsqu\'on clique sur le bouton correspondant', async () => {
    render(<ProgrammingPage />);

    fireEvent.click(screen.getByText(/Rencontres avec les Artistes/i));

    await waitFor(() => {
      expect(screen.getByText(/Artist Meeting Component/i)).toBeInTheDocument();
    });
  });
});
