describe('Partners Page Tests', () => {

    beforeEach(() => {
      // Visite la page des partenaires avant chaque test
      cy.visit('http://localhost:3000/partenaires'); // Remplace par l'URL locale correcte si nécessaire
    });
  
    it('Should load the partners page and verify the main sections', () => {
      // Vérifie que le header est visible
      cy.get('header').should('be.visible');
  
      // Vérifie que le titre principal est visible
      cy.contains('Nos Partenaires').should('be.visible');
  
      // Vérifie que les filtres sont visibles
      cy.get('button').contains('Tous').should('be.visible');
  
      // Vérifie que la section des partenaires est présente
      cy.get('section').contains('Chargement').should('not.exist'); // Assure que le chargement est terminé
      cy.get('.grid').should('be.visible');
  
      // Vérifie que le CTA est visible
      cy.contains('Envoyez-nous un email').should('be.visible');
  
      // Vérifie que le message est visible
      cy.contains('Profitez de 10% de réduction').should('be.visible');
  
      // Vérifie que le footer est visible
      cy.get('footer').should('be.visible');
    });
  
    it('Should filter partners by category', () => {
      // Sélectionne une catégorie dans le filtre
      cy.get('button').contains('Catégorie 1').click(); // Remplace par une catégorie réelle
  
      // Vérifie que seuls les partenaires de cette catégorie sont affichés
      cy.get('.grid').children().each(($el) => {
        cy.wrap($el).contains('Catégorie 1').should('be.visible');
      });
    });
  
    it('Should paginate through partners', () => {
      // Vérifie que le bouton de la deuxième page est visible et clique dessus
      cy.get('button').contains('2').should('be.visible').click();
  
      // Vérifie que les partenaires de la deuxième page sont affichés
      cy.get('.grid').children().should('have.length', 6); // Assure-toi qu'il y a 6 partenaires par page
    });
  
    it('Should display an error message if partners fail to load', () => {
      // Simule une erreur de récupération des partenaires en interceptant la requête
      cy.intercept('GET', '/api/wordpress/partners', { statusCode: 500 });
  
      // Recharge la page
      cy.visit('http://localhost:3000/partenaires');
  
      // Vérifie que le message d'erreur est affiché
      cy.contains('Erreur lors de la récupération des données.').should('be.visible');
    });
  });
  