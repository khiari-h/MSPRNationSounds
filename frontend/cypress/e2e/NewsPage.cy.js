describe('News Page Tests', () => {
    beforeEach(() => {
        // Visite la page des actualités avant chaque test
        cy.visit('http://localhost:3000/news');
    });

    it('Should load the news page and verify the main sections', () => {
        // Vérifie que le header est visible
        cy.get('header').should('be.visible');

        // Vérifie que le titre principal est visible
        cy.contains('Actualités').should('be.visible');

        // Vérifie que les filtres sont visibles
        cy.get('button').contains('Tous').should('be.visible');

        // Vérifie que la section des actualités est présente
        cy.get('.grid').should('be.visible');

        // Vérifie que le footer est visible
        cy.get('footer').should('be.visible');
    });

    it('Should filter news by category', () => {
        // Sélectionne la catégorie "Concerts"
        cy.get('button').contains('Concerts').click();
        
        // Attendre que les données se mettent à jour
        cy.wait(2000);
        
 // Vérifie qu'au moins une actualité avec le titre "Nouveau concert annoncé" est visible
 cy.get('.grid').contains('Nouveau concert annoncé').should('be.visible');
    });

    it('Should navigate through pages and verify data is present', () => {
        // Visite la page des actualités
        cy.visit('http://localhost:3000/news');
    
        // Attendre un peu pour le chargement des données
        cy.wait(5000);
        
        // Vérifie que le bouton de la première page est visible
        cy.get('button').contains('1').should('be.visible');

                // Vérifie qu'il y a des éléments sur la deuxième page (au moins 1)
                cy.get('.grid').children().should('have.length.greaterThan', 0);

        // Cliquez sur le bouton de la deuxième page
        cy.get('button').contains('2').click();

        // Attendre un peu pour le chargement de la deuxième page
        cy.wait(2000);


        // Vérifie qu'il y a des éléments sur la deuxième page (au moins 1)
        cy.get('.grid').children().should('have.length.greaterThan', 0);
    });

    it('Should display an error message if news fails to load', () => {
        // Simule une erreur de récupération des actualités en interceptant la requête
        cy.intercept('GET', '/api/news', { statusCode: 500 });

        // Recharge la page
        cy.visit('http://localhost:3000/news');

        // Vérifie que le message d'erreur est affiché
        cy.contains('Erreur lors de la récupération des actualités!').should('be.visible');
    });
});
