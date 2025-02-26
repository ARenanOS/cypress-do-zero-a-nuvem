// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Antonio Renan')
    cy.get('#lastName').type('Oliveira Sarmento')
    cy.get('#email').type('renan.teste@gmail.com')
    cy.get('#open-text-area').type('Testando um comando customizado.')
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitTwo', data => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitThree', (datas = {
    firstNamee: 'João',
    lastNamee: 'Mendes',
    emaill: 'joaomendes@gmail.com',
    textt: 'Teste com dados padrão caso não tenha um argumento'
}) => {
    cy.get('#firstName').type(datas.firstNamee)
    cy.get('#lastName').type(datas.lastNamee)
    cy.get('#email').type(datas.emaill)
    cy.get('#open-text-area').type(datas.textt)
    cy.get('button[type="submit"]').click()
})