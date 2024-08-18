describe('Tests de la page des partenaires', () => {

  beforeEach(() => {
    // Visite la page des partenaires avant chaque test
    cy.visit('http://localhost:3000/partenaires'); 
  });

  it('Devrait charger la page des partenaires et vérifier les sections principales', () => {
    // Ajout d'un délai pour permettre le chargement
    cy.wait(5000); // Attendre 5 secondes avant de commencer les vérifications
    
    // Vérifie que l'en-tête est visible
    cy.get('header').should('be.visible');

    // Vérifie que le titre principal est visible
    cy.contains('Nos Partenaires').should('be.visible');

    // Vérifie que les filtres sont visibles
    cy.get('button').contains('Tous').should('be.visible');

    // Vérifie que la section des partenaires est présente
    cy.get('section').contains('Chargement').should('not.exist'); // S'assure que le chargement est terminé
    cy.get('.grid').should('be.visible');

    // Vérifie que le CTA est visible
    cy.contains('Envoyez-nous un email').should('be.visible');

    // Vérifie que le message de promotion est visible
    cy.contains('Profitez de 10% de réduction').should('be.visible');

    // Vérifie que le pied de page est visible
    cy.get('footer').should('be.visible');
  });

  it('Devrait filtrer les partenaires par catégorie', () => {
    // Ajout d'un délai pour permettre le chargement des données
    cy.wait(5000);
    
    // Sélectionne la catégorie "Sponsors principaux" dans le filtre
    cy.get('button').contains('Sponsors principaux').click();

    // Vérifie que seuls les partenaires de cette catégorie sont affichés
    cy.get('.grid').children().each(($el) => {
      cy.wrap($el).contains(/Sponsors principaux/i).should('be.visible');
    });
  });

  it('Devrait permettre de naviguer entre les pages de partenaires', () => {
    // Ajout d'un délai pour permettre le chargement des données
    cy.wait(5000);
    
    // Vérifie que le bouton de la deuxième page est visible et clique dessus
    cy.get('button').contains('2').should('be.visible').click();

    // Ajout d'un délai pour permettre le chargement de la deuxième page
    cy.wait(5000);

    // Vérifie que les partenaires de la deuxième page sont affichés
    cy.get('.grid').children().should('have.length', 6); // S'assure qu'il y a 6 partenaires par page
  });

  it('Devrait afficher un message d\'erreur si les partenaires échouent à se charger', () => {
    // Simule une erreur de récupération des partenaires en interceptant la requête
    cy.intercept('GET', '/api/wordpress/partners', { statusCode: 500 });

    // Recharge la page
    cy.visit('http://localhost:3000/partenaires');

    // Ajout d'un délai pour permettre le chargement du message d'erreur
    cy.wait(5000);

    // Vérifie que le message d'erreur est affiché
    cy.contains('Erreur lors de la récupération des données.').should('be.visible');
  });
});
