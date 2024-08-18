describe('Tests de la page des concerts', () => {
    it('Devrait charger la page des concerts et vérifier que les données apparaissent', () => {
        // Visiter la page des concerts
        cy.visit('http://localhost:3000/concerts');
    
        // Attendre un peu pour le chargement des données
        cy.wait(5000); // Attendre 5 secondes pour le chargement complet des données

        // Vérifier que les options existent avant de les sélectionner
        cy.get('select[name="type"]').should('contain', 'Rock').select('Rock');
        cy.wait(2000); // Attendre 2 secondes pour que les données filtrées s'affichent
        cy.get('.grid').children().should('have.length.greaterThan', 0); // Vérifier qu'il y a des éléments dans la grille

        cy.get('select[name="date"]').should('contain', '04/08/2024').select('04/08/2024');
        cy.wait(2000); 
        cy.get('.grid').children().should('have.length.greaterThan', 0); // Vérifier qu'il y a des éléments dans la grille après filtrage

        cy.get('select[name="lieu"]').should(($select) => {
            expect($select).to.contain('Scene Marais'); // Vérifier que l'option SceneMarais est présente
        }).select('Scene Marais');
        cy.wait(2000); 
        cy.get('.grid').children().should('have.length.greaterThan', 0); // Vérifier qu'il y a des éléments dans la grille après sélection du lieu
    });
});
