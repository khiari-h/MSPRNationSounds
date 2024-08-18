describe('Tests de la page de programmation', () => {

  beforeEach(() => {
    // Visiter la page de programmation avant chaque test
    cy.visit('http://localhost:3000/programmation'); // Remplacer par l'URL locale correcte si nécessaire
  });

  it('Devrait charger la page de programmation et vérifier les sections principales', () => {
    // Ajout d'un délai pour permettre le chargement
    cy.wait(8000); // Attendre 8 secondes avant de commencer les vérifications

    // Vérifier que l'en-tête est visible
    cy.get('header').should('be.visible');

    // Vérifier que le titre principal est visible
    cy.contains('Programmation du Festival', { timeout: 10000 }).should('be.visible');

    // Vérifier que les boutons de navigation sont visibles
    cy.contains('Concerts', { timeout: 10000 }).should('be.visible');
    cy.contains('Rencontres avec les Artistes', { timeout: 10000 }).should('be.visible');
  });


  it('Devrait naviguer vers la section Rencontres avec les Artistes en cliquant sur le bouton correspondant', () => {
    // Ajout d'un délai pour permettre le chargement
    cy.wait(8000);

    // Cliquer sur le bouton "Rencontres avec les Artistes"
    cy.contains('Rencontres avec les Artistes', { timeout: 10000 }).click();
    
    // S'assurer que la section des rencontres avec les artistes est visible
    cy.get('section', { timeout: 10000 }).should('contain', 'Rencontres avec les Artistes'); 
  });
});
