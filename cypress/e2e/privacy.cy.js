// Estrutura básica para a suite de testes ↓
describe('Central de Atendimento ao Cliente TAT - Política de privacidade', () => {
    beforeEach(() => {
      // Visitando a URL diretamente do projeto CAC - TAT em cada teste (it) iniciando na página política de privacidade
      cy.visit('./src/privacy.html')
    })

    // Lesson 07 - Exercício extra 2 - Desafio ↓
    it('CT-021 → testa a página da política de privacidade de forma independente', () => {
        cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
        cy.contains('p', 'Talking About Testing').should('be.visible')
    })

    // Lesson 12 - Exercício extra 1
    Cypress._.times(5, () => {
        it('CT-022 → testa a página da política de privacidade de forma independente', () => {
            cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
            cy.contains('p', 'Talking About Testing').should('be.visible')
            })
    })

})
