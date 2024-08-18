describe('Homepage Tests', () => {
  it('Should load the homepage and verify the main sections', () => {
    // Visite la page d'accueil
    cy.visit('http://localhost:3000'); // Remplace par l'URL locale correcte si nécessaire

    // Vérifie que le header est visible
    cy.get('header').should('be.visible');

    // Vérifie que le HeroSection est présent
    cy.get('section').contains('Réservez vos billets').should('be.visible');

    // Vérifie que la section Actualités et Mises à Jour est présente
    cy.get('section[aria-labelledby="actualites-mises-a-jour"]').should('be.visible');

    // Vérifie que l'aperçu des concerts est visible
    cy.get('section[aria-labelledby="aperçu-concerts"]').should('be.visible');

    // Vérifie que l'aperçu de la programmation est visible
    cy.get('section[aria-labelledby="aperçu-programmation"]').should('be.visible');

    // Vérifie que le CTA avant la carte est visible
    cy.get('section[aria-labelledby="cta-avant-carte"]').contains('Acheter des billets').should('be.visible');

    // Vérifie que la section Infos Pratiques est présente
    cy.get('section[aria-labelledby="infos-pratiques"]').should('be.visible');

    // Vérifie que la carte est présente
    cy.get('section[aria-labelledby="carte"]').should('be.visible');

    // Vérifie que le CTA après la carte est visible
    cy.get('section[aria-labelledby="cta-apres-carte"]').contains('Nos Partenaires').should('be.visible');

    // Vérifie que le footer est visible
    cy.get('footer').should('be.visible');
  });

  it('Should navigate to the Partners page when clicking on the CTA', () => {
    // Visite la page d'accueil
    cy.visit('http://localhost:3000'); // Remplace par l'URL locale correcte si nécessaire

    // Clique sur le bouton "Nos Partenaires" et vérifie la navigation
    cy.contains('Nos Partenaires')
      .should('be.visible')           // Assure que le bouton est visible
      .invoke('removeAttr', 'target') // Supprime l'attribut target pour ouvrir dans le même onglet
      .click();
    
    // Vérifie que l'URL contient /partenaires avec un délai accru
    cy.url({ timeout: 10000 }).should('include', '/partenaires');
  });
});
