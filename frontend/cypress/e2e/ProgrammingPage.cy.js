describe('Programming Page Tests', () => {

  beforeEach(() => {
    // Visite la page de programmation avant chaque test
    cy.visit('http://localhost:3000/programmation'); // Remplacez par l'URL locale correcte si nécessaire
  });

  it('Should load the programming page and verify the main sections', () => {
    // Vérifie que le header est visible
    cy.get('header').should('be.visible');

    // Vérifie que le titre principal est visible
    cy.contains('Programmation du Festival').should('be.visible');

    // Vérifie que les boutons de navigation sont visibles
    cy.contains('Concerts').should('be.visible');
    cy.contains('Ateliers').should('be.visible');
    cy.contains('Rencontres avec les Artistes').should('be.visible');
  });

  it('Should navigate to Concerts section by default', () => {
    // Vérifie que la section des concerts est affichée par défaut
    cy.contains('Concerts').click();
    
    // Assurez-vous que la section des concerts est visible
    cy.get('section').should('contain', 'Concerts'); // Utilisez un sélecteur approprié pour le contenu des concerts
  });

  it('Should navigate to Workshops section when clicking the Ateliers button', () => {
    // Clique sur le bouton "Ateliers"
    cy.contains('Ateliers').click();
    
    // Assurez-vous que la section des ateliers est visible
    cy.get('section').should('contain', 'Ateliers'); // Utilisez un sélecteur approprié pour le contenu des ateliers
  });

  it('Should navigate to Artist Meetings section when clicking the Rencontres avec les Artistes button', () => {
    // Clique sur le bouton "Rencontres avec les Artistes"
    cy.contains('Rencontres avec les Artistes').click();
    
    // Assurez-vous que la section des rencontres avec les artistes est visible
    cy.get('section').should('contain', 'Rencontres avec les Artistes'); // Utilisez un sélecteur approprié pour le contenu des rencontres avec les artistes
  });
});
